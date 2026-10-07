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
_FLAGS = ("--disable-gpu --disable-gpu-compositing --num-raster-threads=4 "
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
# Launch timing marks (wall clock), read by Janki's startup log: what Anki does before
# any add-on loads.
sys._janki_boot = [("python started, hook ran", time.time())]
_T_HOOK = time.time() - 0.06     # ≈ process start (the hook runs ~60 ms in)


_STAR = [
    (-0.244, -1.0), (-0.15, -0.953), (0.15, -0.654), (0.197, -0.622), (0.276,
    -0.622), (0.291, -0.638), (0.323, -0.638), (0.575, -0.732), (0.622, -0.732),
    (0.638, -0.748), (0.811, -0.748), (0.858, -0.717), (0.89, -0.669), (0.89,
    -0.543), (0.874, -0.528), (0.858, -0.449), (0.764, -0.26), (0.732, -0.228),
    (0.669, -0.071), (0.78, 0.102), (0.843, 0.165), (0.969, 0.37), (0.984, 0.465),
    (0.953, 0.543), (0.874, 0.591), (0.638, 0.591), (0.622, 0.575), (0.543, 0.575),
    (0.528, 0.559), (0.449, 0.559), (0.433, 0.543), (0.291, 0.543), (0.228, 0.622),
    (0.039, 0.89), (-0.024, 0.953), (-0.102, 1.0), (-0.181, 1.0), (-0.244, 0.969),
    (-0.307, 0.858), (-0.323, 0.732), (-0.339, 0.717), (-0.339, 0.638), (-0.354,
    0.622), (-0.354, 0.528), (-0.37, 0.512), (-0.386, 0.402), (-0.465, 0.339),
    (-0.496, 0.339), (-0.512, 0.323), (-0.543, 0.323), (-0.559, 0.307), (-0.591,
    0.307), (-0.606, 0.291), (-0.858, 0.213), (-0.969, 0.118), (-0.969, 0.087),
    (-0.984, 0.071), (-0.984, 0.024), (-0.953, -0.039), (-0.89, -0.102), (-0.543,
    -0.276), (-0.449, -0.354), (-0.449, -0.795), (-0.433, -0.811), (-0.433, -0.874),
    (-0.417, -0.89), (-0.417, -0.921), (-0.354, -0.984), (-0.323, -1.0), (-0.244,
    -1.0)]


def _splash():
    """Instant stand-in window: a plain Win32 window (no Qt, no Chromium) at the main
    window's last size/place in Janki's tint, shown ~0.1 s after the click. Anki's own
    window takes ~1.9 s (Qt + browser engine start-up); Janki closes this once that has
    drawn over it (sys._janki_splash_hwnd), and it closes itself after 10 s regardless."""
    try:
        import ctypes, json
        from ctypes import wintypes as wt
        cfg_path = os.path.join(os.environ.get("APPDATA", ""), "Anki2", "addons21",
                                "janki", "meta.json")
        with open(cfg_path, encoding="utf-8") as f:
            c = json.load(f).get("config") or {}
        if c.get("win_splash", True) is False or c.get("last_win_fs") \
                or c.get("open_to_tray_on_login") and "--tray" in " ".join(sys.argv):
            return
        x, y = int(c.get("last_win_x", 100)), int(c.get("last_win_y", 100))
        w, h = int(c.get("last_win_w", 1100)), int(c.get("last_win_h", 750))
        # Snapshot of the last deck list / calendar (saved by Janki at quit): shown
        # instead of a blank tint so the hand-over to the real window is near-invisible.
        snap_geo = os.path.join(os.path.dirname(cfg_path), "user_files",
                                "launch_snapshot.json")
        sg = {}
        hbmp = None
        try:
            with open(snap_geo, encoding="utf-8") as f:
                sg = json.load(f)
            x, y, w, h = int(sg["x"]), int(sg["y"]), int(sg["w"]), int(sg["h"])
            use_snap = bool(sg.get("physical")) and sg.get("bg_argb") is not None
        except Exception:
            use_snap = False
        if c.get("last_win_max") and not use_snap:
            return
        # Replay exactly what Janki applied to the main window (dwm.apply, saved with
        # the snapshot); without a record, no backdrop — just the tint.
        rec = sg.get("dwm") or {}
        blur = bool(rec.get("blur"))
        tint = str(c.get("tint_color") or "#222327").lstrip("#")
        r, g, b = int(tint[0:2], 16), int(tint[2:4], 16), int(tint[4:6], 16)

        u32 = ctypes.WinDLL("user32", use_last_error=True)
        # Physical pixels on every monitor (the snapshot geometry is physical); this
        # thread only — Qt sets the process's own awareness later.
        try:
            u32.SetThreadDpiAwarenessContext.restype = ctypes.c_void_p
            u32.SetThreadDpiAwarenessContext(ctypes.c_void_p(-4))   # PER_MONITOR_AWARE_V2
        except Exception:
            pass
        g32 = ctypes.WinDLL("gdi32")
        k32 = ctypes.WinDLL("kernel32")
        dwm = ctypes.WinDLL("dwmapi")
        LRESULT = ctypes.c_ssize_t
        WNDPROC = ctypes.WINFUNCTYPE(LRESULT, wt.HWND, wt.UINT, wt.WPARAM, wt.LPARAM)
        u32.DefWindowProcW.restype = LRESULT
        u32.DefWindowProcW.argtypes = (wt.HWND, wt.UINT, wt.WPARAM, wt.LPARAM)

        def proc(hwnd, msg, wp, lp):
            if msg == 0x0014 and _splash.bmp:  # WM_ERASEBKGND: WM_PAINT covers it
                return 1
            if msg == 0x000F and _splash.bmp:  # WM_PAINT: glass background + loading panel
                ps = (ctypes.c_byte * 72)()
                hdc = u32.BeginPaint(hwnd, ps)
                mdc = g32.CreateCompatibleDC(hdc)
                old = g32.SelectObject(mdc, _splash.bmp)
                rc = wt.RECT()
                u32.GetClientRect(hwnd, ctypes.byref(rc))
                g32.SetStretchBltMode(hdc, 3)                    # COLORONCOLOR: keeps alpha
                g32.StretchBlt(hdc, 0, 0, rc.right, rc.bottom, mdc, 0, 0,
                               _splash.bw, _splash.bh, 0x00CC0020)   # SRCCOPY
                P = getattr(_splash, "panel", None)
                if P:
                    g32.SelectObject(mdc, P["hb"])
                    px, py = (rc.right - P["PW"]) // 2, (rc.bottom - P["PH"]) // 2
                    g32.BitBlt.argtypes = (wt.HDC, ctypes.c_int, ctypes.c_int, ctypes.c_int,
                                           ctypes.c_int, wt.HDC, ctypes.c_int, ctypes.c_int,
                                           wt.DWORD)
                    g32.BitBlt(hdc, px, py, P["PW"], P["PH"], mdc, 0, 0, 0x00CC0020)
                g32.SelectObject(mdc, old)
                g32.DeleteDC(mdc)
                u32.EndPaint(hwnd, ps)
                return 0
            if msg == 0x0010:                 # WM_CLOSE
                u32.DestroyWindow(hwnd)
                return 0
            if msg == 0x0002:                 # WM_DESTROY
                u32.PostQuitMessage(0)
                return 0
            return u32.DefWindowProcW(hwnd, msg, wp, lp)
        _splash.proc = WNDPROC(proc)          # keep the callback alive
        _splash.bmp, _splash.bw, _splash.bh = None, 0, 0
        for fn, rt, at in (("BeginPaint", wt.HDC, (wt.HWND, ctypes.c_void_p)),
                           ("EndPaint", wt.BOOL, (wt.HWND, ctypes.c_void_p)),
                           ("LoadImageW", wt.HANDLE, (wt.HINSTANCE, wt.LPCWSTR, wt.UINT,
                                                      ctypes.c_int, ctypes.c_int, wt.UINT)),
                           ("GetClientRect", wt.BOOL, (wt.HWND, ctypes.c_void_p))):
            getattr(u32, fn).restype = rt
            getattr(u32, fn).argtypes = at
        g32.CreateCompatibleDC.restype = wt.HDC
        g32.CreateCompatibleDC.argtypes = (wt.HDC,)
        g32.SelectObject.restype = wt.HGDIOBJ
        g32.SelectObject.argtypes = (wt.HDC, wt.HGDIOBJ)
        g32.StretchBlt.argtypes = (wt.HDC, ctypes.c_int, ctypes.c_int, ctypes.c_int,
                                   ctypes.c_int, wt.HDC, ctypes.c_int, ctypes.c_int,
                                   ctypes.c_int, ctypes.c_int, wt.DWORD)
        g32.DeleteDC.argtypes = (wt.HDC,)
        g32.SetStretchBltMode.argtypes = (wt.HDC, ctypes.c_int)
        if use_snap:
            # The main window's empty glass (premultiplied ARGB sampled by Janki): a 1x1
            # bitmap stretched over the window, alpha kept, so the backdrop shows
            # through exactly as much as it does behind the real window.
            try:
                class BMIH(ctypes.Structure):
                    _fields_ = [("biSize", wt.DWORD), ("biWidth", ctypes.c_long),
                                ("biHeight", ctypes.c_long), ("biPlanes", wt.WORD),
                                ("biBitCount", wt.WORD), ("biCompression", wt.DWORD),
                                ("biSizeImage", wt.DWORD), ("x", ctypes.c_long),
                                ("y", ctypes.c_long), ("u", wt.DWORD), ("i", wt.DWORD)]
                bi = BMIH(ctypes.sizeof(BMIH), 1, -1, 1, 32, 0, 0, 0, 0, 0, 0)
                bits = ctypes.c_void_p()
                g32.CreateDIBSection.restype = wt.HBITMAP
                g32.CreateDIBSection.argtypes = (wt.HDC, ctypes.c_void_p, wt.UINT,
                                                 ctypes.c_void_p, wt.HANDLE, wt.DWORD)
                hb = g32.CreateDIBSection(None, ctypes.byref(bi), 0, ctypes.byref(bits),
                                          None, 0)
                if hb and bits.value:
                    ctypes.c_uint32.from_address(bits.value).value = int(sg["bg_argb"]) & 0xFFFFFFFF
                    _splash.bmp, _splash.bw, _splash.bh = hb, 1, 1
            except Exception as e:
                _jlog("splash glass: " + repr(e))

        def _dib(pw, ph):
            class BMIH(ctypes.Structure):
                _fields_ = [("biSize", wt.DWORD), ("biWidth", ctypes.c_long),
                            ("biHeight", ctypes.c_long), ("biPlanes", wt.WORD),
                            ("biBitCount", wt.WORD), ("biCompression", wt.DWORD),
                            ("biSizeImage", wt.DWORD), ("x", ctypes.c_long),
                            ("y", ctypes.c_long), ("u", wt.DWORD), ("i", wt.DWORD)]
            bi = BMIH(ctypes.sizeof(BMIH), pw, -ph, 1, 32, 0, 0, 0, 0, 0, 0)
            bits = ctypes.c_void_p()
            g32.CreateDIBSection.restype = wt.HBITMAP
            g32.CreateDIBSection.argtypes = (wt.HDC, ctypes.c_void_p, wt.UINT,
                                             ctypes.c_void_p, wt.HANDLE, wt.DWORD)
            hb = g32.CreateDIBSection(None, ctypes.byref(bi), 0, ctypes.byref(bits), None, 0)
            return hb, bits.value

        # Background pixel (premultiplied BGRA): the sampled glass, else clear over the
        # blur, else the solid tint.
        if use_snap:
            bgpx = (int(sg["bg_argb"]) & 0xFFFFFFFF).to_bytes(4, "little")
        elif blur:
            bgpx = bytes((0, 0, 0, 0))
        else:
            bgpx = bytes((b, g, r, 255))
        if not _splash.bmp:
            hb, bp = _dib(1, 1)
            if hb and bp:
                ctypes.memmove(bp, bgpx, 4)
                _splash.bmp, _splash.bw, _splash.bh = hb, 1, 1

        # Loading mark: a white circle, then the Anki star inside it, traced out as the
        # launch progresses. Drawn into our own 32-bit bitmap (plain GDI has no alpha
        # and would punch holes in the blurred glass). The stroke only grows, so each
        # frame stamps just the new stretch of the path.
        _splash.panel = None
        try:
            import math
            sc = float(sg.get("scale", 1.0) or 1.0)
            S = int(round(88 * sc))
            cx = cy = S / 2.0
            R = S / 2.0 - 4 * sc
            rw = 2.0 * sc                                    # stroke half-width
            pts = []
            # The Anki star (the tray icon's outline, src/system/anki-tray.png, stored
            # normalised to [-1, 1]), traced from its top point round to a closed shape.
            Ro = R
            verts = [(cx + Ro * u, cy + Ro * v) for u, v in _STAR]
            for (x0, y0), (x1, y1) in zip(verts, verts[1:]):
                L = math.hypot(x1 - x0, y1 - y0)
                m = max(1, int(L / 0.5))
                for k in range(1, m + 1):
                    pts.append((x0 + (x1 - x0) * k / m, y0 + (y1 - y0) * k / m))
            buf = bytearray(bgpx * (S * S))
            cov = bytearray(S * S)
            hb, bp = _dib(S, S)
            if hb and bp:
                _splash.panel = dict(hb=hb, bits=bp, buf=buf, cov=cov, bg=bgpx, PW=S, PH=S,
                                     pts=pts, done=0, rw=rw, t0=time.time(),
                                     T=max(0.6, float(sg.get("launch_ms", 1900)) / 1000),
                                     # finish before the browser engine starts (it holds
                                     # Python's lock ~0.6 s: the star froze, then jumped)
                                     Tend=(float(sg["trace_end_ms"]) / 1000 - (time.time() - _T_HOOK) - 0.05)
                                     if sg.get("trace_end_ms") else None)
        except Exception as e:
            _jlog("splash panel: " + repr(e))

        def _panel_frame():
            P = _splash.panel
            if not P:
                return
            import math
            t = time.time() - P["t0"]
            dur = P["Tend"] if P.get("Tend") and P["Tend"] > 0.3 else 0.45 * P["T"]
            u = min(1.0, t / dur)                             # done before the stall
            prog = 1 - (1 - u) * (1 - u)                          # ease-out
            target = int(len(P["pts"]) * prog)
            if target <= P["done"]:
                return
            S, rw, buf, cov, bg = P["PW"], P["rw"], P["buf"], P["cov"], P["bg"]
            b0, g0, r0, a0 = bg[0], bg[1], bg[2], bg[3]
            for x, y in P["pts"][P["done"]:target]:
                for yy in range(max(0, int(y - rw - 1)), min(S, int(y + rw + 2))):
                    for xx in range(max(0, int(x - rw - 1)), min(S, int(x + rw + 2))):
                        d = math.hypot(xx + 0.5 - x, yy + 0.5 - y)
                        c = rw + 0.5 - d
                        if c <= 0:
                            continue
                        c = 255 if c >= 1 else int(c * 255)
                        idx = yy * S + xx
                        if c <= cov[idx]:
                            continue
                        cov[idx] = c
                        k = 255 - c                          # white (premultiplied) over bg
                        o = idx * 4
                        buf[o] = c + b0 * k // 255
                        buf[o + 1] = c + g0 * k // 255
                        buf[o + 2] = c + r0 * k // 255
                        buf[o + 3] = c + a0 * k // 255
            P["done"] = target
            ctypes.memmove(P["bits"], bytes(buf), len(buf))
        _panel_frame()

        def _panel_fade(f):
            """Star at opacity f (0..1) over the glass — the fade-out at hand-over."""
            P = _splash.panel
            if not P:
                return
            S, buf, cov, bg = P["PW"], P["buf"], P["cov"], P["bg"]
            b0, g0, r0, a0 = bg[0], bg[1], bg[2], bg[3]
            for idx in range(S * S):
                cv = cov[idx]
                if not cv:
                    continue
                c = int(cv * f)
                k = 255 - c
                o = idx * 4
                buf[o] = c + b0 * k // 255
                buf[o + 1] = c + g0 * k // 255
                buf[o + 2] = c + r0 * k // 255
                buf[o + 3] = c + a0 * k // 255
            ctypes.memmove(P["bits"], bytes(buf), len(buf))

        class WNDCLASSEXW(ctypes.Structure):
            _fields_ = [("cbSize", wt.UINT), ("style", wt.UINT), ("lpfnWndProc", WNDPROC),
                        ("cbClsExtra", ctypes.c_int), ("cbWndExtra", ctypes.c_int),
                        ("hInstance", wt.HINSTANCE), ("hIcon", wt.HICON),
                        ("hCursor", wt.HANDLE), ("hbrBackground", wt.HBRUSH),
                        ("lpszMenuName", wt.LPCWSTR), ("lpszClassName", wt.LPCWSTR),
                        ("hIconSm", wt.HICON)]
        g32.CreateSolidBrush.restype = wt.HBRUSH
        k32.GetModuleHandleW.restype = wt.HINSTANCE
        u32.LoadCursorW.restype = wt.HANDLE
        u32.LoadCursorW.argtypes = (wt.HINSTANCE, ctypes.c_void_p)
        wc = WNDCLASSEXW()
        wc.cbSize = ctypes.sizeof(WNDCLASSEXW)
        wc.lpfnWndProc = _splash.proc
        wc.hInstance = k32.GetModuleHandleW(None)
        wc.hCursor = u32.LoadCursorW(None, ctypes.c_void_p(32514))     # IDC_WAIT
        if rec.get("tint"):
            r, g, b = (int(v) for v in rec["tint"])
        g32.GetStockObject.restype = wt.HBRUSH
        wc.hbrBackground = (g32.GetStockObject(4) if blur          # BLACK_BRUSH
                            else g32.CreateSolidBrush(r | (g << 8) | (b << 16)))
        wc.lpszClassName = "JankiSplash"
        u32.RegisterClassExW(ctypes.byref(wc))
        u32.CreateWindowExW.restype = wt.HWND
        u32.CreateWindowExW.argtypes = (wt.DWORD, wt.LPCWSTR, wt.LPCWSTR, wt.DWORD,
                                        ctypes.c_int, ctypes.c_int, ctypes.c_int,
                                        ctypes.c_int, wt.HWND, wt.HMENU, wt.HINSTANCE,
                                        wt.LPVOID)
        # WS_EX_TOOLWINDOW (no taskbar button) | WS_EX_NOACTIVATE; WS_POPUP
        hwnd = u32.CreateWindowExW(0x80 | 0x08000000, "JankiSplash", "Anki", 0x80000000,
                                   x, y, w, h, None, None, wc.hInstance, None)
        if not hwnd:
            return
        try:                                  # rounded corners like the real window
            pref = ctypes.c_int(int(rec.get("corner", 2)))   # as the main window
            dwm.DwmSetWindowAttribute(wt.HWND(hwnd), 33, ctypes.byref(pref), 4)
            if rec.get("border") is not None:     # DWMWA_BORDER_COLOR, as the main window
                bc = ctypes.c_uint(int(rec["border"]))
                dwm.DwmSetWindowAttribute(wt.HWND(hwnd), 34, ctypes.byref(bc), 4)
            dark = ctypes.c_int(1 if rec.get("dark", True) else 0)
            dwm.DwmSetWindowAttribute(wt.HWND(hwnd), 20, ctypes.byref(dark), 4)
            if blur:
                class MARGINS(ctypes.Structure):
                    _fields_ = [("l", ctypes.c_int), ("r", ctypes.c_int),
                                ("t", ctypes.c_int), ("b", ctypes.c_int)]
                m = MARGINS(-1, -1, -1, -1)
                dwm.DwmExtendFrameIntoClientArea(wt.HWND(hwnd), ctypes.byref(m))
                if rec.get("backdrop") is not None:     # DWMWA_SYSTEMBACKDROP_TYPE
                    kind = ctypes.c_int(int(rec["backdrop"]))
                    dwm.DwmSetWindowAttribute(wt.HWND(hwnd), 38, ctypes.byref(kind), 4)
                elif rec.get("accent"):       # same accent call as dwm._win10_accent
                    class ACCENT(ctypes.Structure):
                        _fields_ = [("s", ctypes.c_int), ("f", ctypes.c_int),
                                    ("c", ctypes.c_uint), ("a", ctypes.c_int)]

                    class WCAD(ctypes.Structure):
                        _fields_ = [("attr", ctypes.c_int), ("data", ctypes.c_void_p),
                                    ("size", ctypes.c_size_t)]
                    ar, ag, ab, aa = (int(v) for v in rec["accent"])
                    acc = ACCENT(4, 2, (aa << 24) | (ab << 16) | (ag << 8) | ar, 0)
                    wd = WCAD(19, ctypes.cast(ctypes.pointer(acc), ctypes.c_void_p),
                              ctypes.sizeof(acc))
                    u32.SetWindowCompositionAttribute(wt.HWND(hwnd), ctypes.byref(wd))
        except Exception:
            pass
        sys._janki_splash_hwnd = hwnd
        sys._janki_splash_rect = (x, y, w, h)       # physical px — the main window too
        u32.ShowWindow(hwnd, 4)               # SW_SHOWNOACTIVATE
        u32.UpdateWindow(hwnd)
        sys._janki_boot.append(("splash shown", time.time()))
        u32.SetTimer(hwnd, 1, 10000, None)    # safety: never outlive 10 s
        if _splash.panel:
            u32.SetTimer(hwnd, 2, 16, None)   # progress bar frames
        u32.InvalidateRect.argtypes = (wt.HWND, ctypes.c_void_p, wt.BOOL)
        msg = wt.MSG()
        while u32.GetMessageW(ctypes.byref(msg), None, 0, 0) > 0:
            if msg.message == 0x8001:         # WM_APP: real window is up — fade out
                if not getattr(_splash, "fade_t0", None):
                    _splash.fade_t0 = time.time()
                    sys._janki_splash_fade_end = _splash.fade_t0 + 0.3   # Janki waits for it
                    u32.KillTimer(hwnd, 2)
                    u32.SetTimer(hwnd, 3, 16, None)
                continue
            if msg.message == 0x0113 and msg.wParam == 3:
                f = 1 - (time.time() - _splash.fade_t0) / 0.3
                if f <= 0 or not _splash.panel:
                    # Star gone; the empty glass stays until Janki swaps in the main
                    # window's own backdrop (dwm.apply hides this in the same step).
                    u32.KillTimer(hwnd, 3)
                    _panel_fade(0)
                    u32.InvalidateRect(hwnd, None, False)
                    continue
                _panel_fade(f * f)
                rc = wt.RECT()
                u32.GetClientRect(hwnd, ctypes.byref(rc))
                P = _splash.panel
                pr = wt.RECT((rc.right - P["PW"]) // 2, (rc.bottom - P["PH"]) // 2,
                             (rc.right + P["PW"]) // 2 + 1, (rc.bottom + P["PH"]) // 2 + 1)
                u32.InvalidateRect(hwnd, ctypes.byref(pr), False)
                continue
            if msg.message == 0x0113:         # WM_TIMER
                if msg.wParam == 2:
                    _panel_frame()
                    rc = wt.RECT()
                    u32.GetClientRect(hwnd, ctypes.byref(rc))
                    P = _splash.panel
                    pr = wt.RECT((rc.right - P["PW"]) // 2, (rc.bottom - P["PH"]) // 2,
                                 (rc.right + P["PW"]) // 2 + 1, (rc.bottom + P["PH"]) // 2 + 1)
                    u32.InvalidateRect(hwnd, ctypes.byref(pr), False)
                    continue
                u32.DestroyWindow(hwnd)
                continue
            u32.TranslateMessage(ctypes.byref(msg))
            u32.DispatchMessageW(ctypes.byref(msg))
        sys._janki_splash_hwnd = None
    except Exception as e:
        _jlog("splash: " + repr(e))


import threading as _jthr
_jthr.Thread(target=_splash, name="janki-splash", daemon=True).start()


SOFTWARE = %r      # True: see-through glass (software rendering); False: fast GPU mode
_FLAGS = %r
# Experimental (env JANKI_SEETHROUGH_GL=1): see-through drawn on the GPU through
# OpenGL, which keeps the window's alpha (Direct3D doesn't). Falls back to the
# software path when unset.
GL = SOFTWARE and os.environ.get("JANKI_SEETHROUGH_GL") == "1"
if GL:
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = (
        "--disable-features=CalculateNativeWinOcclusion --disable-renderer-backgrounding "
        "--disable-backgrounding-occluded-windows")
elif SOFTWARE:
    # See-through needs exactly these flags; a user-level QTWEBENGINE_CHROMIUM_FLAGS
    # (GPU tuning for Fast mode) must not replace them.
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = _FLAGS
else:
    os.environ.setdefault("QTWEBENGINE_CHROMIUM_FLAGS", _FLAGS)
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
                sys._janki_boot.append(("QApplication created", time.time()))
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
                if GL:
                    QQuickWindow.setGraphicsApi(QSGRendererInterface.GraphicsApi.OpenGL)
                    _jlog("Qt Quick -> OpenGL (experimental see-through GPU)")
                else:
                    QQuickWindow.setGraphicsApi(QSGRendererInterface.GraphicsApi.Software)
                    _jlog("Qt Quick -> software renderer")
            except Exception as e:
                _jlog("software renderer failed: %%r" %% (e,))
            super().__init__(*a, **k)
            sys._janki_boot.append(("QApplication created", time.time()))
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
            sys._janki_boot.append(("importing aqt", time.time()))
            _run(module)
            sys._janki_boot.append(("aqt imported", time.time()))
            try:
                _patch(module)
            except Exception:
                pass
        spec.loader.exec_module = exec_module
        return spec


sys.meta_path.insert(0, _AfterAqt())


def _time_main(mod):
    """Timing marks for AnkiQt's start-up steps (each setup* method + __init__)."""
    cls = getattr(mod, "AnkiQt", None)
    if cls is None:
        return

    def wrap(name, fn):
        def w(*a, **k):
            t = time.time()
            try:
                return fn(*a, **k)
            finally:
                d = time.time() - t
                if d >= 0.015:
                    sys._janki_boot.append(("AnkiQt.%%s (%%dms)" %% (name, d * 1000), time.time()))
        return w
    for name in list(vars(cls)):
        if name == "__init__" or name.startswith("setup") or name in ("loadProfile", "_loadCollection"):
            fn = getattr(cls, name)
            if callable(fn):
                setattr(cls, name, wrap(name, fn))

    # The stand-in window is already up: no Windows open animation (zoom/fade) for the
    # main window's first show — it read as the window re-opening over it. Restored
    # after a few seconds so minimise/restore animate as usual.
    orig_smw = getattr(cls, "setupMainWindow", None)
    if orig_smw is not None:
        def setupMainWindow_quiet(self, *a, **k):
            r = orig_smw(self, *a, **k)
            if getattr(sys, "_janki_splash_hwnd", None):
                try:
                    import ctypes
                    from aqt.qt import QObject, QEvent, QTimer
                    dwm = ctypes.WinDLL("dwmapi")

                    def _set(w, v):
                        val = ctypes.c_int(v)
                        dwm.DwmSetWindowAttribute(ctypes.c_void_p(int(w.winId())), 3,
                                                  ctypes.byref(val), 4)   # TRANSITIONS_FORCEDISABLED

                    def _close_splash():
                        h = getattr(sys, "_janki_splash_hwnd", None)
                        if h:
                            ctypes.windll.user32.PostMessageW(ctypes.c_void_p(h), 0x8001, 0, 0)

                    class _FirstShow(QObject):
                        # Qt sends Show before the native window becomes visible, and
                        # after any frameless re-creation of it — set the flag then.
                        def eventFilter(self_, obj, ev):
                            if ev.type() == QEvent.Type.Show:
                                obj.removeEventFilter(self_)
                                # Janki hides Anki's menu bar (File/Edit/Tools…) behind
                                # Alt, but only once it starts up — after this first
                                # show, so the bar flashed at the top. Hide it now.
                                try:
                                    obj.menuBar().hide()
                                except Exception:
                                    pass
                                # Put the window exactly where the stand-in is before it
                                # becomes visible: Janki restores the saved position only
                                # at start-up (after this), so Windows first placed it on
                                # the screen under the mouse.
                                rect = getattr(sys, "_janki_splash_rect", None)
                                if rect and not (obj.isMaximized() or obj.isFullScreen()):
                                    try:
                                        ctypes.windll.user32.SetWindowPos(
                                            ctypes.c_void_p(int(obj.winId())), None,
                                            int(rect[0]), int(rect[1]), int(rect[2]),
                                            int(rect[3]), 0x0004 | 0x0010)   # NOZORDER|NOACTIVATE
                                    except Exception:
                                        pass
                                _set(obj, 1)
                                QTimer.singleShot(4000, lambda: _set(obj, 0))
                                # The real window is see-through: the stand-in's panel
                                # and its second blur showed through it until load
                                # finished, then vanished (the flicker). Close it once
                                # the real window's first frame is up.
                                QTimer.singleShot(30, _close_splash)   # star fades out
                            return False
                    self._jk_first_show = _FirstShow(self)
                    self.installEventFilter(self._jk_first_show)
                except Exception:
                    pass
            return r
        cls.setupMainWindow = setupMainWindow_quiet

    # Sound: Anki starts its mpv audio player during start-up (~130 ms on the main
    # thread before the window shows). Nothing plays until a card does, so start it
    # 2 s later instead.
    orig_sound = getattr(cls, "setup_sound", None)
    if orig_sound is not None:
        def setup_sound_later(self, *a, **k):
            try:
                from aqt.qt import QTimer
                QTimer.singleShot(2000, lambda: orig_sound(self, *a, **k))
                sys._janki_boot.append(("sound setup deferred 2s", time.time()))
            except Exception:
                return orig_sound(self, *a, **k)
        cls.setup_sound = setup_sound_later

    # Web view creation timing (the browser engine starts with the first one).
    try:
        import aqt.webview as _wv
        oinit = _wv.AnkiWebView.__init__

        def winit(self, *a, **k):
            t = time.time()
            oinit(self, *a, **k)
            sys._janki_boot.append(("AnkiWebView %%s created (%%dms)" %% (
                k.get("kind", a[1] if len(a) > 1 else "?"), (time.time() - t) * 1000), time.time()))
        _wv.AnkiWebView.__init__ = winit
    except Exception:
        pass


class _AfterMain:
    def find_spec(self, name, path=None, target=None):
        if name != "aqt.main":
            return None
        import importlib.util
        sys.meta_path.remove(self)
        spec = importlib.util.find_spec("aqt.main")
        if spec is None or spec.loader is None:
            return None
        run = spec.loader.exec_module

        def exec_module(module, _run=run):
            t = time.time()
            _run(module)
            sys._janki_boot.append(("aqt.main imported (%%dms)" %% ((time.time() - t) * 1000), time.time()))
            try:
                _time_main(module)
            except Exception:
                pass
        spec.loader.exec_module = exec_module
        return spec


sys.meta_path.insert(0, _AfterMain())
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
