// Procedural Web Audio API sound effects & cheerful island background music

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmPlaying = false;
  private bgmTimer: number | null = null;
  private step = 0;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.14,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;
    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  public playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.07);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playCorrect() {
    this.playTone(523.25, 0.12, 'triangle', 0.16, 0); // C5
    this.playTone(659.25, 0.12, 'triangle', 0.16, 0.08); // E5
    this.playTone(783.99, 0.22, 'triangle', 0.18, 0.16); // G5
    this.playTone(1046.5, 0.28, 'sine', 0.14, 0.24); // C6
  }

  public playWrong() {
    this.playTone(280, 0.16, 'sawtooth', 0.08, 0);
    this.playTone(210, 0.24, 'sawtooth', 0.08, 0.14);
  }

  public playFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    const times = [0, 0.11, 0.22, 0.34, 0.5, 0.64];
    const durs = [0.1, 0.1, 0.1, 0.16, 0.12, 0.45];
    notes.forEach((n, idx) => {
      this.playTone(n, durs[idx], 'triangle', 0.17, times[idx]);
    });
  }

  public playNote(freq: number, duration = 0.25) {
    this.playTone(freq, duration, 'triangle', 0.15, 0);
  }

  public isBgmPlaying(): boolean {
    return this.bgmPlaying;
  }

  public startBgm() {
    if (this.bgmPlaying) return;
    this.getContext();
    this.bgmPlaying = true;
    // Cheerful C-major pentatonic / island marimba melody
    const melody = [
      523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33,
      523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 0,
      783.99, 880.0, 1046.5, 880.0, 783.99, 659.25, 587.33, 659.25,
      783.99, 659.25, 587.33, 523.25, 587.33, 659.25, 523.25, 0,
    ];
    const bass = [
      261.63, 0, 196.0, 0, 220.0, 0, 196.0, 0,
      261.63, 0, 196.0, 0, 246.94, 0, 261.63, 0,
      196.0, 0, 261.63, 0, 220.0, 0, 196.0, 0,
      174.61, 0, 196.0, 0, 261.63, 0, 261.63, 0,
    ];

    const tick = () => {
      if (!this.bgmPlaying) return;
      const idx = this.step % melody.length;
      const m = melody[idx];
      const b = bass[idx];
      if (m > 0) this.playTone(m, 0.22, 'sine', 0.06, 0);
      if (b > 0) this.playTone(b, 0.3, 'triangle', 0.045, 0);
      this.step++;
      this.bgmTimer = window.setTimeout(tick, 270);
    };

    tick();
  }

  public stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer !== null) {
      window.clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }
}

export const soundEngine = new SoundEngine();

export function speakIndonesian(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'id-ID';
    utter.rate = 0.95;
    utter.pitch = 1.12;
    window.speechSynthesis.speak(utter);
  } catch {
    // Gracefully ignore speech synthesis restrictions
  }
}
