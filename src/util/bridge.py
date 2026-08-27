"""ctypes/ObjC + SkyLight bridges (no PyObjC)."""

import ctypes
from ctypes import (
    c_void_p, c_char_p, c_int, c_double, Structure,
)


# ---------------------------------------------------------------------------
# ObjC runtime bridge (ctypes; no PyObjC)
# ---------------------------------------------------------------------------

class NSPoint(Structure):
    _fields_ = [("x", c_double), ("y", c_double)]


class NSSize(Structure):
    _fields_ = [("width", c_double), ("height", c_double)]


class NSRect(Structure):
    _fields_ = [("origin", NSPoint), ("size", NSSize)]


def _bridge():
    libobjc = ctypes.cdll.LoadLibrary("/usr/lib/libobjc.dylib")
    libobjc.objc_getClass.restype = c_void_p
    libobjc.objc_getClass.argtypes = [c_char_p]
    libobjc.sel_registerName.restype = c_void_p
    libobjc.sel_registerName.argtypes = [c_char_p]

    def msg(restype, receiver, selector, argtypes=(), args=()):
        fn = libobjc.objc_msgSend
        fn.restype = restype
        fn.argtypes = [c_void_p, c_void_p, *argtypes]
        sel = libobjc.sel_registerName(
            selector if isinstance(selector, bytes) else selector.encode()
        )
        return fn(receiver, sel, *args)

    def cls(name):
        return libobjc.objc_getClass(name if isinstance(name, bytes) else name.encode())

    return msg, cls


# --- Terminal-style window background blur (private CGS/SkyLight API) ---------
# This is the same mechanism macOS Terminal/iTerm use: blur the desktop behind
# the window at an arbitrary radius. Works with our transparent window.

_skylight = None


def _cgs():
    global _skylight
    if _skylight is not None:
        return _skylight
    for path in (
        "/System/Library/PrivateFrameworks/SkyLight.framework/SkyLight",
        "/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics",
    ):
        try:
            lib = ctypes.cdll.LoadLibrary(path)
            if hasattr(lib, "CGSSetWindowBackgroundBlurRadius"):
                lib.CGSMainConnectionID.restype = c_int
                lib.CGSSetWindowBackgroundBlurRadius.argtypes = [c_int, c_int, c_int]
                lib.CGSSetWindowBackgroundBlurRadius.restype = c_int
                _skylight = lib
                return lib
        except OSError:
            continue
    return None
