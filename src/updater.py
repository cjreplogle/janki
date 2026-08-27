"""In-app updater (GitHub Releases).

Janki isn't on AnkiWeb (the Glass edition self-patches Anki, which doesn't belong
there), so Anki's native auto-update doesn't apply. This checks the repo's latest
release, and if it's newer than the installed version, offers a one-click update:
it downloads the .ankiaddon for THIS edition (Glass vs Safe, detected via the
safe-edition flag), installs it in place via Anki's own add-on manager (which
preserves your meta.json settings), and prompts a restart.

Behaviour: a throttled once-a-day check on launch that only speaks up when an
update exists, plus a manual "Check for updates" menu item. Stdlib only; every
path is fail-safe (a network hiccup just means no update this time).
"""

import re
import json
import tempfile
import urllib.request
from pathlib import Path
from datetime import date

from aqt import mw
from aqt.utils import showInfo, askUser

from .config import SAFE, log

_REPO = "cjreplogle/janki"
_API = "https://api.github.com/repos/%s/releases/latest" % _REPO
_STATE = Path.home() / ".janki_update_check"


def _asset_name() -> str:
    return "janki-safe.ankiaddon" if SAFE else "janki.ankiaddon"


def _current_version() -> str:
    try:
        # updater.py lives in src/; manifest.json is at the add-on ROOT (one up).
        m = json.loads((Path(__file__).resolve().parent.parent / "manifest.json")
                       .read_text(encoding="utf-8"))
        return str(m.get("human_version", "0"))
    except Exception:
        return "0"


def _ver_tuple(s: str):
    nums = re.findall(r"\d+", (s or "").lstrip("vV"))
    return tuple(int(x) for x in nums) if nums else (0,)


def _fetch_latest():
    """Return (tag, asset_download_url) for this edition, or raise."""
    req = urllib.request.Request(_API, headers={"User-Agent": "janki-updater",
                                                "Accept": "application/vnd.github+json"})
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read().decode("utf-8"))
    tag = data.get("tag_name") or ""
    want = _asset_name()
    url = None
    for a in data.get("assets", []):
        if a.get("name") == want:
            url = a.get("browser_download_url")
            break
    if not url:
        raise ValueError("no %s asset in release %s" % (want, tag or "?"))
    return tag, url


def _download(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "janki-updater"})
    fd, path = tempfile.mkstemp(suffix=".ankiaddon", prefix="janki-update-")
    import os
    os.close(fd)
    with urllib.request.urlopen(req, timeout=60) as r, open(path, "wb") as f:
        f.write(r.read())
    return path


def _install(path: str) -> None:
    try:
        result = mw.addonManager.install(path)
    except Exception as exc:
        showInfo("Janki update: install failed (%s)." % exc, title="Janki")
        return
    finally:
        try:
            import os
            os.unlink(path)
        except Exception:
            pass
    errmsg = getattr(result, "errmsg", None)
    if errmsg:
        showInfo("Janki update: install failed (%s)." % errmsg, title="Janki")
        return
    if askUser("Janki updated to the latest version.\n\nRestart Anki now to "
               "apply it?", title="Janki"):
        mw.close()


def _prompt_update(tag: str, url: str) -> None:
    if not askUser("Janki %s is available (you have v%s).\n\nUpdate now?"
                   % (tag, _current_version()), title="Janki"):
        return

    def work():
        return _download(url)

    def done(fut):
        try:
            path = fut.result()
        except Exception as exc:
            showInfo("Janki update: download failed (%s)." % exc, title="Janki")
            return
        _install(path)

    mw.taskman.run_in_background(work, done)


def check(interactive: bool = False) -> None:
    """Check GitHub for a newer release. interactive=True also reports 'up to
    date' / errors; the background check stays silent unless an update exists."""
    def work():
        return _fetch_latest()

    def done(fut):
        try:
            tag, url = fut.result()
        except Exception as exc:
            log("update check failed: %s" % exc)
            if interactive:
                showInfo("Couldn't check for updates (%s)." % exc, title="Janki")
            return
        if _ver_tuple(tag) > _ver_tuple(_current_version()):
            _prompt_update(tag, url)
        elif interactive:
            showInfo("Janki is up to date (v%s)." % _current_version(), title="Janki")

    mw.taskman.run_in_background(work, done)


# --- daily throttle + wiring ---------------------------------------------------

def _checked_today() -> bool:
    try:
        return _STATE.read_text(encoding="utf-8").strip() == date.today().isoformat()
    except Exception:
        return False


def _mark_checked() -> None:
    try:
        _STATE.write_text(date.today().isoformat(), encoding="utf-8")
    except Exception:
        pass


def maybe_auto_check() -> None:
    """Once-a-day background check on launch; silent unless an update exists."""
    try:
        from .config import _cfg
        if not _cfg().get("auto_update_check", True):
            return
        if _checked_today():
            return
        _mark_checked()
        from aqt.qt import QTimer
        QTimer.singleShot(4000, lambda: check(interactive=False))
    except Exception as exc:
        log("auto update check: %s" % exc)


def install_menu() -> None:
    from aqt.qt import QAction
    act = QAction("Janki: Check for updates…", mw)
    act.triggered.connect(lambda: check(interactive=True))
    mw.form.menuTools.addAction(act)
