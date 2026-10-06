"""macOS: make double-clicking .jank / .qb / .rp in Finder open Anki (Janki then imports
it — see features/file_open.py). Anki.app only declares .apkg/.colpkg, so these have
no handler on a fresh Mac. Uses Launch Services on the extension's dynamic UTI; only
claims extensions with NO default app, so a user's own choice is never overridden."""
import ctypes
import ctypes.util

from ...util.config import log

_EXTS = ("jank", "qb", "rp")
_UTF8 = 0x08000100
_ROLES_ALL = 0xFFFFFFFF


def _libs():
    cf = ctypes.cdll.LoadLibrary(ctypes.util.find_library("CoreFoundation"))
    cs = ctypes.cdll.LoadLibrary(ctypes.util.find_library("CoreServices"))
    cf.CFStringCreateWithCString.restype = ctypes.c_void_p
    cf.CFStringCreateWithCString.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_uint32]
    cf.CFStringGetCString.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_long, ctypes.c_uint32]
    cf.CFBundleGetMainBundle.restype = ctypes.c_void_p
    cf.CFBundleGetIdentifier.restype = ctypes.c_void_p
    cf.CFBundleGetIdentifier.argtypes = [ctypes.c_void_p]
    cs.UTTypeCreatePreferredIdentifierForTag.restype = ctypes.c_void_p
    cs.UTTypeCreatePreferredIdentifierForTag.argtypes = [ctypes.c_void_p] * 3
    cs.LSSetDefaultRoleHandlerForContentType.argtypes = [ctypes.c_void_p, ctypes.c_uint32, ctypes.c_void_p]
    cs.LSCopyDefaultRoleHandlerForContentType.restype = ctypes.c_void_p
    cs.LSCopyDefaultRoleHandlerForContentType.argtypes = [ctypes.c_void_p, ctypes.c_uint32]
    return cf, cs


def register_file_types() -> bool:
    """True once every type opens in Anki or already has an app the user picked."""
    try:
        cf, cs = _libs()

        def S(x):
            return cf.CFStringCreateWithCString(None, x.encode(), _UTF8)

        def P(ref):
            if not ref:
                return None
            b = ctypes.create_string_buffer(512)
            cf.CFStringGetCString(ref, b, 512, _UTF8)
            return b.value.decode()

        bid = P(cf.CFBundleGetIdentifier(cf.CFBundleGetMainBundle()))
        if not bid or bid.startswith("org.python"):
            return False                  # dev run from a bare interpreter: no app to point at
        for ext in _EXTS:
            uti = cs.UTTypeCreatePreferredIdentifierForTag(
                S("public.filename-extension"), S(ext), None)
            if P(cs.LSCopyDefaultRoleHandlerForContentType(uti, _ROLES_ALL)):
                continue                  # something already opens it — leave it
            err = cs.LSSetDefaultRoleHandlerForContentType(uti, _ROLES_ALL, S(bid))
            if err:
                log("mac assoc .%s: %s" % (ext, err))
        return True
    except Exception as e:
        log("mac file associations: %s" % e)
        return False
