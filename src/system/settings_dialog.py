"""The GlassSettings dialog and its opener."""

import sys
from aqt import mw
from aqt.qt import QCheckBox, QColor, QColorDialog, QDialog, QHBoxLayout, QLabel, QSlider, QSpinBox, Qt, QVBoxLayout
from aqt.utils import tooltip

from ..util.config import log, _cfg, SAFE
from ..features import card_timer, focus, pomodoro
from ..user import glass, hud, css
from . import tray
from ..util import diagnostics, keytap
from ..integrations import gamepad
from ..integrations import amboss, mobilecards, qbank
from . import stock_selfheal, updater

class GlassSettings(QDialog):
    """macOS-Terminal-style controls: background colour, opacity, blur radius."""

    def __init__(self):
        super().__init__(mw)
        self.setWindowTitle("Janki")
        self.cfg = _cfg()
        self.cfg.setdefault("tint_mode", "custom")
        lay = QVBoxLayout(self)

        # On non-macOS the native visual features cleanly no-op (guarded). The
        # cross-platform features still run. Warn up front so the mac-only controls
        # below don't confuse Windows/Linux users.
        if sys.platform != "darwin":
            _warn = QLabel(
                "ℹ️  On this platform Janki runs its cross-platform features — "
                "today's-lectures import, card zoom (Ctrl +/−), the text-reveal "
                "animation, dark-text rescue, deck stats, and close-to-tray. The "
                "macOS-only visuals (glass/transparency, caption HUD, Pomodoro, "
                "card-timer flares, AMBOSS frost, global hotkeys, controller) are "
                "turned off here."
            )
            _warn.setWordWrap(True)
            _warn.setStyleSheet(
                "QLabel { background: rgba(255,176,32,0.15); color: #b26a00; "
                "border: 1px solid rgba(255,176,32,0.55); border-radius: 6px; "
                "padding: 8px 10px; }"
            )
            lay.addWidget(_warn)

        # Tabbed panels. Focus and Lectures are NESTED tab groups; the section
        # builders below append to the appropriate page layout.
        from aqt.qt import (QTabWidget, QWidget, QComboBox, QGridLayout,
                            QPushButton, QButtonGroup)
        tabs = QTabWidget()
        app_page = QWidget();   app_lay = QVBoxLayout(app_page)
        prac_page = QWidget();  prac_lay = QVBoxLayout(prac_page)
        gen_page = QWidget();   gen_lay = QVBoxLayout(gen_page)

        # Focus → subtabs: Flare / Timer / Caption / Pomodoro / Lockdown.
        focus_page = QWidget(); _focus_outer = QVBoxLayout(focus_page)
        _focus_outer.setContentsMargins(0, 0, 0, 0)
        focus_tabs = QTabWidget()
        _focus_outer.addWidget(focus_tabs)
        flare_page = QWidget(); flare_lay = QVBoxLayout(flare_page)
        timer_page = QWidget(); timer_lay = QVBoxLayout(timer_page)
        cap_page = QWidget();   cap_lay = QVBoxLayout(cap_page)
        pomo_page = QWidget();  pomo_lay = QVBoxLayout(pomo_page)
        lock_page = QWidget();  lock_lay = QVBoxLayout(lock_page)
        focus_tabs.addTab(flare_page, "Flare")
        focus_tabs.addTab(timer_page, "Timer")
        focus_tabs.addTab(cap_page, "Caption")
        focus_tabs.addTab(pomo_page, "Pomodoro")
        focus_tabs.addTab(lock_page, "Lockdown")

        tabs.addTab(app_page, "Appearance")
        tabs.addTab(focus_page, "Focus")

        # Lectures → subtabs (Sources / Behavior) from the lectures submodule so
        # everything lives in ONE settings window. Their save fns run on Close.
        self._lecture_savers = []
        try:
            from ..integrations import lectures as _lectures
            _pages, _lsave = _lectures.build_settings_pages()
            lec_page = QWidget(); _lec_outer = QVBoxLayout(lec_page)
            _lec_outer.setContentsMargins(0, 0, 0, 0)
            lec_tabs = QTabWidget(); _lec_outer.addWidget(lec_tabs)
            for _title, _widget in _pages:
                lec_tabs.addTab(_widget, _title)
            tabs.addTab(lec_page, "Lectures")
            if _lsave:
                self._lecture_savers.append(_lsave)
        except Exception as _e:
            log("lecture settings tabs failed: %s" % _e)

        tabs.addTab(prac_page, "Practice")
        tabs.addTab(gen_page, "General")

        lay.addWidget(tabs)

        # === Appearance ======================================================
        # --- Background colour picker (a colour well like Terminal) ----------
        col_row = QHBoxLayout()
        col_label = QLabel("Background colour")
        col_label.setMinimumWidth(140)
        col_row.addWidget(col_label)
        self._color_btn = QPushButton()
        self._color_btn.setMinimumWidth(80)
        self._update_color_swatch()
        self._color_btn.clicked.connect(self._pick_color)
        col_row.addWidget(self._color_btn)
        col_row.addStretch()
        app_lay.addLayout(col_row)

        # --- Interface font (system-wide UI + card font) --------------------
        # Sets the font used across the whole app (deck list, toolbar, buttons,
        # counters and the reviewer card). "Lora" ships with the add-on; the rest
        # are system fonts. Stored in `card_font`; live-applies by reloading views.
        from aqt.qt import QComboBox
        _uifont_row = QHBoxLayout()
        _uifont_name = QLabel("Interface font")
        _uifont_name.setMinimumWidth(140)
        self._ui_font = QComboBox()
        for _lbl in css.UI_FONTS:
            self._ui_font.addItem(_lbl, _lbl)
        _cur_font = css.ui_font_label(self.cfg)
        if self._ui_font.findData(_cur_font) < 0:      # a custom hand-typed family
            self._ui_font.addItem(_cur_font, _cur_font)
        self._ui_font.setCurrentIndex(max(0, self._ui_font.findData(_cur_font)))

        def on_ui_font(_i):
            self.cfg["card_font"] = self._ui_font.currentData()
            mw.addonManager.writeConfig(__name__, self.cfg)
            try:
                glass._reload_all_webviews()   # re-inject CSS with the new font
            except Exception:
                pass
            try:
                from ..user import css as _css
                _css.apply_native_ui_font(self.cfg)   # refresh native menu font too
            except Exception:
                pass

        self._ui_font.currentIndexChanged.connect(on_ui_font)
        _uifont_row.addWidget(_uifont_name)
        _uifont_row.addWidget(self._ui_font)
        _uifont_row.addStretch()
        app_lay.addLayout(_uifont_row)

        # --- Opacity + Blur sliders -----------------------------------------
        for key, label, lo, hi, scale in [
            ("body_opacity", "Opacity", 0, 100, 100.0),
            ("blur_radius", "Blur radius", 0, 80, 1.0),
        ]:
            row = QHBoxLayout()
            name = QLabel(label)
            name.setMinimumWidth(140)
            val = QLabel()
            s = QSlider(Qt.Orientation.Horizontal)
            s.setMinimum(lo)
            s.setMaximum(hi)
            s.setValue(int(self.cfg.get(key, 0) * (scale if scale != 1.0 else 1)))

            def make_cb(k=key, sc=scale, lbl=val):
                def cb(v):
                    self.cfg[k] = (v / sc) if sc != 1.0 else v
                    lbl.setText(f"{self.cfg[k]:.2f}" if sc != 1.0 else str(v))
                    if k == "blur_radius":
                        glass._set_blur(self.cfg[k])
                    else:
                        diagnostics._live_apply(self.cfg)
                return cb

            s.valueChanged.connect(make_cb())
            val.setText(f"{self.cfg.get(key,0):.2f}" if scale != 1.0 else str(self.cfg.get(key,0)))
            row.addWidget(name)
            row.addWidget(s)
            row.addWidget(val)
            app_lay.addLayout(row)

        # --- Text animation speed -------------------------------------------
        # Uniform multiplier on the typewriter reveal duration (1.0 = normal,
        # higher = faster). Applies to the NEXT card render — no live re-run.
        # Slider is x10 so we keep 0.1x steps over 0.5x–4.0x.
        ta_row = QHBoxLayout()
        ta_name = QLabel("Text animation speed")
        ta_name.setMinimumWidth(140)
        ta_val = QLabel()
        ta_s = QSlider(Qt.Orientation.Horizontal)
        ta_s.setMinimum(5)     # 0.5x (slower)
        ta_s.setMaximum(40)    # 4.0x (faster)
        ta_s.setValue(int(round(float(self.cfg.get("typewriter_speed", 1.0)) * 10)))

        def _ta_cb(v):
            self.cfg["typewriter_speed"] = v / 10.0
            ta_val.setText(f"{v/10.0:.1f}x")
            mw.addonManager.writeConfig(__name__, self.cfg)

        ta_s.valueChanged.connect(_ta_cb)
        ta_val.setText(f"{float(self.cfg.get('typewriter_speed', 1.0)):.1f}x")
        ta_row.addWidget(ta_name)
        ta_row.addWidget(ta_s)
        ta_row.addWidget(ta_val)
        app_lay.addLayout(ta_row)

        # === Focus ===========================================================
        # --- Card timer curve ------------------------------------------------
        # Show/hide the thin progress bar under the toolbar. Independent of the red
        # flare — unchecking hides the bar but the timer + flare still run.
        from aqt.qt import QComboBox as _QComboBox
        style_row = QHBoxLayout()
        style_name = QLabel("Card timer style")
        style_name.setMinimumWidth(140)
        self._ct_style = _QComboBox()
        self._ct_style.addItem("Timer ring", "ring")
        self._ct_style.addItem("Progress bar", "bar")
        self._ct_style.addItem("Off", "off")
        _cur_style = str(self.cfg.get("card_timer_style", "ring")).lower()
        self._ct_style.setCurrentIndex(max(0, self._ct_style.findData(_cur_style)))

        def on_ct_style(_i):
            self.cfg["card_timer_style"] = self._ct_style.currentData()
            mw.addonManager.writeConfig(__name__, self.cfg)
            if card_timer._card_timer_instance is not None:
                card_timer._card_timer_instance.sync_bar_pref()

        self._ct_style.currentIndexChanged.connect(on_ct_style)
        style_row.addWidget(style_name)
        style_row.addWidget(self._ct_style)
        timer_lay.addLayout(style_row)

        # Timer ring position (top-right = the Sync-button row, or bottom-right).
        ring_row = QHBoxLayout()
        ring_name = QLabel("Timer ring position")
        ring_name.setMinimumWidth(140)
        self._ring_corner = _QComboBox()
        self._ring_corner.addItem("Top", "top")
        self._ring_corner.addItem("Tray", "tray")
        self._ring_corner.addItem("Bottom", "bottom")
        self._ring_corner.addItem("Bottom (Narrow)", "bottom_narrow")
        _cur_corner = str(self.cfg.get("card_timer_ring_corner", "tray")).lower()
        self._ring_corner.setCurrentIndex(max(0, self._ring_corner.findData(_cur_corner)))

        def on_ring_corner(_i):
            self.cfg["card_timer_ring_corner"] = self._ring_corner.currentData()
            mw.addonManager.writeConfig(__name__, self.cfg)
            if card_timer._card_timer_instance is not None:
                card_timer._card_timer_instance._bar.reposition()

        self._ring_corner.currentIndexChanged.connect(on_ring_corner)
        ring_row.addWidget(ring_name)
        ring_row.addWidget(self._ring_corner)
        timer_lay.addLayout(ring_row)

        # Transparency of the ring / bar (window opacity).
        rop_row = QHBoxLayout()
        rop_name = QLabel("Card timer transparency")
        rop_name.setMinimumWidth(140)
        rop_val = QLabel()
        rop_s = QSlider(Qt.Orientation.Horizontal)
        rop_s.setMinimum(10)     # 0.10 (very transparent)
        rop_s.setMaximum(100)    # 1.00 (opaque)
        rop_s.setValue(int(round(float(self.cfg.get("card_timer_ring_opacity", 0.58)) * 100)))

        def _rop_cb(v):
            self.cfg["card_timer_ring_opacity"] = v / 100.0
            rop_val.setText(f"{v}%")
            mw.addonManager.writeConfig(__name__, self.cfg)
            inst = card_timer._card_timer_instance
            if inst is not None and inst._bar.isVisible():
                inst._bar.setWindowOpacity(v / 100.0)

        rop_s.valueChanged.connect(_rop_cb)
        rop_val.setText(f"{int(round(float(self.cfg.get('card_timer_ring_opacity', 0.58)) * 100))}%")
        rop_row.addWidget(rop_name)
        rop_row.addWidget(rop_s)
        rop_row.addWidget(rop_val)
        timer_lay.addLayout(rop_row)

        # Real seconds until the red flare for a ~1-sentence card; card length then
        # nudges it within a clamped band (see start_card). Range 1.0–60.0s
        # (x10 on the int slider so we keep 0.1s resolution).
        ct_row = QHBoxLayout()
        ct_name = QLabel("Seconds until flare")
        ct_name.setMinimumWidth(140)
        ct_val = QLabel()
        ct_s = QSlider(Qt.Orientation.Horizontal)
        ct_s.setMinimum(10)    # 1.0s
        ct_s.setMaximum(600)   # 60.0s
        ct_s.setValue(int(round(float(self.cfg.get("card_timer_seconds", 8.0)) * 10)))

        def _ct_cb(v):
            self.cfg["card_timer_seconds"] = v / 10.0
            ct_val.setText(f"{v/10.0:.1f}s")
            mw.addonManager.writeConfig(__name__, self.cfg)
            # start_card reads this live, so just restart the CURRENT card's timer
            # to make the change visible immediately (no rebuild needed).
            r = getattr(mw, "reviewer", None)
            card = getattr(r, "card", None) if r else None
            if (card is not None and card_timer._card_timer_instance is not None
                    and getattr(r, "state", None) == "question"):
                card_timer._card_timer_instance._on_q(card)

        ct_s.valueChanged.connect(_ct_cb)
        ct_val.setText(f"{float(self.cfg.get('card_timer_seconds', 8.0)):.1f}s")
        ct_row.addWidget(ct_name)
        ct_row.addWidget(ct_s)
        ct_row.addWidget(ct_val)
        timer_lay.addLayout(ct_row)

        # Red edge-flare when the card timer fills (time to move on).
        self._red_flare = QCheckBox("Red flare when the card timer runs out")
        self._red_flare.setChecked(bool(self.cfg.get("card_timer_red_flare", True)))

        def on_red_flare(_state):
            self.cfg["card_timer_red_flare"] = self._red_flare.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # If turned off mid-card while the flare is up, clear it now.
            if (not self._red_flare.isChecked() and card_timer._card_timer_instance is not None
                    and getattr(card_timer._card_timer_instance, "_overlay", None)):
                card_timer._card_timer_instance._overlay.set_active(False)

        self._red_flare.stateChanged.connect(on_red_flare)
        flare_lay.addWidget(self._red_flare)

        # Red flare transparency: peak edge alpha (lower = more transparent). One
        # slider governs both windowed and Focus-Mode flares (Focus keeps a +10
        # boost so it still reads a touch stronger with the chrome gone).
        rf_row = QHBoxLayout()
        rf_name = QLabel("Red flare intensity")
        rf_name.setMinimumWidth(140)
        rf_val = QLabel()
        rf_s = QSlider(Qt.Orientation.Horizontal)
        rf_s.setMinimum(2)     # very transparent
        rf_s.setMaximum(40)    # bold
        rf_s.setValue(int(self.cfg.get("card_timer_pulse_alpha", 14)))

        def _rf_cb(v):
            self.cfg["card_timer_pulse_alpha"] = v
            self.cfg["card_timer_pulse_alpha_focus"] = min(255, v + 10)
            rf_val.setText(str(v))
            mw.addonManager.writeConfig(__name__, self.cfg)
            # Re-apply live so a currently-visible flare updates immediately.
            if card_timer._card_timer_instance is not None:
                ov = getattr(card_timer._card_timer_instance, "_overlay", None)
                if ov is not None:
                    ov._max_a = (v + 10) if focus._focus_hidden else v
                    if ov.isVisible():
                        ov.update()

        rf_s.valueChanged.connect(_rf_cb)
        rf_val.setText(str(int(self.cfg.get("card_timer_pulse_alpha", 14))))
        rf_row.addWidget(rf_name)
        rf_row.addWidget(rf_s)
        rf_row.addWidget(rf_val)
        flare_lay.addLayout(rf_row)

        # Green edge-flare when a card is answered such that it's finished for today
        # (review cards, or inter-day learning graduating past today).
        self._green_flare = QCheckBox("Green flare when a card is done for the day")
        self._green_flare.setChecked(bool(self.cfg.get("card_timer_green_flare", True)))

        def on_green_flare(_state):
            self.cfg["card_timer_green_flare"] = self._green_flare.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)

        self._green_flare.stateChanged.connect(on_green_flare)
        flare_lay.addWidget(self._green_flare)

        # --- Lockdown / kiosk focus mode (macOS) -----------------------------
        from aqt.qt import QComboBox as _QComboBox
        ld_note = QLabel(
            "Lockdown mode (menu Tools → Janki: Lockdown mode, ⌘⌃L, or `+Delete) "
            "hides the Dock and menu bar and blocks app switching to keep you in "
            "Anki. It's a soft focus aid, not tamper-proof. Exit by holding Space.")
        ld_note.setWordWrap(True)
        ld_note.setStyleSheet("color: gray; margin-top: 8px;")
        lock_lay.addWidget(ld_note)

        ld_row = QHBoxLayout()
        ld_name = QLabel("Lockdown level")
        ld_name.setMinimumWidth(140)
        self._ld_level = _QComboBox()
        self._ld_level.addItem("Standard — hide Dock/menu bar, block switching", "standard")
        self._ld_level.addItem("Strict — also disable force-quit + logout", "strict")
        self._ld_level.addItem("Very strict — also quit other apps + Wi-Fi off", "very_strict")
        _cur_lvl = str(self.cfg.get("lockdown_level", "standard")).lower()
        self._ld_level.setCurrentIndex(max(0, self._ld_level.findData(_cur_lvl)))

        def on_ld_level(_i):
            self.cfg["lockdown_level"] = self._ld_level.currentData()
            mw.addonManager.writeConfig(__name__, self.cfg)

        self._ld_level.currentIndexChanged.connect(on_ld_level)
        ld_row.addWidget(ld_name)
        ld_row.addWidget(self._ld_level)
        lock_lay.addLayout(ld_row)

        ldh_row = QHBoxLayout()
        ldh_name = QLabel("Hold Space to exit")
        ldh_name.setMinimumWidth(140)
        ldh_val = QLabel()
        ldh_s = QSlider(Qt.Orientation.Horizontal)
        ldh_s.setMinimum(20)    # 2.0s
        ldh_s.setMaximum(150)   # 15.0s
        ldh_s.setValue(int(round(float(self.cfg.get("lockdown_hold_secs", 5.0)) * 10)))

        def _ldh_cb(v):
            self.cfg["lockdown_hold_secs"] = v / 10.0
            ldh_val.setText(f"{v/10.0:.1f}s")
            mw.addonManager.writeConfig(__name__, self.cfg)

        ldh_s.valueChanged.connect(_ldh_cb)
        ldh_val.setText(f"{float(self.cfg.get('lockdown_hold_secs', 5.0)):.1f}s")
        ldh_row.addWidget(ldh_name)
        ldh_row.addWidget(ldh_s)
        ldh_row.addWidget(ldh_val)
        lock_lay.addLayout(ldh_row)

        # --- Global hotkeys (drive the reviewer while unfocused) -------------
        self._gkeys = QCheckBox(
            "Pass Tab+Z/X/C/V/Space to Anki when not focused — hold Tab as modifier (requires Accessibility permission)"
        )
        self._gkeys.setChecked(bool(self.cfg.get("global_keys", False)))

        def on_gkeys(_state):
            self.cfg["global_keys"] = self._gkeys.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            keytap._apply_global_keys(self._gkeys.isChecked())

        self._gkeys.stateChanged.connect(on_gkeys)
        gen_lay.addWidget(self._gkeys)

        # === Caption (coherence HUD) =========================================
        cap_note = QLabel("Caption mode (Tab+\\) shows the current card in a "
                          "floating bar that stays on top of other apps. "
                          "Tab+arrow keys move it around the screen.")
        cap_note.setWordWrap(True)
        cap_note.setStyleSheet("color: gray; margin-bottom: 4px;")
        cap_lay.addWidget(cap_note)

        # Screen position: a 3x3 grid of anchors (mirrors Tab+arrow movement).
        pos_row = QHBoxLayout()
        pos_name = QLabel("Screen position")
        pos_name.setMinimumWidth(140)
        pos_grid_w = QWidget()
        pos_grid = QGridLayout(pos_grid_w)
        pos_grid.setSpacing(4)
        pos_grid.setContentsMargins(0, 0, 0, 0)
        self._pos_group = QButtonGroup(self)
        self._pos_group.setExclusive(True)
        _cur_row, _cur_col = hud._coherence_rc()
        for _ri, _rn in enumerate(hud._COH_ROWS):
            for _ci, _cn in enumerate(hud._COH_COLS):
                _b = QPushButton(hud._COH_GLYPHS[_ri][_ci])
                _b.setCheckable(True)
                _b.setFixedSize(40, 34)
                _val = f"{_rn}-{_cn}"
                _b.setProperty("pos_val", _val)
                _b.setToolTip(_val.replace("-", " "))
                if _rn == _cur_row and _cn == _cur_col:
                    _b.setChecked(True)
                self._pos_group.addButton(_b)
                pos_grid.addWidget(_b, _ri, _ci)

        def on_pos_pick(btn):
            self.cfg["coherence_position"] = btn.property("pos_val")
            mw.addonManager.writeConfig(__name__, self.cfg)
            if hud._coherence_hud and hud._coherence_hud.isVisible():
                # re-render + reposition to the new anchor; same card → no replay
                hud._coherence_hud.refresh(animate_text=False)

        self._pos_group.buttonClicked.connect(on_pos_pick)
        pos_row.addWidget(pos_name)
        pos_row.addWidget(pos_grid_w)
        pos_row.addStretch()
        cap_lay.addLayout(pos_row)

        # Text alignment inside the caption bar.
        al_row = QHBoxLayout()
        al_name = QLabel("Text alignment")
        al_name.setMinimumWidth(140)
        self._cap_align = QComboBox()
        for _lbl, _val in (("Center", "center"), ("Left", "left"), ("Right", "right")):
            self._cap_align.addItem(_lbl, _val)
        _cur_align = (self.cfg.get("caption_align", "center") or "center").lower()
        _ai = self._cap_align.findData(_cur_align)
        self._cap_align.setCurrentIndex(_ai if _ai >= 0 else 0)

        def on_cap_align(_i):
            self.cfg["caption_align"] = self._cap_align.currentData()
            mw.addonManager.writeConfig(__name__, self.cfg)
            hud._coherence_refresh(animate_text=False)   # live re-render, no replay

        self._cap_align.currentIndexChanged.connect(on_cap_align)
        al_row.addWidget(al_name)
        al_row.addWidget(self._cap_align)
        al_row.addStretch()
        cap_lay.addLayout(al_row)

        # Font size + image size sliders. Each writes its config key and live-
        # refreshes the HUD (a no-op when caption mode isn't up).
        def _cap_size_slider(key, label, default, lo, hi, suffix="px"):
            row = QHBoxLayout()
            name = QLabel(label)
            name.setMinimumWidth(140)
            val = QLabel()
            s = QSlider(Qt.Orientation.Horizontal)
            s.setMinimum(lo)
            s.setMaximum(hi)
            s.setValue(int(self.cfg.get(key, default)))
            val.setText(f"{int(self.cfg.get(key, default))}{suffix}")

            def _cb(v, k=key, lbl=val, sfx=suffix):
                self.cfg[k] = v
                lbl.setText(f"{v}{sfx}")
                mw.addonManager.writeConfig(__name__, self.cfg)
                hud._coherence_refresh(animate_text=False)   # live re-render, no replay

            s.valueChanged.connect(_cb)
            row.addWidget(name)
            row.addWidget(s)
            row.addWidget(val)
            cap_lay.addLayout(row)

        _cap_size_slider("caption_font_size", "Font size", 20, 10, 48)
        _cap_size_slider("caption_image_max", "Image size", 480, 120, 1000)

        # Suppress the red/green edge flare while the caption HUD is up.
        self._cap_flare = QCheckBox("Show timer flare over the caption bar")
        self._cap_flare.setChecked(bool(self.cfg.get("caption_flare", True)))

        def on_cap_flare(_state):
            self.cfg["caption_flare"] = self._cap_flare.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # If turned off while a flare is live over the HUD, clear it now.
            if (not self._cap_flare.isChecked() and hud._caption_visible()
                    and card_timer._card_timer_instance is not None):
                ov = getattr(card_timer._card_timer_instance, "_overlay", None)
                if ov is not None and ov.isVisible():
                    ov.set_active(False)

        self._cap_flare.stateChanged.connect(on_cap_flare)
        cap_lay.addWidget(self._cap_flare)

        # === Pomodoro ========================================================
        # --- Pomodoro break spacing -----------------------------------------
        # Master on/off for the whole Pomodoro system (breaks, XP bar, break tint).
        self._pomo_on = QCheckBox("Enable Pomodoro breaks")
        self._pomo_on.setChecked(bool(self.cfg.get("pomodoro", False)))

        def on_pomo(_state):
            on = self._pomo_on.isChecked()
            self.cfg["pomodoro"] = on
            mw.addonManager.writeConfig(__name__, self.cfg)
            pomodoro._apply_pomodoro(on)      # build/tear down live, no restart needed

        self._pomo_on.stateChanged.connect(on_pomo)
        pomo_lay.addWidget(self._pomo_on)

        # Note: the work interval counts REVIEW time only (it advances while a
        # card is up, not on the deck browser or during the break itself).
        pomo_note = QLabel("Work interval counts review time only.")
        pomo_note.setStyleSheet("color: gray; margin-bottom: 4px;")
        pomo_lay.addWidget(pomo_note)

        def _pomo_spin(key, label, default, lo, hi, suffix, special_zero=None):
            row = QHBoxLayout()
            name = QLabel(label)
            name.setMinimumWidth(140)
            sb = QSpinBox()
            sb.setRange(lo, hi)
            sb.setSuffix(suffix)
            if special_zero is not None:
                sb.setSpecialValueText(special_zero)   # shown when value == lo (0)
            sb.setValue(int(self.cfg.get(key, default)))

            def _cb(v, k=key):
                self.cfg[k] = v
                mw.addonManager.writeConfig(__name__, self.cfg)
                pomodoro._rebuild_pomodoro()

            sb.valueChanged.connect(_cb)
            row.addWidget(name)
            row.addWidget(sb)
            row.addStretch()
            pomo_lay.addLayout(row)

        _pomo_spin("pomodoro_work_mins", "Work interval", 25, 1, 180, " min")
        _pomo_spin("pomodoro_short_break_mins", "Short break", 5, 1, 120, " min")
        _pomo_spin("pomodoro_long_break_mins", "Long break", 15, 1, 180, " min")
        _pomo_spin("pomodoro_long_break_every", "Long break every", 4, 0, 20,
                   " breaks", special_zero="Off (no long breaks)")

        # === Practice ========================================================
        # Pulls related questions for the card being reviewed from imported .qb
        # banks. Opened during review with the hotkey; banks are managed here.
        prac_note = QLabel(
            "Practice questions shows questions related to the card you're "
            "reviewing, drawn from imported question banks (.qb). Open it during "
            "review with %s." % str(self.cfg.get("practice_shortcut", "Ctrl+Shift+Q")))
        prac_note.setWordWrap(True)
        prac_note.setStyleSheet("color: gray; margin-bottom: 4px;")
        prac_lay.addWidget(prac_note)

        pn_row = QHBoxLayout()
        pn_name = QLabel("Questions per card")
        pn_name.setMinimumWidth(140)
        pn_sb = QSpinBox()
        pn_sb.setRange(1, 50)
        pn_sb.setValue(int(self.cfg.get("practice_num_questions", 5)))

        def _pn_cb(v):
            self.cfg["practice_num_questions"] = v
            mw.addonManager.writeConfig(__name__, self.cfg)

        pn_sb.valueChanged.connect(_pn_cb)
        pn_row.addWidget(pn_name)
        pn_row.addWidget(pn_sb)
        pn_row.addStretch()
        prac_lay.addLayout(pn_row)

        _imp_btn = QPushButton("Import question bank (.qb)…")
        _imp_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        prac_lay.addWidget(_imp_btn)

        _docx_btn = QPushButton("Estimate .qb from .docx…")
        _docx_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        _docx_btn.clicked.connect(
            lambda: qbank.docx_estimate_dialog(on_done=_refresh_banks))
        prac_lay.addWidget(_docx_btn)

        _banks_label = QLabel("Installed banks")
        _banks_label.setStyleSheet("color: gray; margin-top: 8px;")
        prac_lay.addWidget(_banks_label)

        _banks_box = QWidget()
        _banks_v = QVBoxLayout(_banks_box)
        _banks_v.setContentsMargins(0, 0, 0, 0)
        prac_lay.addWidget(_banks_box)

        def _refresh_banks():
            while _banks_v.count():
                _it = _banks_v.takeAt(0)
                _w = _it.widget()
                if _w is not None:
                    _w.setParent(None)
            banks = qbank.list_banks()
            if not banks:
                _empty = QLabel("No banks imported yet.")
                _empty.setStyleSheet("color: gray;")
                _banks_v.addWidget(_empty)
                return
            for bid, meta in banks.items():
                cb = QCheckBox("%s  (%s)" % (meta.get("name", bid),
                                             meta.get("count", "?")))
                cb.setChecked(bool(meta.get("enabled", True)))

                def _on_toggle(_s, _bid=bid, _cb=cb):
                    reg = qbank._load_registry()
                    if _bid in reg["banks"]:
                        reg["banks"][_bid]["enabled"] = _cb.isChecked()
                        qbank._save_registry(reg)

                cb.stateChanged.connect(_on_toggle)
                pv = QPushButton("+")
                pv.setFixedWidth(28)
                pv.setToolTip("Preview the questions in this bank")
                pv.setStyleSheet(
                    "QPushButton{background-color:#55585e;color:white;border:none;"
                    "padding:3px 8px;border-radius:5px;}"
                    "QPushButton:hover{background-color:#61646b;}")

                def _on_preview(_c=False, _bid=bid, _name=meta.get("name", bid)):
                    from ..features import practice
                    practice.preview_bank(_bid, _name)

                pv.clicked.connect(_on_preview)
                rm = QPushButton("Remove")
                rm.setStyleSheet(
                    "QPushButton{background-color:#6e5250;color:white;border:none;"
                    "padding:3px 10px;border-radius:5px;}"
                    "QPushButton:hover{background-color:#7c5d5b;}")

                def _on_remove(_c=False, _bid=bid):
                    qbank.remove_bank(_bid)
                    _refresh_banks()

                rm.clicked.connect(_on_remove)
                row_w = QWidget()
                row = QHBoxLayout(row_w)
                row.setContentsMargins(0, 0, 0, 0)
                row.addWidget(cb)
                row.addStretch()
                row.addWidget(pv)
                row.addWidget(rm)
                _banks_v.addWidget(row_w)

        def _on_import():
            qbank.import_dialog()
            _refresh_banks()

        _imp_btn.clicked.connect(_on_import)

        _refresh_banks()

        # === Appearance (cont.) / General ===================================
        # --- OLED mode -------------------------------------------------------
        self._oled = QCheckBox("OLED mode in full-screen (solid black background)")
        self._oled.setChecked(bool(self.cfg.get("oled_fullscreen", False)))

        def on_oled(_state):
            self.cfg["oled_fullscreen"] = self._oled.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            glass._sync_oled()

        self._oled.stateChanged.connect(on_oled)
        app_lay.addWidget(self._oled)

        self._aot = QCheckBox("Keep Anki window always on top")
        self._aot.setChecked(bool(self.cfg.get("always_on_top", False)))

        def on_aot(_state):
            self.cfg["always_on_top"] = self._aot.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            glass._apply_always_on_top(self._aot.isChecked())

        self._aot.stateChanged.connect(on_aot)
        gen_lay.addWidget(self._aot)

        self._deck_stats = QCheckBox(
            "Show review history chart on the deck screen (Reviews plot)")
        self._deck_stats.setChecked(bool(self.cfg.get("deck_stats", True)))

        def on_deck_stats(_state):
            self.cfg["deck_stats"] = self._deck_stats.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # Re-RENDER the deck browser, not just reload the webview: a plain
            # webview reload() re-shows the same HTML and never re-runs the
            # webview_will_set_content hook where the stats block is added/removed,
            # so the toggle appeared to "stick" only after a restart. refresh()
            # calls stdHtml and re-fires the hook, applying the change live.
            try:
                db = getattr(mw, "deckBrowser", None)
                if db is not None and getattr(mw, "state", None) == "deckBrowser":
                    db.refresh()
            except Exception:
                pass

        self._deck_stats.stateChanged.connect(on_deck_stats)
        gen_lay.addWidget(self._deck_stats)

        self._menubar = QCheckBox("Show menu-bar icon (Caption / Focus / Lockdown mode controls)")
        self._menubar.setChecked(bool(self.cfg.get("menubar_controls", True)))

        def on_menubar(_state):
            self.cfg["menubar_controls"] = self._menubar.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            tray._apply_tray(tray._tray_should_show())

        self._menubar.stateChanged.connect(on_menubar)
        gen_lay.addWidget(self._menubar)

        self._tray = QCheckBox("Minimize to system tray instead of taskbar")
        self._tray.setChecked(bool(self.cfg.get("tray_minimize", False)))

        def on_tray(_state):
            self.cfg["tray_minimize"] = self._tray.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # Presence is the OR of both needs; unchecking minimize keeps the icon
            # when the mode controls still want it.
            tray._apply_tray(tray._tray_should_show())

        self._tray.stateChanged.connect(on_tray)
        gen_lay.addWidget(self._tray)

        # Focus-independent controller (IOKit HID) — drives Anki from a gamepad in
        # caption mode even when another app is focused/fullscreen.
        self._hid = QCheckBox(
            "Controller input in caption mode via IOKit HID (requires Input "
            "Monitoring permission; takes effect on restart)"
        )
        self._hid.setChecked(bool(self.cfg.get("hid_controller", False)))

        def on_hid(_state):
            self.cfg["hid_controller"] = self._hid.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            if self._hid.isChecked():
                gamepad._start_hid_monitor()   # prompts for Input Monitoring on first open
            # turning off takes effect next launch (the HID runloop thread is
            # daemon and torn down on quit)

        self._hid.stateChanged.connect(on_hid)
        gen_lay.addWidget(self._hid)

        # AMBOSS integrations: frost the hover tip and auto-hide the QBank box when
        # the window is too narrow. One toggle governs both effects; uncheck it if
        # the AMBOSS tooltip flickers on your setup.
        self._amboss = QCheckBox(
            "AMBOSS integrations (frost hover tip + auto-hide QBank box)")
        self._amboss.setChecked(bool(self.cfg.get("amboss_tooltip_frost", True))
                                or bool(self.cfg.get("amboss_qbank_autohide", True)))

        def on_amboss(_state):
            on = self._amboss.isChecked()
            self.cfg["amboss_tooltip_frost"] = on
            self.cfg["amboss_qbank_autohide"] = on
            mw.addonManager.writeConfig(__name__, self.cfg)
            amboss._frost_amboss_tooltip()          # apply or remove the tip frost
            try:
                if mw.state == "deckBrowser":
                    mw.deckBrowser.refresh()         # re-apply/clear QBank autohide
            except Exception:
                pass

        self._amboss.stateChanged.connect(on_amboss)
        gen_lay.addWidget(self._amboss)

        # --- Glass patch / uninstall ----------------------------------------
        # On stock Anki the glass needs a small patch to Anki's own files (applied
        # automatically). This lets you cleanly REMOVE it: restore the original
        # files, delete backups/cache, and stop the auto-re-patch — the correct way
        # to undo everything before removing the add-on.
        # Patch controls only in the glass edition (the safe edition never patches).
        _pstate = stock_selfheal.patch_state()
        if _pstate != "unsupported" and not SAFE:
            _patch_note = QLabel(
                "Glass patch: Janki patches Anki's own files so the frosted glass "
                "can work (originals are backed up). Remove it before uninstalling "
                "the add-on so Anki is left clean."
            )
            _patch_note.setWordWrap(True)
            _patch_note.setStyleSheet("color: gray; margin-top: 8px;")
            gen_lay.addWidget(_patch_note)

            self._patch_btn = QPushButton()
            self._patch_btn.setStyleSheet(
                "QPushButton{background-color:#6e5250;color:white;border:none;"
                "padding:5px 12px;border-radius:5px;}"
                "QPushButton:hover{background-color:#7c5d5b;}")

            def _refresh_patch_btn():
                st = stock_selfheal.patch_state()
                self._patch_btn.setText(
                    "Restore stock Anki (remove glass patch)" if st == "patched"
                    else "Apply glass patch to Anki")

            def _on_patch_btn():
                from aqt.qt import QMessageBox
                if stock_selfheal.patch_state() == "patched":
                    m = QMessageBox(self)
                    m.setWindowTitle("Restore stock Anki")
                    m.setText("Remove Janki's glass patch and restore Anki's "
                              "original files?")
                    m.setInformativeText(
                        "Turns the frosted glass off and stops it re-applying. After "
                        "you restart Anki, you can safely remove the Janki add-on "
                        "from Tools → Add-ons and nothing will be left behind.")
                    yes = m.addButton("Restore & disable",
                                      QMessageBox.ButtonRole.AcceptRole)
                    m.addButton("Cancel", QMessageBox.ButtonRole.RejectRole)
                    m.exec()
                    if m.clickedButton() is not yes:
                        return
                    self.cfg["stock_selfheal"] = False
                    mw.addonManager.writeConfig(__name__, self.cfg)
                    n = stock_selfheal.unpatch(purge=True)
                    _refresh_patch_btn()
                    r = QMessageBox(self)
                    r.setWindowTitle("Janki")
                    r.setText(f"Restored {n} file(s) to stock Anki.")
                    r.setInformativeText(
                        "Quit and reopen Anki — the glass is off and won't re-apply. "
                        "You can now remove the Janki add-on whenever you like.")
                    q = r.addButton("Quit Anki now", QMessageBox.ButtonRole.AcceptRole)
                    r.addButton("Later", QMessageBox.ButtonRole.RejectRole)
                    r.exec()
                    if r.clickedButton() is q:
                        mw.close()
                else:
                    self.cfg["stock_selfheal"] = True
                    mw.addonManager.writeConfig(__name__, self.cfg)
                    # Clear any recorded crash for this build so the retry actually
                    # runs (otherwise the crash-guard back-off would skip it).
                    stock_selfheal.clear_failure()
                    stock_selfheal.maybe_self_heal()   # fetch+patch+prompt restart
                    _refresh_patch_btn()

            _refresh_patch_btn()
            self._patch_btn.clicked.connect(_on_patch_btn)
            gen_lay.addWidget(self._patch_btn)

        # --- Updates --------------------------------------------------------
        # Janki auto-checks on launch; this is the manual trigger (moved here from
        # the Tools menu).
        _upd_note = QLabel("Janki checks for updates automatically on launch.")
        _upd_note.setWordWrap(True)
        _upd_note.setStyleSheet("color: gray; margin-top: 8px;")
        gen_lay.addWidget(_upd_note)
        self._upd_btn = QPushButton("Check for updates now  (v%s)"
                                    % updater._current_version())
        self._upd_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        self._upd_btn.clicked.connect(lambda: updater.check(interactive=True))
        gen_lay.addWidget(self._upd_btn)

        # --- Documentation --------------------------------------------------
        # Opens the Janki docs (README + guides) on GitHub in the browser.
        _doc_link = QLabel(
            '<a href="https://github.com/cjreplogle/janki#readme" '
            'style="color:#6ab0ff; text-decoration:none;">📖 Documentation</a>')
        _doc_link.setOpenExternalLinks(True)
        _doc_link.setTextInteractionFlags(Qt.TextInteractionFlag.TextBrowserInteraction)
        _doc_link.setToolTip("Open the Janki documentation on GitHub")
        _doc_link.setStyleSheet("margin-top: 8px;")
        gen_lay.addWidget(_doc_link)

        # --- Mobile cards (iPad / iPhone) -----------------------------------
        # AnkiMobile can't run add-ons, so this bakes Janki's look into your note
        # types (OLED dark, serif, text animation), which syncs to the phone/iPad.
        # Originals are saved locally first; Revert restores them exactly.
        _mob_note = QLabel(
            "Apply Janki's look to your cards on AnkiMobile/AnkiDroid (OLED dark, "
            "serif, text animation). Edits your note types' styling — your originals "
            "are saved locally, and Revert restores them exactly. Sync afterwards; "
            "desktop is unaffected.")
        _mob_note.setWordWrap(True)
        _mob_note.setStyleSheet("color: gray; margin-top: 8px;")
        app_lay.addWidget(_mob_note)

        # Card font used on mobile. Changing it re-stamps the note types live if the
        # theming is already applied (so it shows on the next sync).
        _mfont_row = QHBoxLayout()
        _mfont_name = QLabel("Mobile card font")
        _mfont_name.setMinimumWidth(140)
        self._mob_font = QComboBox()
        for _lbl in mobilecards.FONTS:
            self._mob_font.addItem(_lbl, _lbl)
        _fi = self._mob_font.findData(mobilecards.current_font())
        self._mob_font.setCurrentIndex(_fi if _fi >= 0 else 0)

        def on_mob_font(_i):
            self.cfg["mobile_font"] = self._mob_font.currentData()
            mw.addonManager.writeConfig(__name__, self.cfg)
            if mobilecards.is_applied():
                mobilecards.restyle_font()
                tooltip("Mobile font updated — Sync to push it to your devices.")

        self._mob_font.currentIndexChanged.connect(on_mob_font)
        _mfont_row.addWidget(_mfont_name)
        _mfont_row.addWidget(self._mob_font)
        _mfont_row.addStretch()
        app_lay.addLayout(_mfont_row)

        # Tap feedback: the subtle ripple dot shown when you tap to reveal an answer
        # on mobile. Re-stamps the templates live (silent) so it lands on next sync.
        self._mob_tapfb = QCheckBox("Tap feedback (ripple dot on reveal) on mobile cards")
        self._mob_tapfb.setChecked(bool(self.cfg.get("mobile_tap_feedback", True)))

        def on_mob_tapfb(_s):
            self.cfg["mobile_tap_feedback"] = bool(self._mob_tapfb.isChecked())
            mw.addonManager.writeConfig(__name__, self.cfg)
            if mobilecards.is_applied():
                mobilecards.restamp_templates()
                tooltip("Mobile tap feedback updated — Sync to push it to your devices.")

        self._mob_tapfb.stateChanged.connect(on_mob_tapfb)
        app_lay.addWidget(self._mob_tapfb)

        _mob_row = QHBoxLayout()
        self._mob_apply = QPushButton("Apply UI theming to mobile cards")
        self._mob_apply.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        self._mob_revert = QPushButton("Revert mobile theming")
        self._mob_revert.setStyleSheet(
            "QPushButton{background-color:#6e5250;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#7c5d5b;}"
            "QPushButton:disabled{background-color:#5a5a5a;color:#aaaaaa;}")

        def _refresh_mob():
            self._mob_revert.setEnabled(mobilecards.is_applied())

        def _on_mob_apply():
            mobilecards.apply_all()
            _refresh_mob()

        def _on_mob_revert():
            mobilecards.remove_all()
            _refresh_mob()

        self._mob_apply.clicked.connect(_on_mob_apply)
        self._mob_revert.clicked.connect(_on_mob_revert)
        _refresh_mob()
        _mob_row.addWidget(self._mob_apply)
        _mob_row.addWidget(self._mob_revert)
        app_lay.addLayout(_mob_row)

        hint = QLabel("Colour + opacity set the tint; blur radius blurs the desktop "
                      "behind Anki (like Terminal). Changes apply live and save "
                      "automatically.")
        hint.setWordWrap(True)
        app_lay.addWidget(hint)

        # Push each page's controls to the top.
        for pl in (app_lay, flare_lay, timer_lay, cap_lay, pomo_lay, lock_lay,
                   prac_lay, gen_lay):
            pl.addStretch()

        close = QPushButton("Close")

        def _close_settings():
            for _fn in getattr(self, "_lecture_savers", []):
                try:
                    _fn()
                except Exception as _e:
                    log("lecture save failed: %s" % _e)
            self.accept()

        close.clicked.connect(_close_settings)
        lay.addWidget(close)

    def _update_color_swatch(self):
        c = self.cfg.get("tint_color", "#1e1e1e")
        self._color_btn.setText(c)
        self._color_btn.setStyleSheet(f"background-color: {c}; color: white;")

    def _pick_color(self):
        cur = QColor(self.cfg.get("tint_color", "#1e1e1e"))
        col = QColorDialog.getColor(cur, self, "Background colour")
        if col.isValid():
            self.cfg["tint_mode"] = "custom"
            self.cfg["tint_color"] = col.name()
            self._update_color_swatch()
            diagnostics._live_apply(self.cfg)


def _open_settings():
    GlassSettings().show()
