"""Self-healing stock-Anki glass patch (fetch edition).

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

Fail-safe throughout: no-op on a source build, when already patched, or when the
Python isn't 3.13; and if the download or an anchor-patch fails it installs
NOTHING (glass just stays off, Anki keeps working) and notifies once.
"""

import os
import sys
import shutil
import filecmp
import subprocess
import py_compile
import urllib.request
from pathlib import Path

_RAW = "https://raw.githubusercontent.com/ankitects/anki/{h}/qt/aqt/{name}"
_CACHE = Path.home() / ".janki_stock_cache"

# --- the patches, as (anchor, replacement) text edits on the fetched source ----

_INIT_ANCHOR = "    app = AnkiApp(argv)\n"
_INIT_INJECT = (
    '    os.environ.setdefault("ANKI_GLASS", "1")\n'
    '    os.environ.setdefault("QTWEBENGINE_CHROMIUM_FLAGS", '
    '"--disable-gpu --disable-features=CalculateNativeWinOcclusion '
    '--disable-renderer-backgrounding --disable-backgrounding-occluded-windows")\n'
    '    if os.environ.get("ANKI_GLASS"):\n'
    "        from aqt.qt import QSurfaceFormat as _JankiQSF\n"
    "        _jf = _JankiQSF.defaultFormat()\n"
    "        _jf.setAlphaBufferSize(8)\n"
    "        _JankiQSF.setDefaultFormat(_jf)\n"
)

_MAIN_ANCHOR_A = "        self.form = aqt.forms.main.Ui_MainWindow()\n"
_MAIN_WA_BEFORE = (
    "        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)\n"
    "        self.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)\n"
)
_MAIN_ANCHOR_B = "        self.form.setupUi(self)\n"
_MAIN_CENTRAL_AFTER = (
    "        self.form.centralwidget.setAttribute("
    "Qt.WidgetAttribute.WA_TranslucentBackground, True)\n"
    "        self.form.centralwidget.setAutoFillBackground(False)\n"
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
    """Return a cached patched .pyc for (buildhash, name), building it (fetch →
    patch → compile) on first need. Raises on any failure."""
    cdir = _CACHE / h
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
    try:
        mark = Path.home() / ".janki_selfheal_notified"
        if mark.exists() and mark.read_text(encoding="utf-8").strip() == h:
            return
        mark.write_text(h, encoding="utf-8")
    except Exception:
        pass
    print(f"[janki] self-heal: {msg}", file=sys.stderr)
    try:
        from aqt import mw  # noqa: F401
        from aqt.qt import QTimer
        from aqt.utils import tooltip
        QTimer.singleShot(2500, lambda: tooltip(f"Janki: {msg}", period=6000))
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
                box.setText("Janki re-applied its glass patch to Anki "
                            "(an update had reset it).")
                box.setInformativeText("Quit and reopen Anki to turn the "
                                       "frosted glass back on.")
                quit_btn = box.addButton("Quit Anki now",
                                         QMessageBox.ButtonRole.AcceptRole)
                box.addButton("Later", QMessageBox.ButtonRole.RejectRole)
                box.exec()
                if box.clickedButton() is quit_btn:
                    mw.close()
            except Exception as exc:
                print(f"[janki] self-heal prompt: {exc}", file=sys.stderr)

        QTimer.singleShot(800, show)
    except Exception:
        pass


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
    backups, the fetch cache, and the notice markers so NOTHING janki remains in
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
                print(f"[janki] unpatch {name}: {exc}", file=sys.stderr)
    if purge:
        shutil.rmtree(_CACHE, ignore_errors=True)
        for m in (".janki_selfheal_notified", ".janki_unsupported_notified"):
            try:
                (Path.home() / m).unlink()
            except Exception:
                pass
    return n


def maybe_self_heal() -> None:
    """Entry point — safe to call unconditionally at startup."""
    if sys.platform != "darwin":
        return
    if os.environ.get("ANKI_GLASS"):
        return                         # already patched/active
    ad = _aqt_dir()
    if ad is None:
        return                         # source build or not an app bundle
    try:                               # respect the user's opt-out (uninstall button)
        from .config import _cfg
        if not _cfg().get("stock_selfheal", True):
            return
    except Exception:
        pass
    if sys.version_info[:2] != (3, 13):
        return                         # can't produce matching bytecode
    h = _buildhash()
    if not h:
        return
    try:
        built = {name: _build_pyc(name, h) for name in _PATCHERS}
    except Exception as exc:
        _notify_once(h, f"couldn't build the glass patch for this Anki "
                        f"({type(exc).__name__}); glass stays off.")
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
        print("[janki] self-heal: re-applied stock glass patch; restart needed.",
              file=sys.stderr)
        _prompt_restart()
    except Exception as exc:
        _notify_once(h, f"couldn't install the glass patch ({type(exc).__name__}); "
                        f"glass stays off.")
