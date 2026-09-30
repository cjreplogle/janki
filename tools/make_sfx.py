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
save("move",    mix((0, click()), (0, tone(1850, 1750, 0.045, 0.22, 70))))
save("select",  mix((0, tone(740, 760, 0.06, 0.45, 30)), (0.045, tone(1110, 1120, 0.09, 0.4, 28))))
save("back",    mix((0, tone(990, 980, 0.05, 0.4, 32)), (0.04, tone(660, 650, 0.09, 0.38, 30))))
save("open",    mix((0, tone(523, 530, 0.07, 0.35, 22)), (0.05, tone(784, 790, 0.08, 0.35, 22)),
                    (0.10, tone(1047, 1050, 0.16, 0.32, 16))))
save("reveal",  tone(880, 1320, 0.09, 0.33, 26, "tri"))
save("again",   tone(330, 300, 0.12, 0.45, 20, "tri"))
save("hard",    tone(440, 435, 0.1, 0.42, 22))
save("good",    mix((0, tone(659, 660, 0.12, 0.42, 20))))
save("easy",    mix((0, tone(784, 790, 0.08, 0.4, 24)), (0.06, tone(1175, 1180, 0.16, 0.38, 18))))
save("right",   mix((0, tone(659, 660, 0.07, 0.38, 26)), (0.06, tone(880, 880, 0.07, 0.38, 26)),
                    (0.12, tone(1319, 1320, 0.18, 0.36, 14))))
save("wrong",   mix((0, tone(392, 385, 0.1, 0.4, 20, "tri")), (0.09, tone(311, 300, 0.16, 0.38, 16, "tri"))))
print("ok", sorted(os.listdir(OUT)))
