// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create a sine wave oscillator
function createOscillator(freq, gainValue) {
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();

	oscillator.type = 'sine'; // Sine wave oscillator
	oscillator.frequency.value = freq; // Set frequency

	// Set gain value
	gainNode.gain.value = gainValue;

	// Connect oscillator to gain node
	oscillator.connect(gainNode);

	return { oscillator, gainNode };
}

// Function to generate additive synthesis
function generateAdditiveSynthesis(frequencies, gains) {
	const { oscillator, gainNode } = createOscillator(frequencies[0], gains[0]);
	oscillator.start();

	for (let i = 1; i < frequencies.length; i++) {
		const { oscillator: osc, gainNode: gain } = createOscillator(frequencies[i], gains[i]);
		osc.start();
		osc.connect(gainNode);
	}

	gainNode.connect(audioContext.destination);

	// Return the oscillator and gain node
	return { oscillator, gainNode };
}

// Example frequencies and gains
const frequencies = [220, 330, 440, 550]; // Frequencies of sine waves
const gains = [0.5, 0.3, 0.2, 0.1]; // Gain values for each sine wave

// Generate additive synthesis
const { oscillator, gainNode } = generateAdditiveSynthesis(frequencies, gains);

// Stop the synthesis after 3 seconds
setTimeout(() => {
	oscillator.stop();
}, 3000);
