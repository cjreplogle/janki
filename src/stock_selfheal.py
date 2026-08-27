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

from .config import log

_RAW = "https://raw.githubusercontent.com/ankitects/anki/{h}/qt/aqt/{name}"
_CACHE = Path.home() / ".janki_stock_cache"

# Bump when the injected patch changes, so a cached .pyc from an older janki isn't
# reused for the same Anki build.
_PATCH_FMT = "v2"

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
    "            _jos.environ.setdefault('QTWEBENGINE_CHROMIUM_FLAGS', "
    "'--disable-gpu --disable-features=CalculateNativeWinOcclusion "
    "--disable-renderer-backgrounding --disable-backgrounding-occluded-windows')\n"
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


def _prompt_restart() -> None:
    try:
        from aqt import mw
        from aqt.qt import QMessageBox, QTimer

        def show():
            try:
                box = QMessageBox(mw)
                box.setWindowTitle("Janki")
                box.setText("Janki set up its glass effect for this version of Anki.")
                box.setInformativeText("Quit and reopen Anki once to turn the "
                                       "frosted glass on. Everything else already works.")
                quit_btn = box.addButton("Quit Anki now",
                                         QMessageBox.ButtonRole.AcceptRole)
                box.addButton("Later", QMessageBox.ButtonRole.RejectRole)
                box.exec()
                if box.clickedButton() is quit_btn:
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

def maybe_self_heal() -> None:
    """Entry point — safe to call unconditionally at startup."""
    if sys.platform != "darwin":
        return
    if os.environ.get("ANKI_GLASS"):
        return                         # already patched/active
    ad = _aqt_dir()
    if ad is None:
        return                         # source build or not an app bundle
    try:                               # never patch in the safe edition; respect opt-out
        from .config import _cfg, SAFE
        if SAFE or not _cfg().get("stock_selfheal", True):
            return
    except Exception:
        pass
    if sys.version_info[:2] != (3, 13):
        return                         # can't produce matching bytecode
    h = _buildhash()
    if not h:
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
        _prompt_restart()
    except Exception as exc:
        _notify_once(h, "couldn't install glass (%s); it's off." % type(exc).__name__)
