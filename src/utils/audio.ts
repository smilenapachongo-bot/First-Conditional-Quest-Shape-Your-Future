/**
 * Professional Audio Engine for First Conditional Quest
 * Synthesized purely with HTML5 Web Audio API & Web Speech API
 * Zero external asset dependencies, zero 404 risk, 100% offline-ready and accessible.
 */

class SoundController {
  private audioCtx: AudioContext | null = null;
  public isSfxMuted: boolean = false;
  public isMusicPlaying: boolean = false;
  public speechEnabled: boolean = true;
  private musicIntervalId: number | null = null;
  private musicGainNode: GainNode | null = null;

  private initCtx() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Subtle hover sound
  playHover() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, this.audioCtx.currentTime); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, this.audioCtx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.035);
    } catch {
      // ignore
    }
  }

  // Button clicks
  playClick() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.045);
      gain.gain.setValueAtTime(0.09, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.045);
    } catch {
      // ignore
    }
  }

  // Card tile selection
  playCardSelect() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(740, this.audioCtx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }

  // Points earned / Coin reward
  playPointsEarned() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const notes = [987.77, 1318.51]; // B5, E6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = this.audioCtx!.currentTime + idx * 0.07;
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(start);
        osc.stop(start + 0.2);
      });
    } catch {
      // ignore
    }
  }

  // Coin pick up sound
  playCoin() {
    this.playPointsEarned();
  }

  // Correct answer chime
  playSuccess() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const notes = [587.33, 880]; // D5, A5
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const startTime = this.audioCtx!.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch {
      // ignore
    }
  }

  // Match success arpeggio
  playMatchSuccess() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = this.audioCtx!.currentTime + idx * 0.065;
        gain.gain.setValueAtTime(0.14, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
    } catch {
      // ignore
    }
  }

  // Error buzz
  playError() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
      osc.frequency.setValueAtTime(165, this.audioCtx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.26);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.26);
    } catch {
      // ignore
    }
  }

  // Streak combo chime
  playStreak() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const freqs = [440, 554.37, 659.25, 830.61, 880];
      freqs.forEach((freq, i) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = this.audioCtx!.currentTime + i * 0.045;
        gain.gain.setValueAtTime(0.11, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(start);
        osc.stop(start + 0.16);
      });
    } catch {
      // ignore
    }
  }

  // Level Up fanfare
  playLevelUp() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const freqs = [392, 523.25, 659.25, 783.99, 1046.5, 1318.5];
      freqs.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = this.audioCtx!.currentTime + idx * 0.075;
        gain.gain.setValueAtTime(0.16, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // ignore
    }
  }

  // Badge unlock fanfare
  playBadgeUnlock() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C major
      chord.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = this.audioCtx!.currentTime + idx * 0.05;
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(start);
        osc.stop(start + 0.5);
      });
    } catch {
      // ignore
    }
  }

  // Mission Complete celebration
  playMissionComplete() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, i) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const start = this.audioCtx!.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {
      // ignore
    }
  }

  // 3D Power Bounce warp sound
  playPowerBounce() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.14);
      osc.frequency.exponentialRampToValueAtTime(1320, this.audioCtx.currentTime + 0.26);
      gain.gain.setValueAtTime(0.16, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.28);
    } catch {
      // ignore
    }
  }

  // Grand Certificate Fanfare
  playCertificateEarned() {
    if (this.isSfxMuted) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      const fanfare = [
        { f: 523.25, t: 0.0, d: 0.2 },
        { f: 659.25, t: 0.2, d: 0.2 },
        { f: 783.99, t: 0.4, d: 0.3 },
        { f: 1046.5, t: 0.7, d: 0.6 },
      ];
      fanfare.forEach((n) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'triangle';
        osc.frequency.value = n.f;
        const start = this.audioCtx!.currentTime + n.t;
        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(start);
        osc.stop(start + n.d);
      });
    } catch {
      // ignore
    }
  }

  // Optional Soft Ambient Adventure Background Music (Web Audio Oscillator Chords)
  startAmbientMusic() {
    if (this.musicIntervalId !== null) return;
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      this.isMusicPlaying = true;

      // Pentatonic warm chords: C - Am - F - G
      const chords = [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [174.61, 261.63, 329.63, 392.0], // Fmaj7
        [196.0, 246.94, 293.66, 392.0],  // G
      ];
      let chordIndex = 0;

      const playChord = () => {
        if (!this.isMusicPlaying || !this.audioCtx) return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, noteIdx) => {
          const osc = this.audioCtx!.createOscillator();
          const gain = this.audioCtx!.createGain();
          const filter = this.audioCtx!.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.value = freq;

          filter.type = 'lowpass';
          filter.frequency.value = 600;

          const now = this.audioCtx!.currentTime + noteIdx * 0.12;
          // Very gentle, soothing low-level ambient volume (0.02)
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.02, now + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.audioCtx!.destination);

          osc.start(now);
          osc.stop(now + 3.2);
        });
      };

      playChord();
      this.musicIntervalId = window.setInterval(playChord, 3500);
    } catch {
      // ignore
    }
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId !== null) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  // Text-To-Speech Pronunciation Audio
  speak(text: string) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // clear A2 pace
      utterance.pitch = 1.05;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundController();
