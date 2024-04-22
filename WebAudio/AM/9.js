// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create Oscillators
const carrier = audioContext.createOscillator();
const modulator = audioContext.createOscillator();

// Set wave type for both oscillators
carrier.type = 'sine';
modulator.type = 'sine';

// Set frequencies for both oscillators (in Hz)
const carrierFreq = 440; // Hz
const modulatorFreq = 5; // Hz (low frequency for modulation)

// Set frequencies
carrier.frequency.value = carrierFreq;
modulator.frequency.value = modulatorFreq;

// Create GainNodes
const carrierGain = audioContext.createGain();
const modulatorGain = audioContext.createGain();

// Set gain for modulator
modulatorGain.gain.value = 0.5; // Modulation depth, between 0 and 1

// Connect modulator to modulatorGain
modulator.connect(modulatorGain);

// Connect carrier to carrierGain
carrier.connect(carrierGain);

// Connect modulatorGain to the frequency of carrier oscillator (AM)
modulatorGain.connect(carrier.frequency);

// Connect carrierGain to AudioContext destination
carrierGain.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Stop oscillators after some time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
}, 5000); // Stop after 5 seconds
