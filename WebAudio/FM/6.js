// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Set sine wave as the type
carrier.frequency.value = 440; // Set initial frequency to 440 Hz

// Create modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Set sine wave as the type
modulator.frequency.value = 5; // Set initial frequency to 5 Hz

// Create gain node for modulator
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 100; // Set initial modulation depth

// Connect modulator to modulator gain
modulator.connect(modulatorGain);

// Connect modulator gain to carrier frequency
modulatorGain.connect(carrier.frequency);

// Connect carrier to output
carrier.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Stop oscillators after 5 seconds (for demonstration)
setTimeout(() => {
	carrier.stop();
	modulator.stop();
}, 5000);
