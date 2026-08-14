/**
 * rts-audio-synthesizer.js
 * BUYASOUL CPL / GODFORGE — Unified Synthesized Audio Feedback Engine (Proposal #3)
 *
 * Implements a pure Web Audio API synthesizer for retro-immersive RTS sound effects.
 * Eliminates all external network MP3/WAV latency, load failures, and 404 errors.
 *
 * Sound Effects:
 *   - 'select': Crisp metallic resonance beep on unit selection (sine + bandpass resonance).
 *   - 'move': Dual upbeat harmonic tone-bleeps confirming movement commands.
 *   - 'alert': Low-frequency frequency-modulated warning swoop for combat/alarm triggers.
 */

(function() {
  'use strict';

  let _audioCtx = null;

  function getAudioContext() {
    if (!_audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        _audioCtx = new AudioContext();
      }
    }
    // Resume context if suspended by browser autoplay policy
    if (_audioCtx && _audioCtx.state === 'suspended') {
      _audioCtx.resume();
    }
    return _audioCtx;
  }

  /**
   * Synthesize a selection chime.
   * High-frequency sine wave + metallic bandpass resonance + exponential decay.
   */
  function playSelectSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(680, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.08);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }

  /**
   * Synthesize a move confirmation double-beep.
   * Two quick confirming tones (warm triangle waves) in rapid succession.
   */
  function playMoveSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // First beep
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(440, t);
    gain1.gain.setValueAtTime(0.06, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.08);

    // Second beep (slightly delayed and higher pitched)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(520, t + 0.07);
    gain2.gain.setValueAtTime(0.06, t + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t + 0.07);
    osc2.stop(t + 0.15);
  }

  /**
   * Synthesize an alert sweep.
   * Low-frequency warning sweep (sawtooth + lowpass sweep) for alarms or damage.
   */
  function playAlertSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.38);
  }

  // ─── PUBLIC EXPORTS ──────────────────────────────────────────────────

  window.RTSAudioSynthesizer = {
    play: function(type) {
      try {
        if (type === 'select') playSelectSound();
        else if (type === 'move') playMoveSound();
        else if (type === 'alert') playAlertSound();
      } catch (e) {
        console.warn('[RTS Audio Synthesizer] Error playing synthesized sound:', e);
      }
    }
  };

  console.log('[RTS Audio] Web Audio synthesizer ready.');

})();