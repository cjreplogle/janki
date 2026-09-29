"""Windows virtual-key codes → macOS virtual keycodes.

Everything downstream of the key hook (keytap handlers, hotkey tables, the Settings
recorder) speaks Mac keycodes, so Windows input is translated once, here.
"""
VK_TO_KC = {}
_LETTERS = {"A": 0, "B": 11, "C": 8, "D": 2, "E": 14, "F": 3, "G": 5, "H": 4, "I": 34,
            "J": 38, "K": 40, "L": 37, "M": 46, "N": 45, "O": 31, "P": 35, "Q": 12,
            "R": 15, "S": 1, "T": 17, "U": 32, "V": 9, "W": 13, "X": 7, "Y": 16, "Z": 6}
for _ch, _kc in _LETTERS.items():
    VK_TO_KC[ord(_ch)] = _kc
for _d, _kc in zip("0123456789", (29, 18, 19, 20, 21, 23, 22, 26, 28, 25)):
    VK_TO_KC[ord(_d)] = _kc
VK_TO_KC.update({
    0x20: 49,   # Space
    0x09: 48,   # Tab
    0x1B: 53,   # Esc
    0x08: 51,   # Backspace (Mac "Delete")
    0x2E: 117,  # Delete (Mac "Forward Delete")
    0x0D: 36,   # Return / Enter
    0x25: 123, 0x26: 126, 0x27: 124, 0x28: 125,        # ← ↑ → ↓
    0xBB: 24, 0xBD: 27,                                # = -
    0xDB: 33, 0xDD: 30, 0xDC: 42,                      # [ ] \
    0xBA: 41, 0xDE: 39, 0xBC: 43, 0xBE: 47, 0xBF: 44,  # ; ' , . /
    0xC0: 50,   # ` (backtick)
    0x24: 115, 0x23: 119, 0x21: 116, 0x22: 121,        # Home End PgUp PgDn
})
for _i, _kc in enumerate((122, 120, 99, 118, 96, 97, 98, 100, 101, 109, 103, 111)):
    VK_TO_KC[0x70 + _i] = _kc                          # F1–F12

KC_TO_VK = {v: k for k, v in VK_TO_KC.items()}


def vk_to_kc(vk: int):
    return VK_TO_KC.get(int(vk))
