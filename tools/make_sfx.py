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


def reverb(buf, wet=0.22, room=0.72, tail=0.28):
    """Small soft room (Schroeder: 4 damped combs + 2 allpasses), mixed in lightly."""
    n = len(buf) + int(SR * tail)
    dry = buf + [0.0] * (n - len(buf))
    out = [0.0] * n
    for d_ms, g in ((29.7, room), (37.1, room * 0.97), (41.1, room * 0.94), (43.7, room * 0.9)):
        d = int(SR * d_ms / 1000); line = [0.0] * n; lp = 0.0
        for i in range(n):
            y = line[i - d] if i >= d else 0.0
            lp = 0.6 * lp + 0.4 * y                   # damping: darker, softer tail
            line[i] = dry[i] + g * lp
            out[i] += y * 0.25
    for d_ms, g in ((5.0, 0.7), (1.7, 0.7)):
        d = int(SR * d_ms / 1000); prev_in = [0.0] * n; res = [0.0] * n
        for i in range(n):
            xi = out[i]; xd = out[i - d] if i >= d else 0.0; yd = res[i - d] if i >= d else 0.0
            res[i] = -g * xi + xd + g * yd
        out = res
    return [dry[i] + wet * out[i] for i in range(n)]


# per-sound reverb amount (navigation stays crisp; chimes get a bit more space)
WET = {"move": 0.08, "select": 0.14, "back": 0.14, "fold": 0.10, "unfold": 0.10,
       "page": 0.14, "reveal": 0.12}


def save(name, buf):
    buf = reverb(buf, WET.get(name, 0.24))
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


def tap(f, dur=0.05, vol=0.22, decay=60.0):
    return mix((0, click(0.006, vol * 0.6)), (0, tone(f, f * 0.97, dur, vol, decay)))



def bell(f, dur, vol=0.2, decay=10.0):
    n = int(SR * dur); out = []; ph = 0.0
    for k in range(n):
        t = k / SR
        ph += 2 * math.pi * f / SR
        s_ = math.sin(ph) + 0.12 * math.sin(2 * ph) + 0.04 * math.sin(3 * ph)
        out.append(s_ * min(1.0, t / 0.006) * math.exp(-decay * t) * vol)
    return out



def pok(f, dur=0.09, vol=0.2, decay=38.0):
    """Soft rounded mallet tap (menu-UI style): fundamental + a fast-dying 4th partial
    (the woody 'tok'), 2 ms attack, quick decay — no harsh click."""
    n = int(SR * dur); out = []; p1 = p4 = 0.0
    for k in range(n):
        t = k / SR
        p1 += 2 * math.pi * f / SR
        p4 += 2 * math.pi * f * 3.98 / SR
        s_ = math.sin(p1) + 0.35 * math.sin(p4) * math.exp(-t * 140)
        out.append(s_ * min(1.0, t / 0.002) * math.exp(-decay * t) * vol)
    return out



def swish(dur=0.11, vol=0.07, seed=7):
    rnd = random.Random(seed); n = int(SR * dur); out = []; lp = 0.0; lp2 = 0.0
    for k in range(n):
        t = k / n
        a = 0.04 + 0.22 * t                       # filter opens as it slides
        lp += a * (rnd.uniform(-1, 1) - lp)
        lp2 += a * (lp - lp2)
        env = math.sin(math.pi * t) ** 2          # smooth in and out
        out.append(lp2 * env * vol * 6)
    return out



def sweep(dur, vol, a0, a1, seed, shape=2.0):
    """Filtered-noise slide whose brightness moves a0 → a1 (0..1 filter coefficient)."""
    rnd = random.Random(seed); n = int(SR * dur); out = []; lp = lp2 = 0.0
    for k in range(n):
        t = k / n
        a = a0 + (a1 - a0) * t
        lp += a * (rnd.uniform(-1, 1) - lp)
        lp2 += a * (lp - lp2)
        out.append(lp2 * (math.sin(math.pi * t) ** shape) * vol * 6)
    return out



C5, E5, G5, C6, A4 = 523.25, 659.25, 783.99, 1046.5, 440.0
os.makedirs(OUT, exist_ok=True)

# Navigation (unchanged): a barely-there tick for moving.
save("move",    click(0.007, 0.16))

# Menu-UI mallet set — rounded "pok" taps, quick, with a little room (see WET).
save("select",  mix((0, pok(1175, 0.05, 0.2, 60)), (0.03, pok(1568, 0.08, 0.2, 45))))
save("back",    mix((0, pok(988, 0.05, 0.2, 60)), (0.03, pok(740, 0.08, 0.2, 45))))
save("open",    mix((0, pok(C5, 0.08, 0.2)), (0.045, pok(G5, 0.12, 0.2, 30))))
save("again",   pok(C5, 0.1, 0.2))           # the ratings climb C – E – G – C
save("hard",    pok(E5, 0.1, 0.2))
save("good",    pok(G5, 0.1, 0.2))
save("easy",    pok(C6, 0.11, 0.19, 34))
save("right",   mix((0, pok(C5, 0.07, 0.19, 45)), (0.04, pok(E5, 0.07, 0.19, 45)),
                    (0.08, pok(G5, 0.14, 0.19, 28))))
save("wrong",   pok(A4, 0.12, 0.19, 30))

# Slides (noise, no tone): reveal = soft mid swish; fold/unfold = short high rustle
# sweeping up/down; page = fuller low whoosh.
save("reveal",  swish())
save("unfold",  sweep(0.07, 0.06, 0.25, 0.55, 11))
save("fold",    sweep(0.07, 0.06, 0.55, 0.25, 12))
save("page",    sweep(0.15, 0.09, 0.03, 0.10, 13, 1.5))
print("ok", sorted(os.listdir(OUT)))
