// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // Initial frequency

// Create modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 5; // Initial frequency

// Create gain node for modulator amplitude control
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 100; // Initial amplitude

// Connect modulator to gain node
modulator.connect(modulatorGain);

// Connect gain node to carrier frequency
modulatorGain.connect(carrier.frequency);

// Connect carrier to destination
carrier.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Stop oscillators after 5 seconds
setTimeout(() => {
	carrier.stop();
	modulator.stop();
}, 5000);
