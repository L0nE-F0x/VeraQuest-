class SoundManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // We will initialize the AudioContext on the first user interaction to comply with browser policies.
    this.muted = localStorage.getItem('vera_quest_muted') === 'true';
  }

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    localStorage.setItem('vera_quest_muted', String(this.muted));
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private playTone(
    freqs: number[],
    durations: number[],
    type: OscillatorType = 'sine',
    gains: number[] = [0.1],
    delays: number[] = [0],
    slide: boolean = false
  ) {
    if (this.muted) return;
    const ctx = this.initContext();
    const now = ctx.currentTime;

    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const delay = delays[index] || 0;
      const duration = durations[index] || 0.2;
      const startGain = gains[index] !== undefined ? gains[index] : 0.1;

      osc.type = type;
      
      if (slide && index > 0) {
        // Slide effect
        osc.frequency.setValueAtTime(freqs[index - 1], now + delay);
        osc.frequency.exponentialRampToValueAtTime(freq, now + delay + duration);
      } else {
        osc.frequency.setValueAtTime(freq, now + delay);
      }

      gainNode.gain.setValueAtTime(startGain, now + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + duration);
    });
  }

  public playPop() {
    // Bubble click pop
    const ctx = this.initContext();
    if (this.muted) return;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
    
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.08);
  }

  public playChime() {
    // Cute pentatonic success chime (two notes: G5 -> C6)
    this.playTone([784, 1047], [0.2, 0.3], 'triangle', [0.1, 0.12], [0, 0.08]);
  }

  public playError() {
    // Soft failure buzzer (120Hz -> 80Hz)
    const ctx = this.initContext();
    if (this.muted) return;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.25);
    
    // Use bandpass filter to make it softer
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(120, now);
    
    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playChestOpen() {
    // Creak & sparkle arpeggio
    this.playTone([261, 329, 392, 523, 659, 784, 1047], [0.15, 0.15, 0.15, 0.15, 0.2, 0.2, 0.3], 'sine', 
      [0.05, 0.05, 0.06, 0.07, 0.08, 0.08, 0.1], [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3]);
  }

  public playLevelUp() {
    // Grand arpeggio fanfare: C4 -> G4 -> C5 -> E5 -> G5 -> C6
    const freqs = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    const delays = [0, 0.08, 0.16, 0.24, 0.32, 0.40];
    const gains = [0.1, 0.1, 0.1, 0.1, 0.12, 0.15];
    const durations = [0.4, 0.4, 0.4, 0.4, 0.5, 0.8];
    this.playTone(freqs, durations, 'triangle', gains, delays);
  }

  public playQuestSelect() {
    this.playTone([523, 659], [0.1, 0.15], 'sine', [0.08, 0.08], [0, 0.04]);
  }
}

export const sounds = new SoundManager();
