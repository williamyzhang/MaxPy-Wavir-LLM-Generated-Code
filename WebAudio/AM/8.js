// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator node for the carrier wave (sine wave)
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine'; // sine wave

// Create a gain node for the modulating wave (also a sine wave)
const modulatorGain = audioContext.createGain();

// Connect the modulator gain to the gain of the carrier oscillator
modulatorGain.connect(carrierOscillator.gain);

// Set the modulation depth (how much the modulating wave will affect the amplitude)
const modulationDepth = 0.5;
modulatorGain.gain.value = modulationDepth;

// Set the modulation frequency (how fast the modulating wave oscillates)
const modulationFrequency = 5; // Hz
const modulatorOscillator = audioContext.createOscillator();
modulatorOscillator.frequency.value = modulationFrequency;

// Start the oscillators
carrierOscillator.start();
modulatorOscillator.start();

// Connect the modulator oscillator to the modulator gain
modulatorOscillator.connect(modulatorGain);

// Connect the carrier oscillator to the destination (speakers)
carrierOscillator.connect(audioContext.destination);
