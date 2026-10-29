// Procedural Web Audio API Foley synthesizer for tactile micro-interactions
// Strict singleton implementation with zero-leak node disconnection strategy

export class SoundEngine {
  private static instance: SoundEngine | null = null;
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sfx_enabled");
      this.enabled = saved !== null ? saved === "true" : true;
    }
  }

  public static getInstance(): SoundEngine {
    if (!SoundEngine.instance) {
      SoundEngine.instance = new SoundEngine();
    }
    return SoundEngine.instance;
  }

  /**
   * Lazily initializes a single AudioContext per browser session.
   * Handles autoplay policies by only resuming on explicit user action.
   */
  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("sfx_enabled", String(this.enabled));
    }
    if (this.enabled) {
      this.playMechanicalSwitch();
    }
    return this.enabled;
  }

  // 1. Crisp Mechanical Keyboard Switch Click (for Nav tabs & toggles)
  public playMechanicalSwitch() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Click transient (sharp pop)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.025);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.035);

      // Bottom-out thud (resonance)
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = "sine";
      sub.frequency.setValueAtTime(180, now + 0.008);
      sub.frequency.exponentialRampToValueAtTime(60, now + 0.04);

      subGain.gain.setValueAtTime(0.05, now + 0.008);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      sub.connect(subGain);
      subGain.connect(ctx.destination);

      sub.onended = () => {
        try {
          sub.disconnect();
          subGain.disconnect();
        } catch {}
      };

      sub.start(now + 0.008);
      sub.stop(now + 0.05);
    } catch {
      // Audio autoplay policy or hardware restriction
    }
  }

  // 2. Soft Paper Rustle / Page Turn (for opening blog posts & reading notes)
  public playPaperRustle() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const bufferSize = Math.floor(ctx.sampleRate * 0.08);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Filtered pink-ish noise for delicate paper friction
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.onended = () => {
        try {
          noise.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch {}
      };

      noise.start(now);
      noise.stop(now + 0.08);
    } catch {
      // Audio autoplay policy or hardware restriction
    }
  }

  // 3. Deep, Warm Synth Hum (for hovering over primary buttons / key badges)
  public playSynthHum() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, now); // A2 warm drone

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, now);
      filter.frequency.exponentialRampToValueAtTime(160, now + 0.12);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio autoplay policy or hardware restriction
    }
  }

  // 4. Charging Hum for "Hold to Dispatch"
  public playChargeStep(progress: number) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const baseFreq = 220 + progress * 440; // Rises from 220Hz to 660Hz
      osc.frequency.setValueAtTime(baseFreq, now);

      gain.gain.setValueAtTime(0.02 + progress * 0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Audio autoplay policy or hardware restriction
    }
  }

  // 5. High-Impact Launch / Success Chime (for message fired)
  public playDispatchSuccess() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [587.33, 739.99, 880, 1174.66].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.06, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.22);
      });
    } catch {
      // Audio autoplay policy or hardware restriction
    }
  }

  // Backward-compatible aliases
  public playClick() {
    this.playMechanicalSwitch();
  }

  public playHover() {
    this.playSynthHum();
  }

  public playSuccess() {
    this.playDispatchSuccess();
  }
}

export const sfx = SoundEngine.getInstance();
