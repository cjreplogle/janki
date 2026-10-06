"""Self-healing stock-Anki glass patch (fetch edition) with a crash-guard.

Stock Anki can't do the frosted glass without a pre-app source patch (the render
surface needs its alpha channel set before the app/webviews exist). We install
that by swapping two aqt `.pyc` files. An Anki UPDATE restores the stock `.pyc`,
turning glass off — and the plain icon can't recover on its own (unpatched →
ANKI_GLASS unset → add-on dormant).

This module runs UNCONDITIONALLY at startup. If it finds an unpatched STOCK Anki,
it fetches the EXACT aqt source for the running build from the official
ankitects/anki repo (by buildhash — so it always matches the installed version,
no drift), patches it in memory, compiles with Anki's own Python 3.13, installs
the `.pyc`, and prompts a restart. No Anki source is bundled or redistributed.

CRASH-GUARD: the glass setup runs *inside* Anki's own startup, BEFORE add-ons
load — so if it ever crashes on a given machine/Qt build, the add-on can't catch
it. To make that non-fatal, the injected code drops a `~/.janki_glass_pending`
sentinel each patched launch; a launch that lives long enough for the add-on to
call confirm_glass_ok() clears it. If a launch STARTS with the sentinel still
present, the previous patched launch must have crashed → the injected code rolls
the stock files back, records `~/.janki_glass_failed` for this build, and boots
WITHOUT glass. The add-on then declines to re-patch that build. Net effect: the
worst case is "plain Anki, no glass", never a crash-loop or lockout.

Fail-safe throughout: no-op on a source build, when already patched, when the
Python isn't 3.13, or when this build previously failed; and if the download or
an anchor-patch fails it installs NOTHING and stays quiet.
"""

import os
import sys
import shutil
import filecmp
import subprocess
import py_compile
import urllib.request
from pathlib import Path

from ..util.config import log

_RAW = "https://raw.githubusercontent.com/ankitects/anki/{h}/qt/aqt/{name}"
_CACHE = Path.home() / ".janki_stock_cache"

# Bump when the injected patch changes, so a cached .pyc from an older janki isn't
# reused for the same Anki build.
_PATCH_FMT = "v3"   # v3: --disable-frame-rate-limit (ProMotion)

# Crash-guard sentinels (in $HOME so they survive an Anki reinstall).
_PENDING = Path.home() / ".janki_glass_pending"
_FAILED = Path.home() / ".janki_glass_failed"

# --- the patches, as (anchor, replacement) text edits on the fetched source ----

_INIT_ANCHOR = "    app = AnkiApp(argv)\n"
# Injected just before the QApplication is created. Self-contained (local imports)
# and wrapped so it can NEVER raise into Anki's startup. Implements the crash
# guard: roll back + boot plain if the last patched launch didn't confirm stable.
_INIT_INJECT = (
    "    try:\n"
    "        import os as _jos, shutil as _jsh\n"
    "        from pathlib import Path as _JPath\n"
    "        import aqt as _jaqt\n"
    "        _jhome = _JPath.home()\n"
    "        _jpend = _jhome / '.janki_glass_pending'\n"
    "        _jfail = _jhome / '.janki_glass_failed'\n"
    "        _jdir = _JPath(_jaqt.__file__).resolve().parent\n"
    "        if _jpend.exists():\n"
    "            # Previous patched launch never confirmed stable -> it crashed.\n"
    "            # Restore stock files and boot WITHOUT glass (no lockout).\n"
    "            for _jn in ('__init__', 'main'):\n"
    "                _jb = _jdir / (_jn + '.pyc.janki-orig')\n"
    "                if _jb.exists():\n"
    "                    try:\n"
    "                        _jsh.copy2(_jb, _jdir / (_jn + '.pyc'))\n"
    "                    except Exception:\n"
    "                        pass\n"
    "            try:\n"
    "                from anki.buildinfo import buildhash as _jbh\n"
    "            except Exception:\n"
    "                _jbh = '1'\n"
    "            try:\n"
    "                _jfail.write_text(_jbh)\n"
    "            except Exception:\n"
    "                pass\n"
    "            try:\n"
    "                _jpend.unlink()\n"
    "            except Exception:\n"
    "                pass\n"
    "        else:\n"
    "            try:\n"
    "                _jpend.write_text('1')\n"
    "            except Exception:\n"
    "                pass\n"
    "            _jos.environ.setdefault('ANKI_GLASS', '1')\n"
    "            _jflags = ('--disable-gpu --disable-features=CalculateNativeWinOcclusion '\n"
    "                       '--disable-renderer-backgrounding --disable-backgrounding-occluded-windows')\n"
    # Software compositing ticks at a fixed 60 Hz; lift that so ProMotion (120 Hz)
    # displays scroll/animate past 60. Off switch without re-patching: ~/.janki_60fps
    "            if not (_jhome / '.janki_60fps').exists():\n"
    "                _jflags += ' --disable-frame-rate-limit'\n"
    "            _jos.environ.setdefault('QTWEBENGINE_CHROMIUM_FLAGS', _jflags)\n"
    "            from aqt.qt import QSurfaceFormat as _JankiQSF\n"
    "            _jf = _JankiQSF.defaultFormat()\n"
    "            _jf.setAlphaBufferSize(8)\n"
    "            _JankiQSF.setDefaultFormat(_jf)\n"
    "    except Exception:\n"
    "        pass\n"
)

# The window-birth attributes, gated on ANKI_GLASS so the recovery launch (which
# leaves ANKI_GLASS unset) is a clean no-op.
_MAIN_ANCHOR_A = "        self.form = aqt.forms.main.Ui_MainWindow()\n"
_MAIN_WA_BEFORE = (
    '        if __import__("os").environ.get("ANKI_GLASS"):\n'
    "            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)\n"
    "            self.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)\n"
)
_MAIN_ANCHOR_B = "        self.form.setupUi(self)\n"
_MAIN_CENTRAL_AFTER = (
    '        if __import__("os").environ.get("ANKI_GLASS"):\n'
    "            self.form.centralwidget.setAttribute("
    "Qt.WidgetAttribute.WA_TranslucentBackground, True)\n"
    "            self.form.centralwidget.setAutoFillBackground(False)\n"
)


def _patch_init(src: str) -> str:
    if src.count(_INIT_ANCHOR) != 1:
        raise ValueError("__init__.py anchor (app = AnkiApp) not found uniquely")
    return src.replace(_INIT_ANCHOR, _INIT_INJECT + _INIT_ANCHOR, 1)


def _patch_main(src: str) -> str:
    if src.count(_MAIN_ANCHOR_A) != 1 or src.count(_MAIN_ANCHOR_B) != 1:
        raise ValueError("main.py anchors (setupMainWindow) not found uniquely")
    src = src.replace(_MAIN_ANCHOR_A, _MAIN_WA_BEFORE + _MAIN_ANCHOR_A, 1)
    src = src.replace(_MAIN_ANCHOR_B, _MAIN_ANCHOR_B + _MAIN_CENTRAL_AFTER, 1)
    return src


_PATCHERS = {"__init__.py": _patch_init, "main.py": _patch_main}


# --- environment detection -----------------------------------------------------

def _buildhash() -> str:
    try:
        from anki.buildinfo import buildhash
        return buildhash
    except Exception:
        return ""


def _aqt_dir():
    """Stock app's aqt dir ONLY if this is a stock .pyc bundle; else None."""
    try:
        import aqt
        f = Path(aqt.__file__).resolve()
        if f.suffix != ".pyc" or ".app/Contents/" not in str(f):
            return None
        return f.parent
    except Exception:
        return None


def _app_root(aqt_dir: Path):
    for p in aqt_dir.parents:
        if p.suffix == ".app":
            return p
    return None


# --- fetch + compile -----------------------------------------------------------

def _fetch(name: str, h: str) -> str:
    req = urllib.request.Request(_RAW.format(h=h, name=name),
                                 headers={"User-Agent": "janki-selfheal"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode("utf-8")


def _build_pyc(name: str, h: str) -> Path:
    """Return a cached patched .pyc for (buildhash, patch-format, name), building
    it (fetch → patch → compile) on first need. Raises on any failure."""
    cdir = _CACHE / ("%s-%s" % (h, _PATCH_FMT))
    cdir.mkdir(parents=True, exist_ok=True)
    pyc = cdir / (Path(name).stem + ".pyc")
    if pyc.is_file():
        return pyc
    patched = _PATCHERS[name](_fetch(name, h))
    tmp_py = cdir / name
    tmp_py.write_text(patched, encoding="utf-8")
    py_compile.compile(
        str(tmp_py), cfile=str(pyc), dfile=name,
        invalidation_mode=py_compile.PycInvalidationMode.UNCHECKED_HASH,
        doraise=True,
    )
    return pyc


def _notify_once(h: str, msg: str) -> None:
    """Show a single gentle tooltip for a genuinely user-relevant outcome (glass
    couldn't start). Deduped per build so it never nags."""
    try:
        mark = Path.home() / ".janki_selfheal_notified"
        if mark.exists() and mark.read_text(encoding="utf-8").strip() == h:
            return
        mark.write_text(h, encoding="utf-8")
    except Exception:
        pass
    log("self-heal: %s" % msg)
    try:
        from aqt import mw  # noqa: F401
        from aqt.qt import QTimer
        from aqt.utils import tooltip
        QTimer.singleShot(2500, lambda: tooltip("Janki: %s" % msg, period=6000))
    except Exception:
        pass


def _relaunch_in_place() -> bool:
    """Re-run Anki in this same process (os.execv) so the patched files load now. Only
    safe before the main window / collection exist (add-on import time). Returns False
    if it can't (then the caller falls back to the restart prompt)."""
    try:
        from aqt import mw
        if mw is not None and (mw.isVisible() or getattr(mw, "col", None) is not None):
            return False
        # Loop guard: never re-run more than once. The marker survives execv (the
        # environment carries over), so if the patch somehow didn't take effect, the
        # next pass sees it and falls back to the restart prompt instead of looping.
        if os.environ.get("JANKI_SELFHEAL_RELAUNCHED"):
            log("self-heal: already re-ran once; not relaunching again")
            return False
        os.environ["JANKI_SELFHEAL_RELAUNCHED"] = "1"
        args = list(getattr(sys, "orig_argv", None) or ([sys.executable] + sys.argv))
        log("self-heal: re-running Anki in place to start the glass")
        sys.stdout.flush()
        sys.stderr.flush()
        os.execv(sys.executable, args)
    except Exception as exc:
        log("self-heal: in-place relaunch failed (%s)" % exc)
    return False


def _relaunch_after_quit() -> None:
    """Reopen Anki a moment after this instance quits (macOS)."""
    try:
        app = _app_root(_aqt_dir()) if _aqt_dir() else None
        target = str(app) if app else "Anki"
        subprocess.Popen(["/bin/sh", "-c", 'sleep 2; open -a "$0"', target],
                         start_new_session=True)
    except Exception:
        pass


restart_pending = False     # a glass restart is waiting — hold other prompts


def _prompt_restart() -> None:
    global restart_pending
    restart_pending = True
    try:
        from ..util import state as _st
        _st.claim_prompt("glass")          # takes this launch's prompt slot
    except Exception:
        pass
    try:
        from aqt import mw
        from aqt.qt import QMessageBox, QTimer

        def show():
            try:
                box = QMessageBox(mw)
                box.setWindowTitle("Janki")
                box.setText("Janki set up its frosted glass.")
                box.setInformativeText("Anki needs to restart once to turn it on — "
                                       "Janki will reopen it for you. Everything else "
                                       "already works.")
                quit_btn = box.addButton("Restart Anki now",
                                         QMessageBox.ButtonRole.AcceptRole)
                box.addButton("Later", QMessageBox.ButtonRole.RejectRole)
                box.exec()
                if box.clickedButton() is quit_btn:
                    _relaunch_after_quit()
                    # Real shutdown — mw.close() would be swallowed by Janki's
                    # tray-minimize filter (turned into a hide), so the restart the
                    # glass patch needs would never happen and glass would stay off.
                    try:
                        mw.unloadProfileAndExit()
                    except Exception:
                        mw.close()
            except Exception as exc:
                log("self-heal prompt: %s" % exc)

        QTimer.singleShot(800, show)
    except Exception:
        pass


# --- crash-guard helpers (called from the add-on) ------------------------------

def confirm_glass_ok() -> None:
    """Called by the add-on once a patched launch has run stably for a few
    seconds. Clears the pending sentinel so the crash-guard leaves glass on."""
    try:
        _PENDING.unlink()
    except Exception:
        pass


def clear_failure() -> None:
    """Forget a recorded glass crash (and any stale pending marker) so the next
    launch re-attempts the patch. Used by the settings 'Apply glass patch' button
    and by unpatch()."""
    for m in (_FAILED, _PENDING):
        try:
            m.unlink()
        except Exception:
            pass


def _failed_here(h: str) -> bool:
    try:
        return _FAILED.exists() and _FAILED.read_text(encoding="utf-8").strip() == h
    except Exception:
        return False


# --- state / uninstall ---------------------------------------------------------

def _files_patched(ad) -> bool:
    """True if Anki's aqt/__init__.pyc on disk carries Janki's injected code. Checks for
    our marker string (not "differs from the backup": after an Anki update the backup is
    from the old version, which would wrongly read as patched)."""
    try:
        return b"janki_glass_pending" in (ad / "__init__.pyc").read_bytes()
    except Exception:
        return False


def patch_state() -> str:
    """'patched' | 'unpatched' | 'unsupported' — for the settings UI."""
    if sys.platform != "darwin":
        return "unsupported"
    ad = _aqt_dir()
    if ad is None:
        return "unsupported"
    if os.environ.get("ANKI_GLASS"):
        return "patched"               # running the patched app right now
    for name in _PATCHERS:
        pyc = ad / (Path(name).stem + ".pyc")
        bak = pyc.with_suffix(".pyc.janki-orig")
        if bak.exists() and pyc.exists() and not filecmp.cmp(pyc, bak, shallow=False):
            return "patched"
    return "unpatched"


def unpatch(purge: bool = True) -> int:
    """Restore Anki's original .pyc from the backups (repairs the code signature,
    since the bytes match the sealed originals again). If purge, also delete the
    backups, the fetch cache, and all marker files so NOTHING janki remains in
    Anki.app. Returns the number of files restored. Callers should also set config
    stock_selfheal=False so the self-heal doesn't just re-patch on next launch."""
    ad = _aqt_dir()
    if ad is None:
        return 0
    n = 0
    for name in _PATCHERS:
        pyc = ad / (Path(name).stem + ".pyc")
        bak = pyc.with_suffix(".pyc.janki-orig")
        if bak.exists():
            try:
                shutil.copy2(bak, pyc)
                n += 1
                if purge:
                    bak.unlink()
            except Exception as exc:
                log("unpatch %s: %s" % (name, exc))
    if purge:
        shutil.rmtree(_CACHE, ignore_errors=True)
        clear_failure()
        for m in (".janki_selfheal_notified", ".janki_unsupported_notified"):
            try:
                (Path.home() / m).unlink()
            except Exception:
                pass
    return n


# --- entry point ---------------------------------------------------------------

_FMT_MARK = b"janki_60fps"           # present in v3+ snippets


def _upgrade_patch() -> None:
    """Running patched, but the files on disk carry an OLDER snippet (patched before
    this format, e.g. without the 120 Hz flag): quietly rebuild them. Anki already
    loaded the old code, so this takes effect from the next launch — no prompt, and
    the stock backups (.janki-orig) are kept as they are."""
    try:
        ad = _aqt_dir()
        if ad is None or not _files_patched(ad):
            return
        if _FMT_MARK in (ad / "__init__.pyc").read_bytes():
            return                         # already current
        h = _buildhash()
        if not h or sys.version_info[:2] != (3, 13):
            return
        built = {name: _build_pyc(name, h) for name in _PATCHERS}
        for name, src_pyc in built.items():
            dst = ad / (Path(name).stem + ".pyc")
            if dst.with_suffix(".pyc.janki-orig").exists():   # never lose the stock copy
                shutil.copy2(src_pyc, dst)
        log("self-heal: refreshed the glass patch (%s); active next launch." % _PATCH_FMT)
    except Exception as exc:
        log("self-heal upgrade: %s" % exc)


def maybe_self_heal(early: bool = False) -> None:
    """Entry point — safe to call unconditionally at startup. `early` = called at
    add-on import, before Anki's window or collection opens: then a freshly applied
    patch is picked up by re-running Anki in place (no second restart for the user)."""
    if sys.platform != "darwin":
        return
    if os.environ.get("ANKI_GLASS"):
        _upgrade_patch()               # already patched/active: refresh an old snippet
        return
    ad = _aqt_dir()
    if ad is None:
        return                         # source build or not an app bundle
    try:                               # never patch in the safe edition; respect opt-out
        from ..util.config import _cfg, SAFE
        if SAFE or not _cfg().get("stock_selfheal", True):
            return
    except Exception:
        pass
    if sys.version_info[:2] != (3, 13):
        return                         # can't produce matching bytecode
    if early and os.environ.get("JANKI_SELFHEAL_RELAUNCHED"):
        # We already patched + re-ran once and the glass still isn't active: don't
        # patch again here; the normal (non-early) pass will prompt instead.
        return
    h = _buildhash()
    if not h:
        return
    if _files_patched(ad):
        # Already patched on disk, yet this launch isn't running it: the patch isn't
        # taking effect here. Re-patching + restarting would only repeat — say so once.
        _notify_once(h, "glass is installed but didn't start on this Anki setup, so "
                        "it's off. Re-apply it in Janki: Settings to try again.")
        return
    if _failed_here(h):
        # The glass patch crashed on THIS build before — stay plain, don't loop.
        _notify_once(h, "glass couldn't start on this Anki version, so it's off. "
                        "Re-enable it in Janki: Settings to try again.")
        return
    try:
        built = {name: _build_pyc(name, h) for name in _PATCHERS}
    except Exception as exc:
        _notify_once(h, "couldn't set up glass for this Anki version (%s); it's off."
                        % type(exc).__name__)
        return
    try:
        for name, src_pyc in built.items():
            dst = ad / (Path(name).stem + ".pyc")
            bak = dst.with_suffix(".pyc.janki-orig")
            if dst.exists() and not bak.exists():
                shutil.copy2(dst, bak)
            shutil.copy2(src_pyc, dst)
        app = _app_root(ad)
        if app:
            subprocess.run(["xattr", "-dr", "com.apple.quarantine", str(app)],
                           check=False)
        # Fresh attempt for this build: clear stale sentinels so the first patched
        # launch starts clean.
        clear_failure()
        log("self-heal: applied glass patch; restart needed.")
        if early and _relaunch_in_place():
            return                         # (not reached: the process was replaced)
        _prompt_restart()
    except Exception as exc:
        _notify_once(h, "couldn't install glass (%s); it's off." % type(exc).__name__)
