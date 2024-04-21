// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create an oscillator node with frequency modulation
function createFMOscillator(baseFreq, modFreq, modDepth) {
	// Create the oscillator for the carrier wave (sine wave)
	const carrier = audioContext.createOscillator();
	carrier.type = 'sine';
	carrier.frequency.value = baseFreq;

	// Create the oscillator for the modulating wave (also a sine wave)
	const modulator = audioContext.createOscillator();
	modulator.type = 'sine';
	modulator.frequency.value = modFreq;

	// Create a gain node to control the modulation depth
	const modGain = audioContext.createGain();
	modGain.gain.value = modDepth;

	// Connect the modulator to the gain node, and then to the frequency of the carrier
	modulator.connect(modGain);
	modGain.connect(carrier.frequency);

	// Connect the carrier to the destination (speakers)
	carrier.connect(audioContext.destination);

	// Start the oscillators
	carrier.start();
	modulator.start();

	// Return the carrier node so it can be controlled if needed
	return carrier;
}

// Example usage:
const baseFrequency = 440; // Base frequency of the carrier wave (Hz)
const modulatorFrequency = 20; // Frequency of the modulating wave (Hz)
const modulationDepth = 100; // Modulation depth

// Create FM oscillator
const fmOscillator = createFMOscillator(baseFrequency, modulatorFrequency, modulationDepth);

// To stop the sound, you can use:
// fmOscillator.stop();
