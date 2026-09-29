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


def install() -> bool:
    """Write the hook. Returns True if it's in place (new or already there)."""
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
    for d in _site_dirs():
        try:
            os.remove(os.path.join(d, PTH_NAME))
        except Exception:
            pass
