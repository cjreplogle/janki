"""What's new: after an update, the first launch shows the release notes for every version
since the one you last saw (read from the README's Changelog — one source for notes).
Also reachable any time from Settings → General (next to Documentation).

The last-seen version is kept in user_files/ (not the add-on config, which the Settings
dialog rewrites wholesale). A fresh install just records the version: the first-launch
setup already greets new users.
"""
import json
import os
import re

from aqt import mw
from aqt.qt import QDialog, QDialogButtonBox, QTextBrowser, QTimer, QVBoxLayout

from ..util.config import log

_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
_SEEN = os.path.join(_ROOT, "user_files", "whats_new_seen")
_HEAD = re.compile(r"^\*\*(\d+\.\d+\.\d+)\*\*\s*·\s*(.+)$")


def _vt(v):
    try:
        return tuple(int(x) for x in re.findall(r"\d+", v)[:3])
    except Exception:
        return (0,)


def _version():
    try:
        with open(os.path.join(_ROOT, "manifest.json"), encoding="utf-8") as fh:
            return str(json.load(fh).get("human_version", "")).rstrip("w")
    except Exception:
        return ""


def releases():
    """[(version, date, markdown body)] newest first, from the README changelog."""
    try:
        with open(os.path.join(_ROOT, "README.md"), encoding="utf-8") as fh:
            text = fh.read()
    except Exception:
        return []
    i = text.find("## Changelog")
    if i < 0:
        return []
    out, cur = [], None
    for line in text[i:].splitlines():
        m = _HEAD.match(line.strip())
        if m:
            if cur:
                out.append(cur)
            cur = [m.group(1), m.group(2).strip(), []]
        elif cur is not None:
            if line.strip().startswith(("</details>", "<details>", "<summary>")):
                continue
            cur[2].append(line)
    if cur:
        out.append(cur)
    return [(v, d, "\n".join(b).strip()) for v, d, b in out]


def _markdown(since=None):
    # only the current release series (e.g. every 2.11.x while on 2.11)
    series = _vt(_version())[:2]
    rel = [r for r in releases() if _vt(r[0])[:2] == series]
    if not rel:
        rel = releases()[:1]
    parts = ["## %s  \n*%s*\n\n%s" % (v, d, body) for v, d, body in rel]
    parts.append("\n---\nFull history: [Janki releases on GitHub]"
                 "(https://github.com/cjreplogle/janki/releases)")
    return "\n\n".join(parts)


def show(since=None):
    dlg = QDialog(mw)
    dlg.setWindowTitle("What's new in Janki %s" % _version())
    dlg.resize(620, 560)
    # same frosted glass + interface font as Settings (must be set before first show)
    try:
        from ..user import glass
        glass.glass_dialog(dlg)
    except Exception as e:
        log("whats_new glass: %s" % e)
    try:
        from ..user import css as _css
        _css.apply_widget_ui_font(dlg)
    except Exception:
        pass
    lay = QVBoxLayout(dlg)
    if getattr(dlg, "_jk_expanded", False):          # content runs up under the titlebar
        m = lay.contentsMargins()
        lay.setContentsMargins(m.left(), 30, m.right(), m.bottom())
    tb = QTextBrowser()
    tb.setOpenExternalLinks(True)
    # see-through so the frost shows; the viewport needs it too
    tb.setStyleSheet("QTextBrowser{border:none;padding:6px;font-size:14px;"
                     "background:transparent;}")
    tb.viewport().setAutoFillBackground(False)
    tb.document().setDefaultStyleSheet("a{color:#6ab0ff;text-decoration:none;}")
    tb.setMarkdown(_markdown(since))
    lay.addWidget(tb)
    bb = QDialogButtonBox(QDialogButtonBox.StandardButton.Close)
    bb.rejected.connect(dlg.reject)
    bb.accepted.connect(dlg.accept)
    lay.addWidget(bb)
    dlg.show()
    mw._janki_whats_new = dlg          # keep a reference (non-modal)


def check_after_update():
    """Call once at startup: shows the notes if Janki was updated since last seen."""
    cur = _version()
    if not cur:
        return
    try:
        with open(_SEEN, encoding="utf-8") as fh:
            seen = fh.read().strip()
    except Exception:
        seen = None
    try:
        os.makedirs(os.path.dirname(_SEEN), exist_ok=True)
        with open(_SEEN, "w", encoding="utf-8") as fh:
            fh.write(cur)
    except Exception as e:
        log("whats_new: %s" % e)
    if seen is None:
        # No record yet: a fresh install (first-launch setup greets them — no notes), or an
        # update from a Janki that predates this page (already set up → show the notes).
        try:
            from ..util import state
            if state.first_run():
                return
        except Exception:
            return
        QTimer.singleShot(2500, show)
    elif _vt(cur) > _vt(seen):
        QTimer.singleShot(2500, lambda: show(since=seen))      # after the window settles
