"""The GlassSettings dialog and its opener."""

import sys
from aqt import mw
from aqt.qt import QCheckBox, QColor, QColorDialog, QDialog, QHBoxLayout, QLabel, QSlider, QSpinBox, Qt, QVBoxLayout

from .config import log, _cfg, SAFE
from . import amboss, card_timer, diagnostics, focus, gamepad, glass, hud, keytap, pomodoro, stock_selfheal, tray

class GlassSettings(QDialog):
    """macOS-Terminal-style controls: background colour, opacity, blur radius."""

    def __init__(self):
        super().__init__(mw)
        self.setWindowTitle("Janki")
        self.cfg = _cfg()
        self.cfg.setdefault("tint_mode", "custom")
        lay = QVBoxLayout(self)

        # On non-macOS the native visual features don't run (they no-op) — only the
        # lecture importer is cross-platform. Warn up front so the inert tabs below
        # don't confuse Windows/Linux users.
        if sys.platform != "darwin":
            _warn = QLabel(
                "⚠️  Janki's visual features (transparency / glass, caption "
                "HUD, global hotkeys, controller input, Pomodoro) are macOS-only and "
                "won't work on this platform. Only “Load today's lectures” is "
                "supported here."
            )
            _warn.setWordWrap(True)
            _warn.setStyleSheet(
                "QLabel { background: rgba(255,176,32,0.15); color: #b26a00; "
                "border: 1px solid rgba(255,176,32,0.55); border-radius: 6px; "
                "padding: 8px 10px; }"
            )
            lay.addWidget(_warn)

        # Three tabbed panels. Each page has its own vertical layout; the section
        # builders below append to app_lay / focus_lay / pomo_lay accordingly.
        from aqt.qt import (QTabWidget, QWidget, QComboBox, QGridLayout,
                            QPushButton, QButtonGroup)
        tabs = QTabWidget()
        app_page = QWidget();   app_lay = QVBoxLayout(app_page)
        focus_page = QWidget(); focus_lay = QVBoxLayout(focus_page)
        cap_page = QWidget();   cap_lay = QVBoxLayout(cap_page)
        pomo_page = QWidget();  pomo_lay = QVBoxLayout(pomo_page)
        gen_page = QWidget();   gen_lay = QVBoxLayout(gen_page)
        tabs.addTab(app_page, "Appearance")
        tabs.addTab(focus_page, "Focus")
        tabs.addTab(cap_page, "Caption")
        tabs.addTab(pomo_page, "Pomodoro")
        tabs.addTab(gen_page, "General")

        # Lecture panes (Sources / Behavior) hosted from the lectures submodule so
        # everything lives in ONE settings window. Their save fns run on Close.
        self._lecture_savers = []
        try:
            from . import lectures as _lectures
            _pages, _lsave = _lectures.build_settings_pages()
            for _title, _widget in _pages:
                tabs.addTab(_widget, _title)
            if _lsave:
                self._lecture_savers.append(_lsave)
        except Exception as _e:
            log("lecture settings tabs failed: %s" % _e)

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
        self._ctbar = QCheckBox("Show timer bar under the toolbar")
        self._ctbar.setChecked(bool(self.cfg.get("card_timer_show_bar", True)))

        def on_ctbar(_state):
            self.cfg["card_timer_show_bar"] = self._ctbar.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            if card_timer._card_timer_instance is not None:
                card_timer._card_timer_instance.sync_bar_pref()

        self._ctbar.stateChanged.connect(on_ctbar)
        focus_lay.addWidget(self._ctbar)

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
        focus_lay.addLayout(ct_row)

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
        focus_lay.addWidget(self._red_flare)

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
        focus_lay.addLayout(rf_row)

        # Green edge-flare when a card is answered such that it's finished for today
        # (review cards, or inter-day learning graduating past today).
        self._green_flare = QCheckBox("Green flare when a card is done for the day")
        self._green_flare.setChecked(bool(self.cfg.get("card_timer_green_flare", True)))

        def on_green_flare(_state):
            self.cfg["card_timer_green_flare"] = self._green_flare.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)

        self._green_flare.stateChanged.connect(on_green_flare)
        focus_lay.addWidget(self._green_flare)

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

        self._menubar = QCheckBox("Show menu-bar icon (Caption / Focus mode controls)")
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

        # Frosting the AMBOSS hover tip alters its geometry/stacking, which makes
        # some tippy configs flicker on/off — this lets you turn just that off
        # (the side-panel frost stays on) and restore the native tooltip live.
        self._amtip = QCheckBox("Frost the AMBOSS hover tip (uncheck if it flickers)")
        self._amtip.setChecked(bool(self.cfg.get("amboss_tooltip_frost", True)))

        def on_amtip(_state):
            self.cfg["amboss_tooltip_frost"] = self._amtip.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            amboss._frost_amboss_tooltip()   # apply or fully remove immediately

        self._amtip.stateChanged.connect(on_amtip)
        gen_lay.addWidget(self._amtip)

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

        hint = QLabel("Colour + opacity set the tint; blur radius blurs the desktop "
                      "behind Anki (like Terminal). Changes apply live and save "
                      "automatically.")
        hint.setWordWrap(True)
        app_lay.addWidget(hint)

        # Push each page's controls to the top.
        for pl in (app_lay, focus_lay, pomo_lay, gen_lay):
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
