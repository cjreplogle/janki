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
       "page": 0.14, "reveal": 0.12, "_default": 0.24}


def save(name, buf):
    buf = reverb(buf, WET.get(name, WET.get("_default", 0.24)))
    peak = max(1e-9, max(abs(x) for x in buf))
    g = min(1.0, 0.85 / peak)
    fade = int(SR * 0.004)
    os.makedirs(os.path.join(OUT, BANK), exist_ok=True)
    with wave.open(os.path.join(OUT, BANK, name + ".wav"), "wb") as w:
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



def swish(dur=0.11, vol=0.04, seed=7):
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




def square(f0, f1, dur, vol=0.12, decay=30.0, duty=0.5):
    """Retro pulse wave (8-bit handheld style), gently band-limited by a 1-pole LP."""
    n = int(SR * dur); out = []; ph = 0.0; lp = 0.0
    for k in range(n):
        t = k / SR
        f = f0 + (f1 - f0) * min(1.0, t / dur)
        ph = (ph + f / SR) % 1.0
        lp += 0.35 * ((1.0 if ph < duty else -1.0) - lp)
        out.append(lp * min(1.0, t / 0.001) * math.exp(-decay * t) * vol)
    return out


C5, E5, G5, C6, A4 = 523.25, 659.25, 783.99, 1046.5, 440.0
BANK = "mallet"


def slides():
    """Noise slides shared by every bank (no tone, so they suit all of them)."""
    save("reveal",  swish())
    save("unfold",  sweep(0.07, 0.06, 0.25, 0.55, 11))
    save("fold",    sweep(0.07, 0.06, 0.55, 0.25, 12))
    save("page",    sweep(0.15, 0.09, 0.03, 0.10, 13, 1.5))


def bank(name, voice, move, wet_scale=1.0):
    """One full set. voice(f, dur, vol, decay) makes a single note."""
    global BANK
    BANK = name
    for k in list(WET):
        WET[k] = WET[k]
    save("move",   move)
    save("select", mix((0, voice(1175, 0.05, 0.2, 60)), (0.03, voice(1568, 0.08, 0.2, 45))))
    save("back",   mix((0, voice(988, 0.05, 0.2, 60)), (0.03, voice(740, 0.08, 0.2, 45))))
    save("open",   mix((0, voice(C5, 0.08, 0.2, 38)), (0.045, voice(G5, 0.12, 0.2, 30))))
    save("again",  voice(C5, 0.1, 0.2, 38))       # the ratings climb C – E – G – C
    save("hard",   voice(E5, 0.1, 0.2, 38))
    save("good",   voice(G5, 0.1, 0.2, 38))
    save("easy",   voice(C6, 0.11, 0.19, 34))
    save("right",  mix((0, voice(C5, 0.07, 0.19, 45)), (0.04, voice(E5, 0.07, 0.19, 45)),
                       (0.08, voice(G5, 0.14, 0.19, 28))))
    save("wrong",  voice(A4, 0.12, 0.19, 30))
    # settings open: a soft upward swish under a quick rising pair
    # (kept subtle: lower notes, dark soft swish, about half the level of the rest)
    save("settings", mix((0, sweep(0.12, 0.02, 0.04, 0.14, 21)),
                         (0.02, voice(392, 0.06, 0.075, 50)), (0.07, voice(523, 0.1, 0.075, 36))))
    # practice open: a bright little flourish — three quick rising notes + a shimmer
    save("practice", mix((0, voice(988, 0.05, 0.16, 55)), (0.045, voice(1319, 0.05, 0.16, 55)),
                       (0.09, voice(1760, 0.12, 0.15, 30)), (0.09, sweep(0.14, 0.03, 0.45, 0.6, 31))))
    # stats open: the same shape, lower and darker
    save("stats",  mix((0, voice(392, 0.06, 0.16, 50)), (0.05, voice(523, 0.06, 0.16, 50)),
                       (0.10, voice(659, 0.14, 0.15, 28)), (0.10, sweep(0.14, 0.03, 0.12, 0.22, 32))))
    # exit (quitting Anki): a soft falling swish under two descending notes
    save("exit",   mix((0, sweep(0.16, 0.035, 0.35, 0.06, 41)),
                       (0.0, voice(784, 0.07, 0.15, 45)), (0.07, voice(392, 0.16, 0.15, 24))))
    # time's up (card-timer flare): a low double "bump" — same note twice, quick
    save("timeup", mix((0, voice(220, 0.07, 0.24, 45)), (0.085, voice(220, 0.1, 0.24, 35))))
    slides()


tick = click(0.007, 0.16)
# Mallet (default): rounded "pok" taps — menu-UI style.
bank("mallet", pok, tick)
# Chime: clean bells (pure sine + faint octave).
bank("chime", lambda f, d, v, k: bell(f, d, v * 0.85, k * 0.9), tick)
# Soft: muted taps with a hint of click — the quietest set.
bank("soft", lambda f, d, v, k: tap(f * 0.5, d, v * 0.8, k), click(0.006, 0.12))
# Retro: 8-bit pulse blips, like an old handheld.
_saved = dict(WET)
for _k in WET:
    WET[_k] = WET[_k] * 0.4                      # drier
bank("retro", lambda f, d, v, k: square(f, f, d, v * 0.55, k, 0.25),
     square(2000, 2000, 0.012, 0.05, 120))
WET.clear(); WET.update(_saved)
print("ok", sorted(os.listdir(OUT)))
