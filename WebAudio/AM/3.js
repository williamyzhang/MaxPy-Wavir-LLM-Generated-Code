// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create Oscillator for the carrier signal
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine'; // You can change the type of wave here (sine, square, triangle, sawtooth)
carrierOscillator.frequency.value = 440; // Starting frequency

// Create Oscillator for the modulating signal
const modulatorOscillator = audioContext.createOscillator();
modulatorOscillator.type = 'sine'; // You can change the type of wave here (sine, square, triangle, sawtooth)
modulatorOscillator.frequency.value = 5; // Modulation frequency

// Create GainNodes for controlling the amplitude of the modulator and carrier signals
const modulatorGain = audioContext.createGain();
const carrierGain = audioContext.createGain();

// Connect modulator oscillator to modulator gain
modulatorOscillator.connect(modulatorGain);

// Connect carrier oscillator to carrier gain
carrierOscillator.connect(carrierGain);

// Connect modulator gain to carrier oscillator frequency
modulatorGain.connect(carrierOscillator.frequency);

// Connect carrier gain to AudioContext destination (speakers)
carrierGain.connect(audioContext.destination);

// Start oscillators
carrierOscillator.start();
modulatorOscillator.start();
