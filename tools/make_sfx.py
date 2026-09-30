"""Generates Janki's UI sound effects (original, synthesized — no samples).

Soft, short, 'console menu' style: sine/triangle tones with fast attack and
exponential decay, a touch of pitch glide, plus a tiny filtered click for ticks.
Run: python3 tools/make_sfx.py  → assets/sounds/*.wav (44.1 kHz, mono, 16-bit)."""
import math, os, random, struct, wave

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "sounds")


def tone(f0, f1, dur, vol=0.5, decay=18.0, shape="sine", attack=0.003):
    n = int(SR * dur); out = []
    ph = 0.0
    for i in range(n):
        t = i / SR
        f = f0 + (f1 - f0) * min(1.0, t / dur)
        ph += 2 * math.pi * f / SR
        if shape == "tri":
            s = 2 / math.pi * math.asin(math.sin(ph))
        else:
            s = math.sin(ph) + 0.18 * math.sin(2 * ph)      # a little warmth
        env = min(1.0, t / attack) * math.exp(-decay * t)
        out.append(s * env * vol)
    return out


def click(dur=0.012, vol=0.25, seed=3):
    rnd = random.Random(seed); n = int(SR * dur); out = []; lp = 0.0
    for i in range(n):
        lp += 0.35 * (rnd.uniform(-1, 1) - lp)               # soft low-passed tick
        out.append(lp * math.exp(-i / (SR * dur / 5)) * vol)
    return out


def mix(*parts):
    """parts: (offset_seconds, samples)"""
    n = max(int(o * SR) + len(s) for o, s in parts)
    buf = [0.0] * n
    for o, s in parts:
        k = int(o * SR)
        for i, v in enumerate(s):
            buf[k + i] += v
    return buf


def save(name, buf):
    peak = max(1e-9, max(abs(x) for x in buf))
    g = min(1.0, 0.85 / peak)
    fade = int(SR * 0.004)
    with wave.open(os.path.join(OUT, name + ".wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        frames = bytearray()
        for i, x in enumerate(buf):
            if i > len(buf) - fade:
                x *= (len(buf) - i) / fade
            frames += struct.pack("<h", int(max(-1, min(1, x * g)) * 32767))
        w.writeframes(bytes(frames))


os.makedirs(OUT, exist_ok=True)
# Deliberately understated: muted wooden clicks/taps (low-passed, very short, low
# level) rather than beeps — present, but easy to ignore.
def tap(f, dur=0.05, vol=0.22, decay=60.0):
    return mix((0, click(0.006, vol * 0.6)), (0, tone(f, f * 0.97, dur, vol, decay)))


save("move",    click(0.007, 0.16))
save("select",  tap(520, 0.06, 0.24, 55))
save("back",    tap(390, 0.06, 0.22, 55))
save("open",    mix((0, tap(440, 0.05, 0.2, 60)), (0.07, tap(587, 0.08, 0.2, 45))))
save("reveal",  tap(660, 0.05, 0.14, 70))
save("again",   tap(300, 0.07, 0.2, 45))
save("hard",    tap(392, 0.06, 0.18, 55))
save("good",    tap(494, 0.06, 0.18, 55))
save("easy",    mix((0, tap(494, 0.05, 0.16, 60)), (0.06, tap(659, 0.07, 0.16, 50))))
save("right",   mix((0, tap(523, 0.05, 0.2, 55)), (0.07, tap(784, 0.09, 0.2, 40))))
save("wrong",   tap(262, 0.09, 0.22, 35))
print("ok", sorted(os.listdir(OUT)))
