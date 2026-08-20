# Anki Glass (deep) — config

**Only active when launched via `~/Desktop/AnkiGlass.command`.** Launch from the
normal app icon and this add-on does nothing (your instant undo).

- `material` — NSVisualEffectView material (macOS native blur look). Try:
  `21` under-window bg (subtle), `13` HUD, `7` sidebar, `15` fullscreen UI,
  `18` window bg, `4` dark, `2` titlebar. Change → Re-apply from Tools menu.
- `opacity` (0–1) — panel tint strength over the vibrancy.
- `blur_radius`, `saturation`, `corner_radius` — panel frosting.
- `tint_mode` (light/dark/custom) + `tint_color`.
- `screens.*` — per-screen toggles.
- `pomodoro_work_mins` — minutes of **review time** between breaks (the work
  timer only advances while a card is up, not on the deck browser or in a break).
- `pomodoro_short_break_mins` / `pomodoro_long_break_mins` — break lengths.
- `pomodoro_long_break_every` — every Nth break is a long one; `0` disables long
  breaks. These are all editable live in Tools → Janki settings (Pomodoro breaks).
