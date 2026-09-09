/**
 * Web Audio synthesis for the typewriter keystroke sound.
 * No audio files — every sound is generated at runtime.
 *
 * Per keystroke: a ~70ms noise buffer, shaped by (random*2-1) * (1 - i/len)^3.4,
 * run through a bandpass filter (2000-2900Hz, Q 1.3) with gain .11 decaying
 * exponentially over 55ms, layered with a triangle oscillator at 190-230Hz,
 * gain .055, 50ms decay. Spaces are heavier: bandpass 1400Hz, gain .20,
 * oscillator 132Hz.
 *
 * On line completion, a carriage-return bell: sines at 1046Hz (gain .06) and
 * 1571Hz (gain .035), 6ms attack, 1.1s exponential decay.
 */

type StrikeKind = "key" | "space";

export class TypewriterAudio {
  private ctx: AudioContext | null = null;
  private noise: AudioBuffer | null = null;
  private bus: GainNode | null = null;
  private enabled = false;

  setEnabled(value: boolean) {
    this.enabled = value;
  }

  isEnabled() {
    return this.enabled;
  }

  init(): AudioContext | null {
    if (this.ctx) return this.ctx;
    if (typeof window === "undefined") return null;
    const AC =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;

    const ctx = new AC();
    this.ctx = ctx;

    const len = Math.floor(ctx.sampleRate * 0.07);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.4);
    }
    this.noise = buffer;

    const bus = ctx.createGain();
    bus.gain.value = 0.9;
    bus.connect(ctx.destination);
    this.bus = bus;

    return ctx;
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  strike(kind: StrikeKind) {
    if (!this.enabled || !this.ctx || !this.noise || !this.bus) return;
    if (this.ctx.state !== "running") return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const heavy = kind === "space";

    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = heavy ? 1400 : 2000 + Math.random() * 900;
    bp.Q.value = 1.3;
    const g = ctx.createGain();
    g.gain.setValueAtTime(heavy ? 0.2 : 0.11, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.055);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.bus);
    src.start(t);
    src.stop(t + 0.08);

    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(heavy ? 132 : 190 + Math.random() * 40, t);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.055, t);
    og.gain.exponentialRampToValueAtTime(0.0005, t + 0.05);
    o.connect(og);
    og.connect(this.bus);
    o.start(t);
    o.stop(t + 0.07);
  }

  bell() {
    if (!this.enabled || !this.ctx || !this.bus) return;
    if (this.ctx.state !== "running") return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    [1046, 1571].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(f, t);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(i ? 0.035 : 0.06, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0004, t + 1.1);
      o.connect(g);
      g.connect(this.bus!);
      o.start(t);
      o.stop(t + 1.2);
    });
  }

  close() {
    if (this.ctx && this.ctx.close) {
      this.ctx.close().catch(() => {});
    }
    this.ctx = null;
    this.noise = null;
    this.bus = null;
  }
}
