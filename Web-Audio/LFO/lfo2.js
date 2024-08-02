// Create an AudioContext instance
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create the primary oscillator (sound source)
const oscillator = audio_ctx.createOscillator();
oscillator.type = 'sine'; // This is our sine wave
oscillator.frequency.value = 440; // Frequency in Hz (A4 pitch)

// Create the LFO (Low Frequency Oscillator) for the vibrato effect
const lfo = audio_ctx.createOscillator();
lfo.type = 'sine'; // Sine wave for smooth vibrato effect
lfo.frequency.value = 5; // LFO frequency in Hz - controls the vibrato speed

// Create a GainNode to control the amplitude of the LFO effect
const lfoGain = audio_ctx.createGain();
lfoGain.gain.value = 30; // Modulation depth - controls the vibrato intensity

// Connect the LFO through the gain node to the primary oscillator's frequency
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Start both oscillators
oscillator.start();
lfo.start();

// Connect the primary oscillator to the destination (speakers)
oscillator.connect(audioCtx.destination);
