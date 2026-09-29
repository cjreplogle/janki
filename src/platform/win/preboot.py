"""Windows pre-launch hook for glass (plan §4.1) — the Windows twin of the Mac patch's
pre-app code (stock_selfheal._INIT_INJECT).

See-through glass needs two things before Anki creates its QApplication, which is
before any add-on runs:
  1. Chromium flags (software compositing, no occlusion throttling), and
  2. an alpha channel on Qt's default surface format — without it the web views draw
     onto an opaque surface and the window shows solid grey.

Python runs `import …` lines of *.pth files in its site directories at start-up, so a
one-line .pth imports `janki_preboot`, which sets the flags and wraps aqt.AnkiApp so
the surface format is set right before the app is created. No Anki file is edited —
except on bundled-Python Anki builds, whose python3XX._pth file switches `site` off
(so .pth files are ignored): there the `import site` line is enabled (original backed
up as .janki-orig and restored on uninstall).

The module exports JANKI_WIN_PREBOOT=1 so the add-on knows this launch is glass-ready.
"""
import glob
import os
import shutil
import site
import sys
import sysconfig

PTH_NAME = "janki_win_glass.pth"
MOD_NAME = "janki_preboot.py"
_FLAGS = ("--disable-gpu --disable-gpu-compositing "
          "--disable-features=CalculateNativeWinOcclusion "
          "--disable-renderer-backgrounding --disable-backgrounding-occluded-windows")
_PTH_LINE = "import janki_preboot\n"
# Fast (GPU) mode keeps Anki's GPU rendering; only occlusion throttling is turned off.
_GPU_FLAGS = "--disable-features=CalculateNativeWinOcclusion --disable-renderer-backgrounding"


def render_mode() -> str:
    """Configured rendering: "gpu" (fast, default) or "software" (see-through glass)."""
    try:
        from aqt import mw
        m = str((mw.addonManager.getConfig(__name__) or {}).get("win_render", "gpu")).lower()
    except Exception:
        m = "gpu"
    return "software" if m == "software" else "gpu"


def frameless() -> bool:
    """Use the frameless glass window now? Fast (GPU) mode needs no start-up hook, so
    it's on right away; See-through needs its hook to have run in this launch."""
    run = running_mode()
    if run == "software":
        return active()
    return render_mode() == "gpu"


def running_mode() -> str:
    """The rendering mode THIS launch actually started with."""
    return os.environ.get("JANKI_WIN_RENDER", "")


def _module_text(mode=None) -> str:
    sw = (mode or render_mode()) == "software"
    return _MODULE % (sw, _FLAGS if sw else _GPU_FLAGS)

_MODULE = '''"""Janki glass pre-launch hook (written by the Janki add-on; safe to delete)."""
import os, sys, time


def _jlog(msg):
    try:
        d = os.path.join(os.environ.get("LOCALAPPDATA", ""), "Janki", "Logs")
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "janki-preboot.log"), "a", encoding="utf-8") as f:
            f.write("%%s %%s\\n" %% (time.strftime("%%Y-%%m-%%d %%H:%%M:%%S"), msg))
    except Exception:
        pass


_jlog("hook ran (python %%s)" %% sys.version.split()[0])
SOFTWARE = %r      # True: see-through glass (software rendering); False: fast GPU mode
os.environ.setdefault("QTWEBENGINE_CHROMIUM_FLAGS", %r)
os.environ["JANKI_WIN_PREBOOT"] = "2"   # "2" = this hook ran
os.environ["JANKI_WIN_RENDER"] = "software" if SOFTWARE else "gpu"


def _patch(aqt):
    orig = getattr(aqt, "AnkiApp", None)
    if orig is None or getattr(orig, "_janki_alpha", False):
        return

    class JankiApp(orig):
        _janki_alpha = True

        def __init__(self, *a, **k):
            if not SOFTWARE:                     # fast mode: leave Anki's GPU setup alone
                _jlog("GPU rendering (fast mode)")
                super().__init__(*a, **k)
                return
            try:
                from PyQt6.QtGui import QSurfaceFormat
                f = QSurfaceFormat.defaultFormat()
                f.setAlphaBufferSize(8)          # transparent web views need alpha
                QSurfaceFormat.setDefaultFormat(f)
                _jlog("surface alpha set before AnkiApp")
            except Exception as e:
                _jlog("surface alpha failed: %%r" %% (e,))
            try:
                # Anki picks Direct3D 11 for Qt Quick (which draws the web views); a D3D
                # surface comes out opaque in a translucent window. The software renderer
                # keeps alpha — same as Anki's own "Software" video driver.
                from PyQt6.QtQuick import QQuickWindow, QSGRendererInterface
                QQuickWindow.setGraphicsApi(QSGRendererInterface.GraphicsApi.Software)
                _jlog("Qt Quick -> software renderer")
            except Exception as e:
                _jlog("software renderer failed: %%r" %% (e,))
            super().__init__(*a, **k)
    aqt.AnkiApp = JankiApp
    _jlog("aqt.AnkiApp wrapped")


class _AfterAqt:
    """Runs _patch once the aqt package has finished importing."""
    def find_spec(self, name, path=None, target=None):
        if name != "aqt":
            return None
        import importlib.util
        sys.meta_path.remove(self)
        try:
            spec = importlib.util.find_spec("aqt")
        finally:
            pass
        if spec is None or spec.loader is None:
            return None
        run = spec.loader.exec_module

        def exec_module(module, _run=run):
            _run(module)
            try:
                _patch(module)
            except Exception:
                pass
        spec.loader.exec_module = exec_module
        return spec


sys.meta_path.insert(0, _AfterAqt())
'''


def _pth_file():
    """Bundled builds: the python3XX._pth next to the interpreter, else None."""
    for p in glob.glob(os.path.join(os.path.dirname(sys.executable), "python3*._pth")):
        return p
    return None


def _site_dirs():
    out = []
    try:
        out.append(sysconfig.get_paths()["purelib"])
    except Exception:
        pass
    try:
        out += site.getsitepackages()
    except Exception:
        pass
    if _pth_file():
        out.insert(0, os.path.dirname(sys.executable))   # the prefix is a site dir there
    seen, res = set(), []
    for d in out:
        if d and d not in seen and os.path.isdir(d):
            seen.add(d)
            res.append(d)
    return res


def active() -> bool:
    """This launch started with the hook."""
    return os.environ.get("JANKI_WIN_PREBOOT") == "2"


def installed() -> bool:
    return any(os.path.isfile(os.path.join(d, PTH_NAME)) for d in _site_dirs())


def _enable_site_in_pth(on: bool) -> bool:
    p = _pth_file()
    if not p:
        return True
    bak = p + ".janki-orig"
    try:
        if on:
            txt = open(p, encoding="utf-8").read()
            if any(l.strip() == "import site" for l in txt.splitlines()):
                return True
            if not os.path.exists(bak):
                shutil.copy2(p, bak)
            lines = [("import site" if l.strip() == "#import site" else l)
                     for l in txt.splitlines()]
            if "import site" not in lines:
                lines.append("import site")
            with open(p, "w", encoding="utf-8") as f:
                f.write("\n".join(lines) + "\n")
        elif os.path.exists(bak):
            shutil.copy2(bak, p)
            os.remove(bak)
        return True
    except Exception:
        return False


def _clear_old_user_env():
    """An earlier Janki build set these per-user; they can't do the surface part."""
    try:
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment", 0,
                            winreg.KEY_READ | winreg.KEY_SET_VALUE) as k:
            for name in ("JANKI_WIN_PREBOOT", "QTWEBENGINE_CHROMIUM_FLAGS"):
                try:
                    val = winreg.QueryValueEx(k, name)[0]
                    if name == "JANKI_WIN_PREBOOT" or "--disable-gpu-compositing" in val:
                        winreg.DeleteValue(k, name)
                except FileNotFoundError:
                    pass
    except Exception:
        pass


# Variables a relaunch should carry so the next Anki starts glass-ready even if the
# hook can't run in it for some reason (harmless when it can).
_ENV = {}   # the hook sets everything itself; nothing to carry into a relaunch


changed = False     # set by install(): the hook on disk was missing or out of date


def install() -> bool:
    """Put the hook in place (rewriting it if this Janki's version differs). Returns True
    if it's in place; `changed` tells whether a restart is needed to pick it up."""
    global changed
    changed = False
    _clear_old_user_env()
    if not _enable_site_in_pth(True):
        return False
    for d in _site_dirs():
        mp, pp = os.path.join(d, MOD_NAME), os.path.join(d, PTH_NAME)
        try:
            cur = open(mp, encoding="utf-8").read() if os.path.isfile(mp) else None
            want = _module_text()
            if cur != want:
                with open(mp, "w", encoding="utf-8") as f:
                    f.write(want)
                changed = True
            if not os.path.isfile(pp):
                with open(pp, "w", encoding="utf-8") as f:
                    f.write(_PTH_LINE)
                changed = True
            return True
        except Exception:
            continue
    return False


def uninstall() -> None:
    _clear_old_user_env()
    for d in _site_dirs():
        for n in (PTH_NAME, MOD_NAME):
            try:
                os.remove(os.path.join(d, n))
            except Exception:
                pass
    _enable_site_in_pth(False)
