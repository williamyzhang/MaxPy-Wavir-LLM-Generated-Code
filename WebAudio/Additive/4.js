// Create AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and connect oscillator nodes
function createOscillator(freq, gainVal) {
	const oscillator = audioCtx.createOscillator();
	const gainNode = audioCtx.createGain();

	oscillator.frequency.value = freq;
	gainNode.gain.value = gainVal;

	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	return { oscillator, gainNode };
}

// Function to generate additive synthesis
function generateAdditiveSynthesis(frequencies, amplitudes) {
	const numHarmonics = Math.min(frequencies.length, amplitudes.length);

	// Create and connect oscillators for each harmonic
	const oscillators = [];
	for (let i = 0; i < numHarmonics; i++) {
		const { oscillator, gainNode } = createOscillator(frequencies[i], amplitudes[i]);
		oscillator.start();
		oscillators.push({ oscillator, gainNode });
	}

	// Function to stop all oscillators
	function stop() {
		oscillators.forEach(({ oscillator }) => oscillator.stop());
	}

	return { stop };
}

// Example usage
const baseFrequency = 220; // Base frequency in Hz
const numHarmonics = 10; // Number of harmonics
const frequencies = Array.from({ length: numHarmonics }, (_, i) => baseFrequency * (i + 1));
const amplitudes = Array.from({ length: numHarmonics }, (_, i) => 1 / (i + 1));

const additiveSynthesis = generateAdditiveSynthesis(frequencies, amplitudes);

// Stop the synthesis after 3 seconds
setTimeout(() => {
	additiveSynthesis.stop();
}, 3000);
