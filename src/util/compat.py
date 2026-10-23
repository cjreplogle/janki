"""Compatibility with other add-ons that redraw Anki's main screens.

Onigiri (AnkiWeb 1011095603) replaces the deck list, the deck overview and the top bar
with its own dashboard. While it's enabled Janki keeps Onigiri's look on those screens:
Janki's deck-list/overview/toolbar styling stands down, its buttons go into Onigiri's
sidebar instead of the top bar, and the glass can optionally show through Onigiri's
panels (Settings → Appearance → Window → "Glass behind Onigiri"). The reviewer, hotkeys,
controller, tray, lockdown, Practice and the Calendar keep working as usual.
"""
from aqt import mw

ONIGIRI_ID = "1011095603"


def _installed_enabled(addon_id: str) -> bool:
    # isEnabled() is vacuously True for an add-on that was never installed (no meta),
    # so confirm it's installed first (same trap as css._redesign_on).
    try:
        am = mw.addonManager
        return addon_id in am.allAddons() and bool(am.isEnabled(addon_id))
    except Exception:
        return False


_onigiri_cache = None


def onigiri_on() -> bool:
    """True while Onigiri is installed and enabled. Cached for the session: enabling or
    disabling an add-on only takes effect after a restart anyway."""
    global _onigiri_cache
    if _onigiri_cache is None:
        _onigiri_cache = _installed_enabled(ONIGIRI_ID)
    return _onigiri_cache


def onigiri_own_page(context) -> bool:
    """True for a webview belonging to Onigiri itself (its settings window, dialogs,
    games…): Janki leaves those pages completely alone."""
    if not onigiri_on() or context is None:
        return False
    try:
        return type(context).__module__.split(".")[0] == ONIGIRI_ID
    except Exception:
        return False


def is_onigiri_content(web_content) -> bool:
    """A page whose scripts/styles come from Onigiri's web folder."""
    mark = "/_addons/%s/" % ONIGIRI_ID
    try:
        return any(ONIGIRI_ID in x for x in list(web_content.css) + list(web_content.js)) \
            or mark in (web_content.head or "") or mark in (web_content.body or "")
    except Exception:
        return False


def onigiri_theme() -> str:
    """Onigiri's home-screen theme: "kome" (Things), "shima", or "onigiri" (default)."""
    if not onigiri_on():
        return ""
    try:
        from importlib import import_module
        oni = import_module(ONIGIRI_ID)
        conf = import_module(ONIGIRI_ID + ".core.config").get_config_readonly()
        if oni._things_theme_selected(conf):
            return "kome"
        if oni._shima_theme_selected(conf):
            return "shima"
    except Exception:
        pass
    return "onigiri"


def janki_view() -> bool:
    """True while Janki's Calendar or Practice view owns the deck-list screen."""
    try:
        from ..features import calendar_view, practice
        return bool(calendar_view._view or practice._practice_view)
    except Exception:
        return False


def onigiri_screen(context) -> bool:
    """True for a webview context Onigiri draws (deck list, overview, top bar). The deck
    list doesn't count while Janki's Calendar/Practice is showing there: then Anki's own
    page is drawn (see integrations/onigiri.py) and Janki styles it as usual."""
    if not onigiri_on():
        return False
    try:
        from aqt.deckbrowser import DeckBrowser
        from aqt.overview import Overview
        from aqt.toolbar import TopToolbar
        if isinstance(context, DeckBrowser):
            # Kome draws Janki's views inside its own page (integrations/onigiri.py);
            # the default dashboard swaps to Anki's page for them.
            return True     # Janki's Calendar/Practice draw inside Onigiri's page

        return isinstance(context, (Overview, TopToolbar))
    except Exception:
        return False


GLASS_KEY = "janki_onigiri_glass"     # collection config: shared with Onigiri's settings


def onigiri_glass() -> bool:
    """"Glass behind Onigiri" on? Stored in the collection config so the toggle in
    Onigiri's own settings and the one in Janki's settings are the same switch; Janki's
    add-on config keeps a mirror for launch, before the collection is open."""
    try:
        if mw.col is not None:
            return bool(mw.col.get_config(GLASS_KEY, False))
    except Exception:
        pass
    try:
        from .config import _cfg
        return bool(_cfg().get("onigiri_glass", False))
    except Exception:
        return False


def set_onigiri_glass(on: bool) -> None:
    try:
        if mw.col is not None:
            mw.col.set_config(GLASS_KEY, bool(on))
    except Exception:
        pass
    try:
        from .config import _cfg_raw
        cfg = _cfg_raw()                    # stored settings only (no runtime overrides)
        cfg["onigiri_glass"] = bool(on)
        mw.addonManager.writeConfig(__name__, cfg)
    except Exception:
        pass


def onigiri_card_font():
    """(font-face CSS, font-family stack) for Onigiri's main "Text" font, so cards can
    match Onigiri's theming. Font files are loaded from Onigiri's own folder (nothing
    is copied into Janki). None when Onigiri isn't on or the font can't be resolved."""
    if not onigiri_on():
        return None
    try:
        import os
        from importlib import import_module
        cfg = import_module(ONIGIRI_ID + ".core.config")
        fonts = import_module(ONIGIRI_ID + ".ui_kit.fonts")
        oni_root = os.path.join(mw.addonManager.addonsFolder(), ONIGIRI_ID)
        key = cfg.get_collection_config("onigiri_font_main", "system") or "system"
        info = fonts.get_all_fonts(oni_root).get(key) or {}
        faces = fonts.poppins_font_face_css(ONIGIRI_ID)       # Onigiri's default face
        family = info.get("family") or "Poppins"
        if key == "system":
            stack = family if "," in family else "'%s', -apple-system, sans-serif" % family
        else:
            stack = ("'%s', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, "
                     "Helvetica, Arial, sans-serif" % family)
        if info.get("file"):
            sub = "user_files/fonts" if info.get("user") else "system_files/fonts/system_fonts"
            faces += ("@font-face{font-family:'%s';src:url('/_addons/%s/%s/%s');"
                      "font-display:swap;}" % (family, ONIGIRI_ID, sub, info["file"]))
        return faces, stack
    except Exception:
        return None
