"""Windows pre-launch hook for glass (plan §4.1).

True transparency needs Chromium flags that Anki reads only at launch, before any
add-on runs. Python executes `import …` lines in *.pth files found in site-packages
at interpreter start, so one tiny file in Anki's own environment sets them — for Anki
only, with no Anki file edited and no admin rights. Removing the file undoes it.

The hook also exports JANKI_WIN_PREBOOT=1 so the add-on knows this launch has the
flags (transparent webviews) and can safely make the window translucent.
"""
import os
import site
import sysconfig

PTH_NAME = "janki_win_glass.pth"
# Software compositing: Chromium draws into Qt's (translucent) backing store instead
# of a GPU surface, which a layered window can't show. Same idea as the Mac build.
_FLAGS = "--disable-gpu --disable-gpu-compositing"
_LINE = ("import os; os.environ.setdefault('QTWEBENGINE_CHROMIUM_FLAGS', %r); "
         "os.environ['JANKI_WIN_PREBOOT'] = '1'\n" % _FLAGS)


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
    seen, res = set(), []
    for d in out:
        if d and d not in seen and os.path.isdir(d):
            seen.add(d)
            res.append(d)
    return res


def active() -> bool:
    """This launch started with the hook's flags."""
    return os.environ.get("JANKI_WIN_PREBOOT") == "1"


def installed() -> bool:
    return any(os.path.isfile(os.path.join(d, PTH_NAME)) for d in _site_dirs())


def _site_enabled() -> bool:
    """Bundled-Python Anki builds (python313._pth without `import site`) never read
    .pth files, so the hook file would be ignored there."""
    import sys
    return "site" in sys.modules and not sys.flags.no_site


# Fallback for those builds: the same two variables as per-user environment variables
# (HKCU\Environment, no admin), read by every new Anki launch. Other apps built on Qt's
# web engine would see the software-rendering flag too — rare, and removed on uninstall.
_ENV = {"QTWEBENGINE_CHROMIUM_FLAGS": _FLAGS, "JANKI_WIN_PREBOOT": "1"}


def _set_user_env(on: bool) -> bool:
    try:
        import winreg
        import ctypes
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment", 0,
                            winreg.KEY_READ | winreg.KEY_SET_VALUE) as k:
            for name, val in _ENV.items():
                if on:
                    try:
                        cur = winreg.QueryValueEx(k, name)[0]
                    except FileNotFoundError:
                        cur = None
                    if name == "QTWEBENGINE_CHROMIUM_FLAGS" and cur and cur != val:
                        val = cur if _FLAGS in cur else (cur + " " + _FLAGS)  # keep theirs
                    winreg.SetValueEx(k, name, 0, winreg.REG_SZ, val)
                else:
                    try:
                        cur = winreg.QueryValueEx(k, name)[0]
                        if name != "QTWEBENGINE_CHROMIUM_FLAGS" or cur == _FLAGS:
                            winreg.DeleteValue(k, name)
                        else:
                            winreg.SetValueEx(k, name, 0, winreg.REG_SZ,
                                              cur.replace(_FLAGS, "").strip())
                    except FileNotFoundError:
                        pass
        # Tell Explorer so apps started from it pick up the change.
        ctypes.windll.user32.SendMessageTimeoutW(0xFFFF, 0x1A, 0, "Environment", 2, 2000, None)
        return True
    except Exception:
        return False


def install() -> bool:
    """Put the hook in place. Returns True if it's in place (new or already there)."""
    if not _site_enabled():
        return _set_user_env(True)
    for d in _site_dirs():
        p = os.path.join(d, PTH_NAME)
        try:
            if os.path.isfile(p) and open(p, encoding="utf-8").read() == _LINE:
                return True
            with open(p, "w", encoding="utf-8") as f:
                f.write(_LINE)
            return True
        except Exception:
            continue
    return False


def uninstall() -> None:
    _set_user_env(False)
    for d in _site_dirs():
        try:
            os.remove(os.path.join(d, PTH_NAME))
        except Exception:
            pass
