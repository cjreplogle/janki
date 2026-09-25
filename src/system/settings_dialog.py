"""The GlassSettings dialog and its opener."""

import os
import re
import sys
from aqt import mw
from aqt.qt import QCheckBox, QColor, QColorDialog, QDialog, QFileDialog, QHBoxLayout, QLabel, QPushButton, QSlider, QSpinBox, Qt, QVBoxLayout
from aqt.utils import tooltip

from ..util.config import log, _cfg, SAFE
from ..features import card_timer, focus, pomodoro, reword
from ..user import glass, hud, css
from . import tray
from ..util import diagnostics, keytap
from ..integrations import gamepad
from ..integrations import amboss, mobilecards, qbank
from . import stock_selfheal, updater

class GlassSettings(QDialog):
    """macOS-Terminal-style controls: background color, opacity, blur radius."""

    def __init__(self):
        super().__init__(mw)
        self.setWindowTitle("Janki")
        try:
            from ..user import glass
            glass.glass_dialog(self)             # frost like the main window (macOS)
        except Exception:
            pass
        try:
            from ..user import css as _css
            _css.apply_widget_ui_font(self)      # use the chosen Interface font here too
        except Exception:
            pass
        self.cfg = _cfg()
        self.cfg.setdefault("tint_mode", "custom")
        lay = QVBoxLayout(self)
        # Tight top: with the content extended under the titlebar the top tab row sits
        # level with the close button; otherwise just drop Qt's default top margin.
        _m = lay.contentsMargins()
        lay.setContentsMargins(_m.left(), 6 if getattr(self, "_jk_expanded", False) else 2,
                               _m.right(), _m.bottom())

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
        self._tabs = tabs
        # Appearance → subtabs: Window (glass / photo / OLED), Text (interface + mobile card
        # font, text animation) and Mobile (theming for AnkiMobile/AnkiDroid cards).
        app_page = QWidget(); _app_outer = QVBoxLayout(app_page)
        _app_outer.setContentsMargins(6, 6, 6, 6)   # modest space above the subtabs
        app_tabs = QTabWidget(); _app_outer.addWidget(app_tabs)
        self._app_tabs = app_tabs
        app_win_page = QWidget();  app_win_lay = QVBoxLayout(app_win_page)
        app_text_page = QWidget(); app_text_lay = QVBoxLayout(app_text_page)
        app_mob_page = QWidget();  app_mob_lay = QVBoxLayout(app_mob_page)
        app_tabs.addTab(app_win_page, "Window")
        app_tabs.addTab(app_text_page, "Text")
        app_tabs.addTab(app_mob_page, "Mobile")
        gen_page = QWidget();   gen_lay = QVBoxLayout(gen_page)

        # Rephrase → subtabs: Import (build/import/manage rephrasings), Mobile (bake
        # them into note types for AnkiMobile/AnkiDroid), Experimental (on-device gen).
        rw_page = QWidget(); _rw_outer = QVBoxLayout(rw_page)
        _rw_outer.setContentsMargins(6, 6, 6, 6)   # modest space above the subtabs
        rw_tabs = QTabWidget(); _rw_outer.addWidget(rw_tabs)
        self._rw_tabs = rw_tabs
        rw_import_page = QWidget(); rw_import_lay = QVBoxLayout(rw_import_page)
        rw_mobile_page = QWidget(); rw_mobile_lay = QVBoxLayout(rw_mobile_page)
        rw_exp_page = QWidget();    rw_exp_lay = QVBoxLayout(rw_exp_page)
        rw_tabs.addTab(rw_import_page, "Import")
        rw_tabs.addTab(rw_mobile_page, "Mobile")
        rw_tabs.addTab(rw_exp_page, "Experimental")

        # Practice → subtabs: Question Bank (import/build/manage the .qb banks + Practice
        # deck; the default), Format (how practice cards look/behave in review) and
        # Intersperse.
        prac_page = QWidget(); _prac_outer = QVBoxLayout(prac_page)
        _prac_outer.setContentsMargins(6, 6, 6, 6)   # modest space above the subtabs
        prac_tabs = QTabWidget(); _prac_outer.addWidget(prac_tabs)
        self._prac_tabs = prac_tabs
        prac_app_page = QWidget(); prac_app_lay = QVBoxLayout(prac_app_page)
        prac_qb_page = QWidget();  prac_qb_lay = QVBoxLayout(prac_qb_page)
        prac_int_page = QWidget(); prac_int_lay = QVBoxLayout(prac_int_page)
        prac_tabs.addTab(prac_qb_page, "Question Bank")    # leftmost = default
        prac_tabs.addTab(prac_app_page, "Format")
        prac_tabs.addTab(prac_int_page, "Intersperse")

        # Focus → subtabs: Flare / Timer / Caption / Pomodoro / Lockdown.
        focus_page = QWidget(); _focus_outer = QVBoxLayout(focus_page)
        _focus_outer.setContentsMargins(6, 6, 6, 6)   # modest space above the subtabs
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
            _lec_outer.setContentsMargins(6, 6, 6, 6)   # modest space above the subtabs
            lec_tabs = QTabWidget(); _lec_outer.addWidget(lec_tabs)
            for _title, _widget in _pages:
                lec_tabs.addTab(_widget, _title)
            tabs.addTab(lec_page, "Lectures")
            if _lsave:
                self._lecture_savers.append(_lsave)
        except Exception as _e:
            log("lecture settings tabs failed: %s" % _e)

        tabs.addTab(prac_page, "Practice")
        tabs.addTab(rw_page, "Rephrase")
        tabs.insertTab(0, gen_page, "General")   # far left; Settings still opens on Appearance
        tabs.setCurrentWidget(app_page)

        lay.addWidget(tabs)

        # === Appearance ======================================================
        # --- Background color picker (a color well like Terminal) ------------
        # Built here, placed under the Glass column below.
        col_row = QHBoxLayout()
        col_label = QLabel("Background color")
        col_label.setMinimumWidth(90)
        col_row.addWidget(col_label)
        self._color_btn = QPushButton()
        self._color_btn.setMinimumWidth(80)
        self._update_color_swatch()
        self._color_btn.clicked.connect(self._pick_color)
        col_row.addWidget(self._color_btn)
        col_row.addStretch()

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
                _css.apply_widget_ui_font(self, self.cfg)   # and this window, live
            except Exception:
                pass
            # New font → different text metrics; re-fit so nothing is cropped.
            try:
                from aqt.qt import QTimer as _QT
                _QT.singleShot(0, self._fit_tabs)
            except Exception:
                pass

        self._ui_font.currentIndexChanged.connect(on_ui_font)
        _uifont_row.addWidget(_uifont_name)
        _uifont_row.addWidget(self._ui_font)
        _uifont_row.addStretch()

        # --- Glass / Photo controls (two vertical columns) ------------------
        # Left column tunes the glass tint (Opacity + Blur radius); right column
        # tunes the optional background photo (its own Opacity + Blur radius),
        # divided by a vertical rule.
        def _mk_slider(parent_lay, key, label, lo, hi, scale, on_change):
            row = QHBoxLayout()
            name = QLabel(label)
            name.setMinimumWidth(90)
            val = QLabel()
            s = QSlider(Qt.Orientation.Horizontal)
            s.setMinimum(lo)
            s.setMaximum(hi)
            s.setValue(int(self.cfg.get(key, 0) * (scale if scale != 1.0 else 1)))

            def cb(v, k=key, sc=scale, lbl=val, fn=on_change):
                self.cfg[k] = (v / sc) if sc != 1.0 else v
                lbl.setText(f"{self.cfg[k]:.2f}" if sc != 1.0 else str(v))
                fn(self.cfg[k])

            s.valueChanged.connect(cb)
            val.setText(f"{self.cfg.get(key,0):.2f}" if scale != 1.0 else str(self.cfg.get(key,0)))
            row.addWidget(name)
            row.addWidget(s)
            row.addWidget(val)
            parent_lay.addLayout(row)

        _cols = QHBoxLayout()

        # LEFT — glass tint
        _left = QVBoxLayout()
        _lh = QLabel("Glass")
        _lh.setStyleSheet("font-weight:600;")
        _left.addWidget(_lh)
        _mk_slider(_left, "body_opacity", "Opacity", 0, 100, 100.0,
                   lambda v: diagnostics._live_apply(self.cfg))
        _mk_slider(_left, "blur_radius", "Blur radius", 0, 80, 1.0,
                   lambda v: glass._set_blur(v))
        _left.addLayout(col_row)
        _left.addStretch()
        _cols.addLayout(_left, 1)

        if sys.platform == "darwin":
            _cols.addSpacing(24)

            # RIGHT — background photo
            _right = QVBoxLayout()
            _rh = QLabel("Photo Background")
            _rh.setStyleSheet("font-weight:600;")
            _right.addWidget(_rh)
            def _apply_photo_opacity(_v):
                mw.addonManager.writeConfig(__name__, self.cfg)
                glass._apply_bg_image()

            def _apply_photo_blur(_v):
                mw.addonManager.writeConfig(__name__, self.cfg)
                glass.refresh_bg_blur(animate=False)

            _mk_slider(_right, "bg_opacity", "Opacity", 0, 100, 100.0,
                       _apply_photo_opacity)
            _mk_slider(_right, "bg_blur", "Blur radius", 0, 80, 1.0,
                       _apply_photo_blur)

            self._bg_txt = QCheckBox("Blur only when text is present")
            self._bg_txt.setChecked(bool(self.cfg.get("bg_blur_text_only", False)))

            def _on_bg_txt(_st):
                self.cfg["bg_blur_text_only"] = self._bg_txt.isChecked()
                mw.addonManager.writeConfig(__name__, self.cfg)
                glass.refresh_bg_blur()

            self._bg_txt.stateChanged.connect(_on_bg_txt)
            _right.addWidget(self._bg_txt)

            _btns = QHBoxLayout()
            self._bg_choose = QPushButton()
            self._bg_clear = QPushButton()

            def _refresh_bg_btn():
                n = glass.background_count()
                self._bg_choose.setText("Add…" if n else "Choose…")
                self._bg_clear.setText(f"Clear all ({n})" if n else "Clear all")
                self._bg_clear.setEnabled(n > 0)

            def _on_bg_choose():
                paths, _ = QFileDialog.getOpenFileNames(
                    self, "Choose background image(s)", "",
                    "Images (*.png *.jpg *.jpeg *.heic *.gif *.tiff *.bmp *.webp)")
                if paths:
                    glass.add_background_images(paths)
                    self.cfg = _cfg()
                    _refresh_bg_btn()
                    tooltip("Added — one is shown at random each launch.")

            def _on_bg_clear():
                glass.clear_background_images()
                self.cfg = _cfg()
                _refresh_bg_btn()
                tooltip("Backgrounds cleared.")

            self._bg_choose.clicked.connect(_on_bg_choose)
            self._bg_clear.clicked.connect(_on_bg_clear)
            _refresh_bg_btn()
            _btns.addWidget(self._bg_choose)
            _btns.addWidget(self._bg_clear)
            _btns.addStretch()
            _right.addLayout(_btns)
            _right.addStretch()
            _cols.addLayout(_right, 1)

        app_win_lay.addLayout(_cols)
        app_text_lay.addLayout(_uifont_row)

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
        app_text_lay.addLayout(ta_row)

        # Uniform text size: every note type shows card text at the same base size (note
        # types otherwise range from ~20px to 48px). Inline emphasis (bigger key phrases),
        # headings and Janki's own card UI keep their sizes.
        self._uniform = QCheckBox("Uniform text size across card types")
        self._uniform.setToolTip(
            "Show every note type's card text at the same base size (24px desktop, 20px on "
            "phones), overriding each note type's own font size. Emphasis you typed into a "
            "card (larger key phrases), headings and practice-card UI are kept.")
        self._uniform.setChecked(bool(self.cfg.get("uniform_text", False)))

        def on_uniform(_s):
            self.cfg["uniform_text"] = bool(self._uniform.isChecked())
            mw.addonManager.writeConfig(__name__, self.cfg)
            try:
                glass._reload_all_webviews()          # desktop: re-inject card CSS now
            except Exception:
                pass
            try:                                      # mobile: re-stamp the theming CSS
                if mobilecards.is_applied():
                    mobilecards.refresh_quiet()
                    tooltip("Text size updated — Sync to push it to your devices.")
            except Exception:
                pass
        self._uniform.stateChanged.connect(on_uniform)
        app_text_lay.addWidget(self._uniform)

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

        # Practice cards (Janki Practice) get their own flat flare window — a
        # vignette + MCQ needs real reasoning time. Range 10–300s (whole seconds).
        cp_row = QHBoxLayout()
        cp_name = QLabel("Practice: seconds to flare")
        cp_name.setMinimumWidth(140)
        cp_val = QLabel()
        cp_s = QSlider(Qt.Orientation.Horizontal)
        cp_s.setMinimum(10)     # 10s
        cp_s.setMaximum(300)    # 5 min
        cp_s.setValue(int(round(float(self.cfg.get("card_timer_practice_seconds", 90.0)))))

        def _cp_cb(v):
            self.cfg["card_timer_practice_seconds"] = float(v)
            cp_val.setText(f"{v}s")
            mw.addonManager.writeConfig(__name__, self.cfg)
            # start_card reads this live — restart the current card's timer if it's
            # a practice card so the change is visible immediately.
            r = getattr(mw, "reviewer", None)
            card = getattr(r, "card", None) if r else None
            inst = card_timer._card_timer_instance
            if (card is not None and inst is not None
                    and getattr(r, "state", None) == "question"
                    and inst._is_practice_card()):
                inst._on_q(card)

        cp_s.valueChanged.connect(_cp_cb)
        cp_val.setText(f"{int(round(float(self.cfg.get('card_timer_practice_seconds', 90.0))))}s")
        cp_row.addWidget(cp_name)
        cp_row.addWidget(cp_s)
        cp_row.addWidget(cp_val)
        timer_lay.addLayout(cp_row)

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

        # Green flare intensity (peak edge alpha), same scale as the red one. Fullscreen has
        # no chrome/glass to read against, so it stays proportionally stronger (+30).
        gf_row = QHBoxLayout()
        gf_name = QLabel("Green flare intensity")
        gf_name.setMinimumWidth(140)
        gf_val = QLabel()
        gf_s = QSlider(Qt.Orientation.Horizontal)
        gf_s.setMinimum(2)
        gf_s.setMaximum(40)
        gf_s.setValue(int(self.cfg.get("card_timer_green_alpha", 16)))

        def _gf_cb(v):
            self.cfg["card_timer_green_alpha"] = v
            self.cfg["card_timer_green_alpha_fullscreen"] = min(255, v + 30)
            gf_val.setText(str(v))
            mw.addonManager.writeConfig(__name__, self.cfg)

        gf_s.valueChanged.connect(_gf_cb)
        gf_val.setText(str(int(self.cfg.get("card_timer_green_alpha", 16))))
        gf_row.addWidget(gf_name)
        gf_row.addWidget(gf_s)
        gf_row.addWidget(gf_val)
        flare_lay.addLayout(gf_row)

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
        prac_app_lay.addWidget(prac_note)

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
        prac_app_lay.addLayout(pn_row)

        self._prac_no_amboss = QCheckBox(
            "Hide AMBOSS term underlines on practice cards")
        self._prac_no_amboss.setChecked(bool(self.cfg.get("practice_no_amboss", True)))

        # Sub-option: even when hidden on the question, still show AMBOSS on the
        # BACK (explanation/rationale) so terms there stay clickable.
        self._prac_amboss_back = QCheckBox(
            "…but show AMBOSS on the back (explanation)")
        self._prac_amboss_back.setStyleSheet("margin-left: 22px;")
        self._prac_amboss_back.setChecked(bool(self.cfg.get("practice_amboss_on_back", False)))
        self._prac_amboss_back.setEnabled(self._prac_no_amboss.isChecked())

        def _on_prac_amboss():
            self.cfg["practice_no_amboss"] = self._prac_no_amboss.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            self._prac_amboss_back.setEnabled(self._prac_no_amboss.isChecked())
            amboss._apply_amboss_underlines(front=True)   # re-apply to current card

        def _on_prac_amboss_back():
            self.cfg["practice_amboss_on_back"] = self._prac_amboss_back.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # Re-apply to the current card at its actual side, so the change shows now.
            r = getattr(mw, "reviewer", None)
            front = getattr(r, "state", None) != "answer"
            amboss._apply_amboss_underlines(front=front)

        self._prac_no_amboss.stateChanged.connect(_on_prac_amboss)
        self._prac_amboss_back.stateChanged.connect(_on_prac_amboss_back)
        prac_app_lay.addWidget(self._prac_no_amboss)
        prac_app_lay.addWidget(self._prac_amboss_back)

        # Clicking a choice both grades AND flips the card to the explanation.
        self._prac_click_flips = QCheckBox(
            "Clicking an answer flips the card to the explanation")
        self._prac_click_flips.setChecked(bool(self.cfg.get("practice_click_flips", True)))

        def _on_prac_click_flips():
            self.cfg["practice_click_flips"] = self._prac_click_flips.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            qbank.apply_practice_prefs()   # applies to the current card immediately

        self._prac_click_flips.stateChanged.connect(_on_prac_click_flips)
        prac_app_lay.addWidget(self._prac_click_flips)

        # Remote mode: drive practice questions with a 4-button Anki remote. Drops one
        # wrong choice so exactly four remain; A/B/C/D (Again/Hard/Good/Easy) pick the
        # answers and visualise the press like a click.
        self._prac_remote = QCheckBox(
            "Remote mode when a remote is connected (drops one wrong choice; "
            "A/B/C/D pick answers)")
        self._prac_remote.setToolTip(
            "Only takes effect while a controller/remote is actually connected — "
            "unplug it and the next card shows the full choice set again. No deck "
            "rebuild needed; just check or uncheck this box.")
        self._prac_remote.setChecked(bool(self.cfg.get("practice_remote_mode", False)))

        def _on_prac_remote():
            self.cfg["practice_remote_mode"] = self._prac_remote.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            qbank.apply_practice_prefs()   # applies to the next card
            try:
                qbank.sync_contanki_for_card()  # suspend/resume Contanki right away
            except Exception:
                pass

        self._prac_remote.stateChanged.connect(_on_prac_remote)
        prac_app_lay.addWidget(self._prac_remote)

        # Default show/hide of the back's explanation and the non-picked answers.
        self._prac_show_exp = QCheckBox("Show explanation by default")
        self._prac_show_exp.setChecked(bool(self.cfg.get("practice_show_explanation", True)))
        self._prac_show_all = QCheckBox("Show all answers by default")
        self._prac_show_all.setChecked(bool(self.cfg.get("practice_show_all_answers", False)))

        def _on_prac_show_exp():
            self.cfg["practice_show_explanation"] = self._prac_show_exp.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            qbank.apply_practice_prefs(persist=True)   # new default overrides card state

        def _on_prac_show_all():
            self.cfg["practice_show_all_answers"] = self._prac_show_all.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            qbank.apply_practice_prefs(persist=True)

        self._prac_show_exp.stateChanged.connect(_on_prac_show_exp)
        self._prac_show_all.stateChanged.connect(_on_prac_show_all)
        prac_app_lay.addWidget(self._prac_show_exp)
        prac_app_lay.addWidget(self._prac_show_all)

        # === Practice ▸ Intersperse ==========================================
        # Surface relevant practice questions during ordinary review sessions,
        # matched to the concepts of the cards you've recently studied.
        int_note = QLabel(
            "Automatically drop relevant practice questions into your normal review "
            "sessions — a quick check every N cards, and/or a benchmark set right "
            "before each pomodoro break. Questions are matched to the concept tags "
            "of the cards you've just been studying. Grading behaves exactly like the "
            "Practice deck (get it right and it retires).")
        int_note.setWordWrap(True)
        int_note.setStyleSheet("color: gray; margin-bottom: 4px;")
        prac_int_lay.addWidget(int_note)

        self._int_enabled = QCheckBox("Enable interspersed practice questions")
        self._int_enabled.setChecked(bool(self.cfg.get("intersperse_enabled", False)))
        prac_int_lay.addWidget(self._int_enabled)

        # Trigger A — after every N cards (seamless inline).
        self._int_after = QCheckBox(
            "After every N cards — drop a question inline (no leaving the deck)")
        self._int_after.setStyleSheet("margin-left: 22px;")
        self._int_after.setChecked(
            bool(self.cfg.get("intersperse_after_cards_enabled", True)))
        prac_int_lay.addWidget(self._int_after)

        after_row = QHBoxLayout()
        after_row.addSpacing(40)
        after_name = QLabel("Every")
        self._int_after_n = QSpinBox()
        self._int_after_n.setRange(1, 500)
        self._int_after_n.setValue(int(self.cfg.get("intersperse_after_cards_n", 20)))
        self._int_after_n.setSuffix(" cards")
        after_row.addWidget(after_name)
        after_row.addWidget(self._int_after_n)
        after_row.addWidget(QLabel("show"))
        self._int_after_batch = QSpinBox()
        self._int_after_batch.setRange(1, 50)
        self._int_after_batch.setValue(
            int(self.cfg.get("intersperse_after_cards_batch", 1)))
        self._int_after_batch.setToolTip(
            "How many practice questions to drop inline each time the "
            "after-N-cards trigger fires.")
        after_row.addWidget(self._int_after_batch)
        after_row.addWidget(QLabel("question(s)"))
        after_row.addStretch()
        prac_int_lay.addLayout(after_row)

        # Trigger B — before each pomodoro break (mini practice set).
        self._int_before = QCheckBox(
            "Before each pomodoro break — present a short matched set")
        self._int_before.setStyleSheet("margin-left: 22px;")
        self._int_before.setChecked(
            bool(self.cfg.get("intersperse_before_break_enabled", True)))
        prac_int_lay.addWidget(self._int_before)
        _int_before_hint = QLabel("Requires Pomodoro enabled (Focus ▸ Pomodoro).")
        _int_before_hint.setStyleSheet("color: gray; margin-left: 40px;")
        prac_int_lay.addWidget(_int_before_hint)

        # Target range — how many questions to shoot for each time.
        range_row = QHBoxLayout()
        range_row.addSpacing(40)
        range_row.addWidget(QLabel("Questions per round:"))
        self._int_min = QSpinBox(); self._int_min.setRange(1, 50)
        self._int_min.setValue(int(self.cfg.get("intersperse_target_min", 2)))
        self._int_max = QSpinBox(); self._int_max.setRange(1, 50)
        self._int_max.setValue(int(self.cfg.get("intersperse_target_max", 4)))
        range_row.addWidget(self._int_min)
        range_row.addWidget(QLabel("to"))
        range_row.addWidget(self._int_max)
        range_row.addStretch()
        prac_int_lay.addLayout(range_row)

        # Tag-memory window: how many recently-reviewed cards feed the relevance match.
        window_row = QHBoxLayout()
        window_row.addSpacing(40)
        window_row.addWidget(QLabel("Match to the last"))
        self._int_window = QSpinBox()
        self._int_window.setRange(1, 500)
        self._int_window.setValue(int(self.cfg.get("intersperse_tag_window", 25)))
        self._int_window.setSuffix(" cards")
        self._int_window.setToolTip(
            "How many recently-reviewed cards' tags are remembered when choosing "
            "relevant questions (the tag-memory window).")
        window_row.addWidget(self._int_window)
        window_row.addWidget(QLabel("reviewed"))
        window_row.addStretch()
        prac_int_lay.addLayout(window_row)

        # No-match fallback.
        nomatch_row = QHBoxLayout()
        nomatch_row.addSpacing(40)
        nomatch_row.addWidget(QLabel("If nothing matches:"))
        self._int_nomatch = QComboBox()
        self._int_nomatch.addItem("Skip this round", "skip")
        self._int_nomatch.addItem("Text-similarity fallback", "text")
        _nm = self.cfg.get("intersperse_nomatch", "skip")
        self._int_nomatch.setCurrentIndex(1 if _nm == "text" else 0)
        nomatch_row.addWidget(self._int_nomatch)
        nomatch_row.addStretch()
        prac_int_lay.addLayout(nomatch_row)
        prac_int_lay.addStretch()

        def _int_sync_enabled():
            on = self._int_enabled.isChecked()
            for w in (self._int_after, self._int_before, self._int_after_n,
                      self._int_after_batch, self._int_min, self._int_max,
                      self._int_window, self._int_nomatch):
                w.setEnabled(on)
            self._int_after_n.setEnabled(on and self._int_after.isChecked())
            self._int_after_batch.setEnabled(on and self._int_after.isChecked())

        def _int_save():
            # Keep min ≤ max.
            if self._int_min.value() > self._int_max.value():
                self._int_max.setValue(self._int_min.value())
            self.cfg["intersperse_enabled"] = self._int_enabled.isChecked()
            self.cfg["intersperse_after_cards_enabled"] = self._int_after.isChecked()
            self.cfg["intersperse_after_cards_n"] = self._int_after_n.value()
            self.cfg["intersperse_after_cards_batch"] = self._int_after_batch.value()
            self.cfg["intersperse_before_break_enabled"] = self._int_before.isChecked()
            self.cfg["intersperse_target_min"] = self._int_min.value()
            self.cfg["intersperse_target_max"] = self._int_max.value()
            self.cfg["intersperse_tag_window"] = self._int_window.value()
            self.cfg["intersperse_nomatch"] = self._int_nomatch.currentData()
            mw.addonManager.writeConfig(__name__, self.cfg)
            _int_sync_enabled()

        for _w in (self._int_enabled, self._int_after, self._int_before):
            _w.stateChanged.connect(lambda _s: _int_save())
        for _w in (self._int_after_n, self._int_after_batch, self._int_min,
                   self._int_max, self._int_window):
            _w.valueChanged.connect(lambda _v: _int_save())
        self._int_nomatch.currentIndexChanged.connect(lambda _i: _int_save())
        _int_sync_enabled()

        # Link to the practice-questions guide (how banks work + building a .qb
        # from a .docx), mirroring the Lectures tab's tutorial link.
        _prac_doc = QLabel(
            'See the <a href="https://cjre.pl/ogle/janki/practice">practice guide &amp; how to import a document '
            '↗</a> for the .qb / .docx format.')
        _prac_doc.setWordWrap(True)
        _prac_doc.setOpenExternalLinks(True)
        _prac_doc.setTextInteractionFlags(Qt.TextInteractionFlag.TextBrowserInteraction)
        _prac_doc.setStyleSheet("color: gray; margin-bottom: 4px;")
        prac_qb_lay.addWidget(_prac_doc)

        _imp_btn = QPushButton("Import question bank (.qb)…")
        _imp_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        prac_qb_lay.addWidget(_imp_btn)

        # Build a .qb from a document — .docx (typed) or .pptx (slide images via
        # OCR) — side by side.
        _build_row = QHBoxLayout()
        _docx_btn = QPushButton("Build .qb from .docx…")
        _docx_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        _docx_btn.clicked.connect(
            lambda: qbank.docx_estimate_dialog(on_done=_refresh_banks))
        _build_row.addWidget(_docx_btn)

        # .pptx OCR uses macOS Vision — disable + relabel on other platforms.
        import sys as _sys
        _is_mac = _sys.platform == "darwin"
        _pptx_btn = QPushButton("Build .qb from .pptx (OCR)…" if _is_mac
                                else "Build .qb from .pptx (macOS only)")
        if _is_mac:
            _pptx_btn.setStyleSheet(
                "QPushButton{background-color:#55585e;color:white;border:none;"
                "padding:5px 12px;border-radius:5px;}"
                "QPushButton:hover{background-color:#61646b;}")
            _pptx_btn.clicked.connect(
                lambda: qbank.pptx_import_dialog(on_done=_refresh_banks))
        else:
            _pptx_btn.setEnabled(False)
            _pptx_btn.setToolTip(
                "Slide OCR uses macOS's Vision framework — available on macOS only.")
            _pptx_btn.setStyleSheet(
                "QPushButton{background-color:#3a3c40;color:#777;border:none;"
                "padding:5px 12px;border-radius:5px;}")
        _build_row.addWidget(_pptx_btn)
        prac_qb_lay.addLayout(_build_row)

        # No-AI matching pass: deterministic lecture-header tags + concept mining
        # from each question's answer/explanation text, so banks match review cards
        # without pasting anything into an AI. Try this BEFORE the AI round-trip.
        _match_btn = QPushButton("Match banks to my cards (no AI)")
        _match_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")

        def _retag_no_ai():
            from aqt.utils import tooltip
            try:
                dt, mc = qbank.retag_all_banks()
                tooltip("Matched locally: %d deck-tagged from headers, %d concept-"
                        "matched from text — no AI used." % (dt, mc), period=4200)
            except Exception as e:
                from aqt.utils import showWarning
                showWarning("Could not re-tag banks:\n\n%s" % e)
            _refresh_banks()

        _match_btn.clicked.connect(_retag_no_ai)
        prac_qb_lay.addWidget(_match_btn)
        _match_hint = QLabel("Deterministic, 100% local. Do this first; only reach "
                             "for the AI prompt below if matches are still sparse.")
        _match_hint.setWordWrap(True)
        _match_hint.setStyleSheet("color: gray; margin-bottom: 4px;")
        prac_qb_lay.addWidget(_match_hint)

        # AI-assisted tagging (offline round-trip): copy a prompt to paste into
        # your own Claude/ChatGPT, then apply its JSON reply back onto the banks.
        # Side by side (copy → apply).
        _tag_row = QHBoxLayout()
        _prompt_btn = QPushButton("Copy AI tag-matching prompt…")
        _prompt_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        _prompt_btn.clicked.connect(
            lambda: qbank.copy_tagging_prompt_dialog(on_done=_refresh_banks))
        _tag_row.addWidget(_prompt_btn)

        _apply_btn = QPushButton("Apply AI tag results (.json)…")
        _apply_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        _apply_btn.clicked.connect(
            lambda: qbank.apply_tag_results_dialog(on_done=_refresh_banks))
        _tag_row.addWidget(_apply_btn)
        prac_qb_lay.addLayout(_tag_row)

        # Convert banks into a real, syncable "Practice" deck (subdeck per bank).
        # Added to the layout at the very bottom of the page (after the stretch below).
        _deck_btn = QPushButton("Load Question Banks to Anki")
        _deck_btn.setStyleSheet(
            "QPushButton{background-color:#55585e;color:white;border:none;"
            "padding:5px 12px;border-radius:5px;}"
            "QPushButton:hover{background-color:#61646b;}")
        _deck_btn.clicked.connect(
            lambda: qbank.convert_to_deck_dialog(on_done=_refresh_banks))

        _banks_label = QLabel("Installed banks  —  drag a .qb/.docx/.pptx here to "
                              "import or build · "
                              "drag rows to reorder · drop one bank onto another to "
                              "nest it as a subbank · “+” to see subbanks · "
                              "right-click for options "
                              "(⌘/Ctrl-click several, then right-click → Merge)")
        _banks_label.setWordWrap(True)
        _banks_label.setStyleSheet("color: gray; margin-top: 8px;")
        prac_qb_lay.addWidget(_banks_label)

        from aqt.qt import (QTreeWidget, QTreeWidgetItem, QAbstractItemView,
                            QHeaderView)

        _EXPAND_COL = 1   # right-hand column holding the +/− expander
        _ROLE_SUB = int(Qt.ItemDataRole.UserRole) + 1   # child rows: (bid, "path")

        # A tree that (a) imports a .qb/.zip dropped onto it, (b) reorders top-level
        # banks by internal drag, and (c) nests one bank into another on drop-onto.
        # Top-level rows are the banks (checkable = enabled); each expands via a
        # right-side "+" to show its subbanks/lectures (read-only).
        class _BankTree(QTreeWidget):
            on_import = None       # callable(paths)
            on_reordered = None    # callable(ordered_bids)
            on_nest = None         # callable(src_bids, dest_bid)

            def _paths(self, ev):
                md = ev.mimeData()
                if not md.hasUrls():
                    return []
                return [u.toLocalFile() for u in md.urls()
                        if u.toLocalFile().lower().endswith(
                            (".qb", ".zip", ".docx", ".pptx"))]

            def dragEnterEvent(self, ev):
                if self._paths(ev):
                    ev.acceptProposedAction()
                else:
                    super().dragEnterEvent(ev)

            def dragMoveEvent(self, ev):
                if self._paths(ev):
                    ev.acceptProposedAction()
                else:
                    super().dragMoveEvent(ev)

            def dropEvent(self, ev):
                ps = self._paths(ev)
                if ps:
                    ev.acceptProposedAction()
                    if self.on_import:
                        self.on_import(ps)
                    return
                # Dropped ONTO a bank row → nest the dragged bank(s) into it (subbank).
                try:
                    pt = ev.position().toPoint()
                except Exception:
                    pt = ev.pos()
                on_item = (QAbstractItemView.DropIndicatorPosition.OnItem
                           == self.dropIndicatorPosition())
                target = self.itemAt(pt)
                if on_item and target is not None and self.on_nest:
                    dest = target.data(0, Qt.ItemDataRole.UserRole)
                    srcs = [it.data(0, Qt.ItemDataRole.UserRole)
                            for it in self.selectedItems()
                            if it.data(0, Qt.ItemDataRole.UserRole)
                            and it.data(0, Qt.ItemDataRole.UserRole) != dest]
                    if dest and srcs:
                        ev.acceptProposedAction()
                        self.on_nest(srcs, dest)
                        return
                # Only reorder relative to a top-level bank (never reparent a bank in
                # between another bank's subbank children).
                if target is not None and target.parent() is not None:
                    ev.ignore()
                    return
                super().dropEvent(ev)          # otherwise perform the internal reorder
                if self.on_reordered:
                    order = [self.topLevelItem(i).data(0, Qt.ItemDataRole.UserRole)
                             for i in range(self.topLevelItemCount())]
                    self.on_reordered([b for b in order if b])

        _banks_list = _BankTree()
        _banks_list.setObjectName("jankiBankDrop")
        _banks_list.setColumnCount(2)
        _banks_list.setHeaderHidden(True)
        _banks_list.setRootIsDecorated(False)      # no left arrows; use our right "+"
        _banks_list.setUniformRowHeights(True)
        _banks_list.setExpandsOnDoubleClick(False)
        _banks_list.setAcceptDrops(True)
        _banks_list.setDragDropMode(QAbstractItemView.DragDropMode.InternalMove)
        _banks_list.setSelectionMode(QAbstractItemView.SelectionMode.ExtendedSelection)
        _banks_list.setDefaultDropAction(Qt.DropAction.MoveAction)
        _banks_list.setDropIndicatorShown(True)
        _banks_list.setMinimumHeight(90)
        _hdr = _banks_list.header()
        _hdr.setStretchLastSection(False)
        _hdr.setSectionResizeMode(0, QHeaderView.ResizeMode.Stretch)
        _hdr.setSectionResizeMode(_EXPAND_COL, QHeaderView.ResizeMode.Fixed)
        _banks_list.setColumnWidth(_EXPAND_COL, 26)
        _banks_list.setStyleSheet(
            "#jankiBankDrop{border:1px dashed #55585e;border-radius:6px;"
            "background:transparent;color:#eee;}"
            "QTreeWidget::item{padding:4px 6px;}"
            "QTreeWidget::item:selected{background:rgba(255,255,255,0.08);}")
        prac_qb_lay.addWidget(_banks_list)

        # Guard so setCheckState/expander updates during a rebuild don't fire saves.
        self._banks_populating = False

        def _bank_at(pos):
            it = _banks_list.itemAt(pos)
            return it.data(0, Qt.ItemDataRole.UserRole) if it else None

        def _bank_name(bid):
            return (qbank.list_banks().get(bid, {}) or {}).get("name", bid)

        def _do_preview(bid):
            from ..features import practice
            practice.preview_bank(bid, _bank_name(bid))

        def _do_preview_sub(bid, path):
            from ..features import practice
            title = "%s ▸ %s" % (_bank_name(bid), path.replace("::", " ▸ "))
            practice.preview_bank(bid, title, path=path)

        def _do_remove(bid):
            qbank.remove_bank(bid)
            _refresh_banks()

        def _do_rename(bid):
            from aqt.qt import QInputDialog
            from aqt.utils import showWarning
            cur = _bank_name(bid)
            new, ok = QInputDialog.getText(self, "Rename bank", "New name:",
                                           text=cur)
            new = (new or "").strip()
            if not (ok and new and new != cur):
                return
            try:
                qbank.rename_bank(bid, new)
            except Exception as e:
                showWarning("Could not rename bank:\n\n%s" % e)
            _refresh_banks()

        def _selected_bids():
            # Merge only banks that are BOTH highlighted AND checked (enabled).
            return [it.data(0, Qt.ItemDataRole.UserRole)
                    for it in _banks_list.selectedItems()
                    if it.data(0, Qt.ItemDataRole.UserRole)
                    and it.checkState(0) == Qt.CheckState.Checked]

        def _do_merge(bids):
            from aqt.qt import QInputDialog
            from aqt.utils import tooltip, showWarning
            if len(bids) < 2:
                return
            new, ok = QInputDialog.getText(self, "Merge banks",
                                           "Name for the merged bank:",
                                           text="Merged bank")
            new = (new or "").strip()
            if not (ok and new):
                return
            try:
                qbank.merge_banks(bids, new)
                tooltip("Merged %d banks into “%s”." % (len(bids), new))
            except Exception as e:
                showWarning("Could not merge banks:\n\n%s" % e)
            _refresh_banks()

        def _do_export(bid):
            from aqt.qt import QFileDialog
            from aqt.utils import tooltip, showWarning
            name = _bank_name(bid)
            safe = re.sub(r"[^A-Za-z0-9_.-]+", "_", str(name)).strip("_") or bid
            dest, _f = QFileDialog.getSaveFileName(
                self, "Export question bank", safe + ".qb", "Question banks (*.qb)")
            if not dest:
                return
            if not dest.lower().endswith(".qb"):
                dest += ".qb"
            try:
                qbank.export_bank(bid, dest)
                tooltip("Exported “%s”." % name)
            except Exception as e:
                showWarning("Could not export bank:\n\n%s" % e)

        def _on_item_changed(item, _col=0):
            if self._banks_populating:
                return
            bid = item.data(0, Qt.ItemDataRole.UserRole)
            if not bid:
                return
            reg = qbank._load_registry()
            if bid in reg["banks"]:
                reg["banks"][bid]["enabled"] = (
                    item.checkState(0) == Qt.CheckState.Checked)
                qbank._save_registry(reg)

        def _on_double_click(item, _col=0):
            bid = item.data(0, Qt.ItemDataRole.UserRole)
            if bid:
                _do_preview(bid)
                return
            sub = item.data(0, _ROLE_SUB)
            if sub:
                _do_preview_sub(sub[0], sub[1])

        def _set_indicator(item):
            # Right-side +/− expander for rows that have children.
            if item.childCount() > 0:
                item.setText(_EXPAND_COL, "−" if item.isExpanded() else "+")
            else:
                item.setText(_EXPAND_COL, "")

        def _on_item_clicked(item, col):
            if col == _EXPAND_COL and item.childCount() > 0:
                item.setExpanded(not item.isExpanded())

        def _on_expand_collapse(item):
            self._banks_populating = True     # setText must not trip itemChanged
            _set_indicator(item)
            self._banks_populating = False

        def _on_menu(pos):
            from aqt.qt import QMenu
            it = _banks_list.itemAt(pos)
            bid = it.data(0, Qt.ItemDataRole.UserRole) if it else None
            if not bid:                       # subbank row → offer just Preview
                sub = it.data(0, _ROLE_SUB) if it else None
                if sub:
                    m = QMenu(_banks_list)
                    m.addAction("Preview subbank…",
                                lambda _c=False, s=sub: _do_preview_sub(s[0], s[1]))
                    m.exec(_banks_list.mapToGlobal(pos))
                return
            sel = _selected_bids()
            m = QMenu(_banks_list)
            if len(sel) >= 2 and bid in sel:
                m.addAction("Merge %d selected + checked banks…" % len(sel),
                            lambda _c=False, bs=list(sel): _do_merge(bs))
                m.addSeparator()
            m.addAction("Preview questions…", lambda _c=False, b=bid: _do_preview(b))
            m.addAction("Rename…", lambda _c=False, b=bid: _do_rename(b))
            m.addAction("Export the Bank…", lambda _c=False, b=bid: _do_export(b))
            m.addSeparator()
            m.addAction("Remove", lambda _c=False, b=bid: _do_remove(b))
            m.exec(_banks_list.mapToGlobal(pos))

        _banks_list.itemChanged.connect(_on_item_changed)
        _banks_list.itemDoubleClicked.connect(_on_double_click)
        _banks_list.itemClicked.connect(_on_item_clicked)
        _banks_list.itemExpanded.connect(_on_expand_collapse)
        _banks_list.itemCollapsed.connect(_on_expand_collapse)
        _banks_list.setContextMenuPolicy(Qt.ContextMenuPolicy.CustomContextMenu)
        _banks_list.customContextMenuRequested.connect(_on_menu)

        def _add_subnodes(parent, nodes, bid, prefix):
            # Recursively add subbank/lecture rows under a bank. Each carries its
            # (bid, "path") so it can be previewed on its own.
            from aqt.qt import QColor, QBrush
            for n in nodes:
                path = (prefix + "::" + n["name"]) if prefix else n["name"]
                child = QTreeWidgetItem(["%s  (%d)" % (n["name"], n["count"]), ""])
                child.setFlags(Qt.ItemFlag.ItemIsEnabled | Qt.ItemFlag.ItemIsSelectable)
                child.setData(0, _ROLE_SUB, (bid, path))
                child.setForeground(0, QBrush(QColor("#9aa0aa")))
                child.setTextAlignment(_EXPAND_COL,
                                       Qt.AlignmentFlag.AlignRight
                                       | Qt.AlignmentFlag.AlignVCenter)
                child.setToolTip(0, "Double-click to preview this subbank")
                parent.addChild(child)
                if n["children"]:
                    _add_subnodes(child, n["children"], bid, path)
                _set_indicator(child)

        def _refresh_banks():
            self._banks_populating = True
            _banks_list.clear()
            banks = qbank.list_banks()
            if not banks:
                empty = QTreeWidgetItem(["No banks imported yet.", ""])
                empty.setFlags(Qt.ItemFlag.NoItemFlags)
                _banks_list.addTopLevelItem(empty)
                self._banks_populating = False
                return
            for bid, meta in banks.items():
                item = QTreeWidgetItem(["%s  (%s)" % (meta.get("name", bid),
                                                      meta.get("count", "?")), ""])
                item.setData(0, Qt.ItemDataRole.UserRole, bid)
                item.setFlags(Qt.ItemFlag.ItemIsEnabled | Qt.ItemFlag.ItemIsSelectable
                              | Qt.ItemFlag.ItemIsDragEnabled
                              | Qt.ItemFlag.ItemIsDropEnabled
                              | Qt.ItemFlag.ItemIsUserCheckable)
                item.setCheckState(0, Qt.CheckState.Checked if meta.get("enabled", True)
                                   else Qt.CheckState.Unchecked)
                item.setTextAlignment(_EXPAND_COL,
                                      Qt.AlignmentFlag.AlignRight
                                      | Qt.AlignmentFlag.AlignVCenter)
                item.setToolTip(0, "Double-click to preview · right-click for options "
                                   "· “+” to see subbanks")
                _banks_list.addTopLevelItem(item)
                try:
                    _add_subnodes(item, qbank.bank_subtree(bid), bid, "")
                except Exception as _e:
                    log("bank subtree: %s" % _e)
                item.setExpanded(False)
                _set_indicator(item)
            self._banks_populating = False

        def _on_import():
            qbank.import_dialog()
            _refresh_banks()

        _imp_btn.clicked.connect(_on_import)

        def _import_dropped(paths):
            from aqt.utils import tooltip, showWarning
            # Route each dropped file by type: .qb/.zip import directly; .docx and
            # .pptx build a .qb first (each opens its own confirm/OCR flow).
            qbs = [p for p in paths
                   if p.lower().endswith((".qb", ".zip"))]
            docs = [p for p in paths if p.lower().endswith(".docx")]
            ppts = [p for p in paths if p.lower().endswith(".pptx")]
            ok = 0
            for p in qbs:
                try:
                    qbank.import_qb(p)
                    ok += 1
                except Exception as e:
                    showWarning("Could not import %s:\n\n%s"
                                % (p.replace("\\", "/").rsplit("/", 1)[-1], e))
            if ok:
                tooltip("Imported %d question bank%s."
                        % (ok, "" if ok == 1 else "s"))
                _refresh_banks()
            for p in docs:
                qbank.docx_estimate_dialog(on_done=_refresh_banks, path=p)
            if ppts and not _is_mac:
                showWarning(".pptx building uses macOS Vision OCR and is only "
                            "available on macOS.")
                ppts = []
            for p in ppts:
                qbank.pptx_import_dialog(on_done=_refresh_banks, path=p)

        def _on_reordered(order):
            qbank.reorder_banks(order)
            _refresh_banks()

        def _on_nest(src_bids, dest_bid):
            from aqt.utils import tooltip, showWarning
            done = 0
            for s in src_bids:
                try:
                    qbank.nest_bank(s, dest_bid)
                    done += 1
                except Exception as e:
                    showWarning("Could not nest bank:\n\n%s" % e)
            if done:
                tooltip("Nested %d bank%s into “%s”."
                        % (done, "" if done == 1 else "s", _bank_name(dest_bid)))
            _refresh_banks()

        _banks_list.on_import = _import_dropped
        _banks_list.on_reordered = _on_reordered
        _banks_list.on_nest = _on_nest

        try:
            qbank.reconcile_names()      # pick up any deck renames from the main window
        except Exception:
            pass
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
        app_win_lay.addWidget(self._oled)

        # --- Content bundle (.jank) ------------------------------------------------
        # One file for a whole content drop: decks (.apkg), question banks (.qb), lecture
        # tag maps (.json) and rephrasings (.rp), imported in the right order.
        _jank_lbl = QLabel(
            "<b>Import a content bundle</b> — a <code>.jank</code> file packs new decks, "
            "question banks, lecture tag maps and rephrasings into one download. Your "
            "review progress is kept. You can also drag a .jank onto this tab.")
        _jank_lbl.setWordWrap(True)
        gen_lay.addWidget(_jank_lbl)
        _jank_row = QHBoxLayout()
        _jank_btn = QPushButton("Import .jank…")
        _jank_btn.setAutoDefault(False)
        # The main action: big (taller, larger text, fills the row).
        _jank_btn.setMinimumHeight(42)
        _jf = _jank_btn.font(); _jf.setPointSizeF(_jf.pointSizeF() * 1.2); _jank_btn.setFont(_jf)

        def _do_jank(path=None):
            from ..features import jank
            if path:
                jank.import_jank(path, parent=self)
            else:
                jank.import_jank_dialog(parent=self)
        _jank_btn.clicked.connect(lambda: _do_jank())
        _jank_row.addWidget(_jank_btn, 1)
        # Secondary: small, on the right.
        _jank_build = QPushButton("Build .jank…")
        _jank_build.setAutoDefault(False)
        _bf = _jank_build.font(); _bf.setPointSizeF(_bf.pointSizeF() * 0.85); _jank_build.setFont(_bf)
        _jank_build.setFixedHeight(24)
        _jank_build.setToolTip("Pack .qb banks, lecture tag maps (.json), rephrasings (.rp) "
                               "and decks (.apkg) into one .jank to share.")

        def _do_build():
            from ..features import jank
            jank.packager_dialog(parent=self)
        _jank_build.clicked.connect(_do_build)
        gen_lay.addLayout(_jank_row)
        _build_row = QHBoxLayout()                    # below Import, small, on the right
        _build_row.addStretch()
        _build_row.addWidget(_jank_build)
        gen_lay.addLayout(_build_row)
        self._install_file_drop(gen_lay.parentWidget(), (".jank", ".tgz", ".tar.gz"),
                                "Drop to import the bundle", lambda ps: _do_jank(ps[0]))

        self._aot = QCheckBox("Keep Anki window always on top")
        self._aot.setChecked(bool(self.cfg.get("always_on_top", False)))

        def on_aot(_state):
            self.cfg["always_on_top"] = self._aot.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            glass._apply_always_on_top(self._aot.isChecked())

        self._aot.stateChanged.connect(on_aot)
        app_win_lay.addWidget(self._aot)

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
        app_win_lay.addWidget(self._deck_stats)

        self._tray = QCheckBox("Menu-bar icon + keep running in the tray when the window is closed")
        self._tray.setToolTip(
            "On: shows the menu-bar icon (tray menu), and closing the window (red X) hides "
            "Anki there — it keeps running; click the icon or the Dock to reopen.\n"
            "Off: no menu-bar icon; the window behaves like a native app — the red X closes it and quits Anki."
        )
        self._tray.setChecked(bool(self.cfg.get("tray_minimize", False)))

        def on_tray(_state):
            self.cfg["tray_minimize"] = self._tray.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # The menu-bar icon follows this setting (see tray._tray_should_show).
            tray._apply_tray(tray._tray_should_show())

        self._tray.stateChanged.connect(on_tray)
        app_win_lay.addWidget(self._tray)

        self._tray_login = QCheckBox("Open Janki to the tray at login")
        self._tray_login.setToolTip(
            "Launch Janki automatically when you log in and start it minimized to the "
            "menu-bar/tray (macOS)."
        )
        self._tray_login.setChecked(bool(self.cfg.get("open_to_tray_on_login", False)))

        def on_tray_login(_state):
            on = self._tray_login.isChecked()
            self.cfg["open_to_tray_on_login"] = on
            mw.addonManager.writeConfig(__name__, self.cfg)
            tray.set_login_item(on)
            if on:
                tray._apply_tray(True)   # ensure a tray target exists to launch into

        self._tray_login.stateChanged.connect(on_tray_login)
        app_win_lay.addWidget(self._tray_login)

        # Focus-independent controller (IOKit HID) — drives Anki from a gamepad in
        # caption mode even when another app is focused/fullscreen.
        self._hid = QCheckBox(
            "Controller input while unfocused (requires IOKit HID and Input "
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
        cap_lay.addWidget(self._hid)             # Focus → Caption

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
        app_text_lay.addWidget(self._amboss)          # Appearance → Text

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
        # Opens the Janki docs (README + guides) on cjre.pl in the browser.
        _doc_link = QLabel(
            '<a href="https://cjre.pl/ogle/janki" '
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
        _mob_note.setStyleSheet("color: gray;")
        app_mob_lay.addWidget(_mob_note)

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
        app_text_lay.insertLayout(1, _mfont_row)     # interface font, mobile font, animation

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
        app_mob_lay.addWidget(self._mob_tapfb)

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
        app_mob_lay.addLayout(_mob_row)

        hint = QLabel("Color + opacity set the tint; blur radius blurs the desktop "
                      "behind Anki (like Terminal). Changes apply live and save "
                      "automatically.")
        hint.setWordWrap(True)
        app_win_lay.addWidget(hint)

        # === Rephrase =======================================================
        self._build_reword_tab(rw_import_lay, rw_mobile_lay, rw_exp_lay)

        # Push each page's controls to the top.
        for pl in (app_win_lay, app_text_lay, app_mob_lay, flare_lay, timer_lay, cap_lay,
                   pomo_lay, lock_lay,
                   prac_app_lay, prac_qb_lay, gen_lay,
                   rw_import_lay, rw_mobile_lay, rw_exp_lay):
            pl.addStretch()

        # Pin "Load Question Banks to Anki" to the bottom of the Question Bank page
        # (after the stretch, so it sits below the installed-banks list).
        prac_qb_lay.addWidget(_deck_btn)

        # No Close button — the window's own close (red X / Esc) ends the dialog. Save
        # the Lectures fields however it closes (finished fires for accept AND reject).
        def _save_on_close(*_a):
            for _fn in getattr(self, "_lecture_savers", []):
                try:
                    _fn()
                except Exception as _e:
                    log("lecture save failed: %s" % _e)

        self.finished.connect(_save_on_close)

        # Fit the window HEIGHT to the currently-shown tab so a short tab doesn't leave
        # a tall window with empty space at the bottom. QTabWidget's own sizeHint /
        # minimumSizeHint aggregate the MAX over all pages (Qt ignores per-page size
        # policy here), so the only reliable way is to measure the current tab's real
        # content height ourselves — recursing through the nested tab groups — and pin
        # the outer tab widget to it with setFixedHeight (which overrides that min).
        from aqt.qt import QTimer
        tabws = [tabs, app_tabs, prac_tabs, focus_tabs, rw_tabs]
        _lt = locals().get("lec_tabs")
        if _lt is not None:
            tabws.append(_lt)

        def _tabbar_h(tw):
            tb = tw.tabBar()
            return (tb.sizeHint().height() if tb else 0) + 10   # + frame/margins

        def _direct_nested(page):
            lay_ = page.layout() if page else None
            if lay_ is not None:
                for i in range(lay_.count()):
                    it = lay_.itemAt(i)
                    w = it.widget() if it else None
                    if isinstance(w, QTabWidget):
                        return w
            return None

        def _page_h(page):
            if page is None:
                return 0
            nested = _direct_nested(page)
            if nested is not None:                     # page just hosts a nested group
                return _eff_h(nested)
            h = page.sizeHint().height()
            # Word-wrapped explanation labels: sizeHint guesses a wrap width, so it can
            # be far too tall (dead space under text-heavy pages like Rephrase) or too
            # short with a wide font (cropping). Height-for-width at the page's REAL
            # width is exact either way, so prefer it whenever the layout supports it.
            lay_ = page.layout()
            if lay_ is not None and lay_.hasHeightForWidth():
                w = page.width() if page.isVisible() and page.width() > 50 \
                    else max(200, tabs.width() - 24)
                hfw = lay_.totalHeightForWidth(w)
                if hfw > 0:
                    h = hfw
            return h + 6                               # small breathing room, no clipping

        def _eff_h(tw):
            return _page_h(tw.currentWidget()) + _tabbar_h(tw)

        from aqt.qt import QVariantAnimation, QEasingCurve as _Ease
        _fit_state = {"first": True, "anim": None}

        def _set_tabs_h(h):
            # Drive the tab area's height; the window follows it each frame, so it
            # grows/shrinks continuously instead of snapping (resizing the window
            # directly can't grow smoothly — Qt enforces the content's min height).
            tabs.setFixedHeight(int(h))
            self.layout().activate()
            self.resize(self.width(), self.sizeHint().height())
            glass.restyle_glass_dialog_now(self)   # keep the titlebar glassed every frame

        def _fit(*_a):
            try:
                self.layout().activate()
                target = _eff_h(tabs)
                if _fit_state["first"]:            # initial open: size instantly
                    _fit_state["first"] = False
                    tabs.setFixedHeight(target)
                    self.layout().activate()
                    self.adjustSize()
                    self.resize(self.width(), self.sizeHint().height())
                    glass.restyle_glass_dialog(self)
                    return
                prev = _fit_state["anim"]
                if prev is not None:
                    prev.stop()
                start = tabs.height()
                if abs(target - start) < 2:
                    _set_tabs_h(target)
                    glass.restyle_glass_dialog(self)
                    return
                anim = QVariantAnimation(self)
                anim.setDuration(240)
                anim.setStartValue(float(start))
                anim.setEndValue(float(target))
                anim.setEasingCurve(_Ease.Type.OutCubic)
                anim.valueChanged.connect(lambda v: _set_tabs_h(v))

                def _end():
                    _set_tabs_h(target)
                    # Resizing the native window drops its glass (the titlebar goes
                    # opaque); re-assert tint/blur/transparent titlebar at the end.
                    glass.restyle_glass_dialog(self)
                anim.finished.connect(_end)
                _fit_state["anim"] = anim
                anim.start()
            except Exception:
                pass

        self._fit_tabs = _fit
        for tw in tabws:
            try:
                tw.currentChanged.connect(lambda _i, f=_fit: QTimer.singleShot(0, f))
            except Exception:
                pass
        QTimer.singleShot(0, _fit)

        # Fade the incoming page in on every tab / subtab switch. The opacity effect is
        # removed once the fade ends, so pages render normally (and cheaply) at rest.
        from aqt.qt import QGraphicsOpacityEffect, QPropertyAnimation, QEasingCurve

        def _fade_in(tw, _i):
            page = tw.currentWidget()
            if page is None:
                return
            try:
                old = getattr(page, "_jk_fade", None)
                if old is not None:
                    old.stop()
                eff = QGraphicsOpacityEffect(page)
                eff.setOpacity(0.0)
                page.setGraphicsEffect(eff)
                glass.restyle_glass_dialog_now(self)
                anim = QPropertyAnimation(eff, b"opacity", page)
                anim.setDuration(180)
                anim.setStartValue(0.0)
                anim.setEndValue(1.0)
                anim.setEasingCurve(QEasingCurve.Type.OutCubic)

                def _done(p=page, e=eff):
                    if p.graphicsEffect() is e:
                        p.setGraphicsEffect(None)
                    p._jk_fade = None
                    glass.restyle_glass_dialog(self)
                anim.finished.connect(_done)
                page._jk_fade = anim
                anim.start()
            except Exception:
                pass

        for tw in self.findChildren(QTabWidget):
            try:
                tw.currentChanged.connect(lambda i, t=tw: _fade_in(t, i))
            except Exception:
                pass

    def _install_file_drop(self, target, exts, label, on_drop) -> None:
        """Make `target` accept dropped files with one of `exts` (glass drop highlight while
        dragging); calls on_drop([paths])."""
        from aqt.qt import QObject, QEvent, QLabel, Qt
        if target is None:
            return
        try:
            light = glass._tint_is_light()
        except Exception:
            light = False
        ink = "0,0,0" if light else "255,255,255"
        overlay = QLabel(label, target)
        overlay.setAlignment(Qt.AlignmentFlag.AlignCenter)
        overlay.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents, True)
        overlay.setStyleSheet(
            "QLabel { background: rgba(%(i)s,0.08); border: 2px dashed rgba(%(i)s,0.45);"
            " border-radius: 12px; color: rgba(%(i)s,0.85); font-size: 15px; }" % {"i": ink})
        overlay.hide()

        def _paths(ev):
            md = ev.mimeData()
            if md is None or not md.hasUrls():
                return []
            return [u.toLocalFile() for u in md.urls()
                    if u.isLocalFile() and u.toLocalFile().lower().endswith(tuple(exts))]

        class _Drop(QObject):
            def eventFilter(self_, obj, ev):
                t = ev.type()
                if t in (QEvent.Type.DragEnter, QEvent.Type.DragMove):
                    if _paths(ev):
                        ev.acceptProposedAction()
                        if not overlay.isVisible():
                            overlay.setGeometry(target.rect().adjusted(4, 4, -4, -4))
                            overlay.raise_()
                            overlay.show()
                        return True
                elif t == QEvent.Type.DragLeave:
                    overlay.hide()
                elif t == QEvent.Type.Drop:
                    overlay.hide()
                    ps = _paths(ev)
                    if ps:
                        ev.acceptProposedAction()
                        on_drop(ps)
                        return True
                return False

        target.setAcceptDrops(True)
        f = _Drop(self)
        target.installEventFilter(f)
        self.__dict__.setdefault("_drop_filters", []).append(f)

    def _install_rp_drop(self, report) -> None:
        """Drag a .rp (or .json/.txt/.rtf/.md) file anywhere onto the Rephrase tab to import
        it — same importer + report as the Import button. A glass drop highlight shows while
        a file is dragged over."""
        from aqt.qt import QObject, QEvent, QLabel, Qt
        from aqt.utils import tooltip
        target = getattr(self, "_rw_tabs", None)
        if target is None:
            return
        exts = (".rp", ".json", ".txt", ".rtf", ".md")
        try:
            light = glass._tint_is_light()
        except Exception:
            light = False
        ink = "0,0,0" if light else "255,255,255"
        overlay = QLabel("Drop to import rephrasings", target)
        overlay.setAlignment(Qt.AlignmentFlag.AlignCenter)
        overlay.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents, True)
        overlay.setStyleSheet(
            "QLabel { background: rgba(%(i)s,0.08); border: 2px dashed rgba(%(i)s,0.45);"
            " border-radius: 12px; color: rgba(%(i)s,0.85); font-size: 15px; }" % {"i": ink})
        overlay.hide()

        def _paths(ev):
            md = ev.mimeData()
            if md is None or not md.hasUrls():
                return []
            return [u.toLocalFile() for u in md.urls()
                    if u.isLocalFile() and u.toLocalFile().lower().endswith(exts)]

        class _Drop(QObject):
            def eventFilter(self_, obj, ev):
                t = ev.type()
                if t in (QEvent.Type.DragEnter, QEvent.Type.DragMove):
                    if _paths(ev):
                        ev.acceptProposedAction()
                        if not overlay.isVisible():
                            overlay.setGeometry(target.rect().adjusted(4, 4, -4, -4))
                            overlay.raise_()
                            overlay.show()
                        return True
                elif t == QEvent.Type.DragLeave:
                    overlay.hide()
                elif t == QEvent.Type.Drop:
                    overlay.hide()
                    paths = _paths(ev)
                    if not paths:
                        return False
                    ev.acceptProposedAction()
                    try:
                        target.setCurrentIndex(0)          # show the Import subtab
                    except Exception:
                        pass
                    tot_imp, tot_skip, reasons = 0, 0, {}
                    for pth in paths:
                        try:
                            imp, skip, rs = reword.import_rp(pth)
                        except Exception as exc:
                            tooltip("Import failed (%s): %s" % (os.path.basename(pth), exc))
                            continue
                        tot_imp += imp
                        tot_skip += skip
                        for k, v in (rs or {}).items():
                            reasons[k] = reasons.get(k, 0) + v
                    if tot_imp or tot_skip:
                        report(tot_imp, tot_skip, reasons)
                    return True
                return False

        target.setAcceptDrops(True)
        self._rp_drop_filter = _Drop(self)
        target.installEventFilter(self._rp_drop_filter)

    def _build_reword_tab(self, imp_lay, mob_lay, exp_lay):
        """Rephrase: show cards phrased differently (same card/scheduler data-space) so you
        learn content, not exact words. Split across Import / Mobile / Experimental subtabs."""
        from aqt.qt import QPushButton, QApplication
        from aqt.utils import tooltip, getFile

        # ================= IMPORT subtab =================
        intro = QLabel(
            "Rephrase shows your cards reworded — different wording, same meaning — so you "
            "recall the content, not the exact sentence. It's display-only: answering a "
            "rephrased card counts exactly like the original (no extra cards, scheduler "
            "untouched). Cloze blanks and the tested term are preserved; text formatting "
            "is kept, but images/media aren't rephrased. "
            '<a href="https://cjre.pl/ogle/janki/rephrase">Rephrase user guide ↗</a>')
        intro.setOpenExternalLinks(True)
        intro.setTextInteractionFlags(Qt.TextInteractionFlag.TextBrowserInteraction)
        intro.setWordWrap(True)
        intro.setStyleSheet("color: gray; margin-bottom: 6px;")
        imp_lay.addWidget(intro)

        # Big obvious ON/OFF switch (green = on, grey = off).
        self._rw_enable = QPushButton()
        self._rw_enable.setCheckable(True)
        self._rw_enable.setChecked(bool(self.cfg.get("reword_enabled", False)))

        def _rw_style():
            on = self._rw_enable.isChecked()
            self._rw_enable.setText("Rephrase mode:  ON" if on else "Rephrase mode:  OFF")
            self._rw_enable.setStyleSheet(
                "QPushButton{padding:10px 16px;border-radius:8px;font-weight:700;font-size:14px;%s}"
                % ("background:rgba(52,199,89,0.28);color:#1a7f37;"
                   "border:1px solid rgba(52,199,89,0.55);" if on else
                   "background:rgba(128,128,128,0.15);color:gray;"
                   "border:1px solid rgba(128,128,128,0.45);"))

        def on_rw_enable(checked):
            self.cfg["reword_enabled"] = bool(checked)
            mw.addonManager.writeConfig(__name__, self.cfg)
            _rw_style()
            try:
                from . import tray_nav
                tray_nav._refresh_toggles()   # re-tint the tray "Rephrase" entry (green)
            except Exception:
                pass
            if mw.state == "review":
                mw.reviewer._showQuestion()
        self._rw_enable.toggled.connect(on_rw_enable)
        _rw_style()
        imp_lay.addWidget(self._rw_enable)

        # ---- PRIMARY WAY: build rephrasings with any chat model, import the .rp -------------
        rp = QLabel("<b>Main way — build with any chat model.</b> Pick decks and copy a prompt, "
                    "paste it into Claude/ChatGPT/etc. — it hands back a janki-rephrase.rp file; "
                    "download it and use “Import rephrasings…”. If a model can't make files and "
                    "prints the JSON instead, “Import from clipboard” (or any text/.rtf file) works too. These pasted rephrasings are usually best quality.")
        rp.setWordWrap(True)
        rp.setStyleSheet("margin-top:8px;")
        imp_lay.addWidget(rp)

        btn_prompt = QPushButton("Copy rephrase prompt…")
        # Opens a separate window to CHECK which decks to pull from (like the qbank prompt tools).
        btn_prompt.clicked.connect(lambda: reword.copy_rephrase_prompt_dialog(parent=self))
        imp_lay.addWidget(btn_prompt)

        def _rw_import_report(imp, skip, reasons):
            if not skip:
                tooltip("Rephrasings imported: %d." % imp, period=3500)
                return
            top = sorted(reasons.items(), key=lambda kv: -kv[1])[:3]
            detail = "; ".join("%d %s" % (n, why) for why, n in top)
            tooltip("Imported %d · skipped %d — %s" % (imp, skip, detail), period=7000)

        import_row = QHBoxLayout()
        btn_import = QPushButton("Import rephrasings (.rp)…")

        def _rw_import():
            p = getFile(mw, "Import rephrasings", None, key="janki_rp",
                        filter="Rephrase / text files (*.rp *.json *.txt *.rtf *.md);;All files (*)")
            if not p:
                return
            p = p[0] if isinstance(p, (list, tuple)) else p
            try:
                imp, skip, reasons = reword.import_rp(p)
                _rw_import_report(imp, skip, reasons)
            except Exception as e:
                tooltip("Import failed: %s" % e)
        btn_import.clicked.connect(lambda: _rw_import())
        btn_import.setToolTip("Pick a .rp file — or just drag one onto this tab.")
        import_row.addWidget(btn_import, 1)
        self._install_rp_drop(_rw_import_report)

        btn_import_clip = QPushButton("Import from clipboard")

        def _rw_import_clip():
            raw = QApplication.clipboard().text()
            if not raw or not raw.strip():
                tooltip("Clipboard is empty — copy the model's reply first."); return
            try:
                imp, skip, reasons = reword.import_rp_text(raw)
                _rw_import_report(imp, skip, reasons)
            except Exception as e:
                tooltip("Import failed: %s" % e)
        btn_import_clip.clicked.connect(lambda: _rw_import_clip())
        import_row.addWidget(btn_import_clip, 1)
        imp_lay.addLayout(import_row)

        # Preview the current card's rewords, or browse every stored reword.
        view_row = QHBoxLayout()
        btn_prev = QPushButton("Preview current card…")

        def _rw_preview():
            card = getattr(mw.reviewer, "card", None) if mw.state == "review" else None
            if not card:
                tooltip("Open a card in the reviewer first."); return
            self._show_reword_preview(card)
        btn_prev.clicked.connect(lambda: _rw_preview())
        view_row.addWidget(btn_prev, 1)

        btn_view_all = QPushButton("View all rephrasings…")
        btn_view_all.clicked.connect(lambda: reword.view_all_rewords_dialog(parent=self))
        view_row.addWidget(btn_view_all, 1)
        imp_lay.addLayout(view_row)

        btn_clear = QPushButton("Clear stored rephrasings…")
        btn_clear.clicked.connect(lambda: reword.clear_rephrasings_dialog(parent=self))
        imp_lay.addWidget(btn_clear)

        # ================= MOBILE subtab =================
        mob_desc = QLabel(
            "Bakes your rephrasings into your note types so a small Original / Reworded "
            "button appears on AnkiMobile / AnkiDroid (like the Practice slide button). "
            "The data rides your normal sync inside your own notes — nothing is uploaded "
            "elsewhere. Re-run after importing new rephrasings. Adds a hidden field, so "
            "the next sync is a one-way full sync.")
        mob_desc.setWordWrap(True)
        mob_desc.setStyleSheet("color: gray;")
        mob_lay.addWidget(mob_desc)

        mob_row = QHBoxLayout()
        btn_mob_apply = QPushButton("Enable / update on mobile")
        btn_mob_remove = QPushButton("Remove from mobile")

        def _rw_mobile_apply():
            from ..features import reword_mobile
            try:
                nm, nn = reword_mobile.apply()
            except Exception as exc:
                tooltip("Mobile rephrasings failed: %s" % exc); return
            if nm == 0:
                tooltip("No rephrasings to sync yet — import or generate some first.")
            else:
                tooltip("Baked into %d note type(s), %d note(s). Now Sync." % (nm, nn))

        def _rw_mobile_remove():
            from ..features import reword_mobile
            try:
                n = reword_mobile.remove()
            except Exception as exc:
                tooltip("Remove failed: %s" % exc); return
            tooltip("Removed from %d note type(s). Sync to update devices." % n)

        btn_mob_apply.clicked.connect(lambda: _rw_mobile_apply())
        btn_mob_remove.clicked.connect(lambda: _rw_mobile_remove())
        mob_row.addWidget(btn_mob_apply, 1)
        mob_row.addWidget(btn_mob_remove, 1)
        mob_lay.addLayout(mob_row)

        self._rw_mob_hide = QCheckBox("Toggle Rephrase Button for Original Cards")
        self._rw_mob_hide.setToolTip(
            "When checked, cards with no rephrasing don't show the Original / Reworded "
            "button on mobile. Unchecked, they show a faint, inactive Original button.")
        self._rw_mob_hide.setChecked(bool(self.cfg.get("reword_mobile_hide_unrephrased", True)))

        def _rw_mob_hide_changed(*_a):
            self.cfg["reword_mobile_hide_unrephrased"] = bool(self._rw_mob_hide.isChecked())
            mw.addonManager.writeConfig(__name__, self.cfg)
            from ..features import reword_mobile
            if reword_mobile.is_applied():
                reword_mobile.restamp_templates()
                tooltip("Mobile rephrase button updated — Sync to push it to your devices.")
        self._rw_mob_hide.toggled.connect(_rw_mob_hide_changed)
        mob_lay.addWidget(self._rw_mob_hide)

        # ================= EXPERIMENTAL subtab =================
        if reword.on_device_available():
            self._rw_ondevice = QCheckBox("Generate on-device automatically (experimental, "
                                          "Apple Intelligence — lower quality than pasted AI)")
            self._rw_ondevice.setChecked(bool(self.cfg.get("reword_prefetch", False)))

            def on_ondevice(checked):
                self.cfg["reword_prefetch"] = bool(checked)
                mw.addonManager.writeConfig(__name__, self.cfg)
                if checked:
                    reword.warm_up()
            self._rw_ondevice.toggled.connect(on_ondevice)
            exp_lay.addWidget(self._rw_ondevice)

            od = QLabel("Runs Apple's on-device model in the background; nothing is uploaded. "
                        "Off by default — use the pasted-AI (Import) path for best results.")
            od.setWordWrap(True)
            od.setStyleSheet("color: gray;")
            exp_lay.addWidget(od)

            btn_now = QPushButton("Rephrase current card on-device (one-off)")

            def _rw_now():
                card = getattr(mw.reviewer, "card", None) if mw.state == "review" else None
                if not card:
                    tooltip("Open a card in the reviewer first."); return
                tooltip("Rephrasing on-device…")
                reword.regenerate_card_async(
                    card,
                    on_done=lambda n: (tooltip("Rephrase: %d side(s) stored." % n),
                                       mw.state == "review" and mw.reviewer._showQuestion()))
            btn_now.clicked.connect(lambda: _rw_now())
            exp_lay.addWidget(btn_now)
        else:
            od = QLabel("On-device generation needs macOS with Apple Intelligence. On other "
                        "systems, use the pasted-AI (Import) path — it's the main way anyway.")
            od.setWordWrap(True)
            od.setStyleSheet("color: gray;")
            exp_lay.addWidget(od)

    def _show_reword_preview(self, card):
        """A read-only dialog showing a card's original text and its stored rephrasings per
        side, with a Generate/regenerate button (on-device, macOS)."""
        from aqt.qt import QDialog, QVBoxLayout, QHBoxLayout, QTextEdit, QPushButton
        from aqt.utils import tooltip
        dlg = QDialog(self)
        dlg.setWindowTitle("Reword preview")
        dlg.resize(640, 480)
        v = QVBoxLayout(dlg)
        view = QTextEdit()
        view.setReadOnly(True)
        view.setStyleSheet("font-size:13px;")
        v.addWidget(view)

        def refresh():
            data = reword.get_card_rewords(card)
            parts = []
            def _ind(s, pad):
                return (s or "").replace("\n", "\n" + pad)
            for side, label in (("q", "Question"), ("a", "Answer")):
                orig, variants = data.get(side, ("", []))
                parts.append("══ %s ══" % label)
                parts.append("Original:\n  %s" % (_ind(orig, "  ") or "(empty)"))
                parts.append("Rewords:")
                if variants:
                    parts += ["  %d. %s" % (i, _ind(x, "     "))
                              for i, x in enumerate(variants, 1)]
                else:
                    parts.append("  (none stored — generate or import to add)")
                parts.append("")
            view.setPlainText("\n".join(parts))
        refresh()

        row = QHBoxLayout()
        if reword.on_device_available():
            gen = QPushButton("Generate / regenerate now")

            def _gen():
                tooltip("Rephrasing on-device…")
                reword.regenerate_card_async(
                    card, on_done=lambda n: (tooltip("Stored %d side(s)." % n), refresh()))
            gen.clicked.connect(lambda: _gen())
            row.addWidget(gen)
        clr = QPushButton("Clear this card")

        def _clr():
            reword.clear_card(card)
            refresh()
            tooltip("Cleared this card's rewords.")
        clr.clicked.connect(lambda: _clr())
        row.addWidget(clr)
        row.addStretch()
        close = QPushButton("Close")
        close.clicked.connect(dlg.accept)
        row.addWidget(close)
        v.addLayout(row)
        dlg.show()

    def _update_color_swatch(self):
        c = self.cfg.get("tint_color", "#1e1e1e")
        self._color_btn.setText(c)
        self._color_btn.setStyleSheet(f"background-color: {c}; color: white;")

    def _pick_color(self):
        cur = QColor(self.cfg.get("tint_color", "#1e1e1e"))
        col = QColorDialog.getColor(cur, self, "Background color")
        if col.isValid():
            self.cfg["tint_mode"] = "custom"
            self.cfg["tint_color"] = col.name()
            self._update_color_swatch()
            diagnostics._live_apply(self.cfg)


_settings_instance = None            # the one open settings window (singleton)


def _apply_settings_section(d, section):
    if section == "practice_qbank":
        try:
            for i in range(d._tabs.count()):
                if d._tabs.tabText(i) == "Practice":
                    d._tabs.setCurrentIndex(i)
                    break
            for j in range(d._prac_tabs.count()):
                if d._prac_tabs.tabText(j) == "Question Bank":
                    d._prac_tabs.setCurrentIndex(j)
                    break
        except Exception:
            pass
    elif section == "lectures":
        try:
            for i in range(d._tabs.count()):
                if d._tabs.tabText(i) == "Lectures":
                    d._tabs.setCurrentIndex(i)
                    break
        except Exception:
            pass


def _open_settings(section=None, float_above=False):
    global _settings_instance
    # Singleton: if a settings window is already open, just switch to the requested section
    # and refocus it instead of opening a second one.
    existing = _settings_instance
    if existing is not None:
        try:
            if existing.isVisible():
                _apply_settings_section(existing, section)
                from ..user import glass
                glass.bring_dialog_to_front(existing)
                return
        except Exception:
            existing = None                       # underlying window was destroyed
    d = GlassSettings()
    _settings_instance = d

    def _forget(*_a):
        global _settings_instance
        if _settings_instance is d:
            _settings_instance = None
    try:
        d.finished.connect(_forget)
    except Exception:
        pass

    _apply_settings_section(d, section)
    # Keep the always-in-front main window from floating over this dialog.
    try:
        from ..user import glass
        glass.hold_dialog_above(d)
        glass.bring_dialog_to_front(d)
        glass.hide_titlebar_extras(d)            # close button only, no title text
        # Opened from the tray (main window hidden): float the dialog above the main
        # window so restoring the main window later can't cover it.
        if float_above:
            glass.float_dialog_above(d)
    except Exception:
        d.show()
