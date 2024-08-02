// Create a new audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a carrier oscillator
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';  // The carrier waveform type
carrier.frequency.value = 440;  // Frequency in Hz (A4 pitch)

// Create a modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine';  // The modulator waveform type
modulator.frequency.value = 220;  // Frequency in Hz

// Create a gain node for modulating the frequency
const modulatorGain = audioCtx.createGain();
modulatorGain.gain.value = 100;  // Depth of the frequency modulation

// Connect the modulator through the gain node to the frequency of the carrier
modulator.connect(modulatorGain);
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the audio context's destination
carrier.connect(audioCtx.destination);

// Start the oscillators
carrier.start();
modulator.start();

// To stop the oscillators, you can call carrier.stop() and modulator.stop() when needed
