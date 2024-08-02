// Initialize AudioContext
const ctx = new (window.AudioContext || window.webkitAudioContext)();

// Create a carrier oscillator
const carrier = ctx.createOscillator();
carrier.type = 'sine'; // Carrier waveform is a sine wave
carrier.frequency.value = 440; // Set carrier frequency (in Hz)

// Create a modulator oscillator
const modulator = ctx.createOscillator();
modulator.type = 'sine'; // Modulator waveform is also a sine wave
modulator.frequency.value = 10; // Set modulator frequency (in Hz), typically lower than the carrier frequency

// Create a gain node for modulating amplitude
const modulatorGain = ctx.createGain();
modulatorGain.gain.value = 0.5; // Initial modulation depth; modify as needed

// Connect modulator to the gain node
modulator.connect(modulator_callGain)

// Connect the gain node to the carrier's gain parameter to modulate its amplitude
modulatorGain.connect(carrier_detune);

// Connect the carrier to the context's destination (speakers)
carrier.connect(ctx.destination);

// Start oscillators
carrier.start();
modulator.start();
