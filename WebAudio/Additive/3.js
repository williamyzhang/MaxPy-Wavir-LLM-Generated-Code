// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to generate an oscillator with given frequency and amplitude
function createOscillator(frequency, amplitude) {
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();

	oscillator.type = 'sine'; // You can change the waveform here
	oscillator.frequency.value = frequency;
	gainNode.gain.value = amplitude;

	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	return oscillator;
}

// Function to perform additive synthesis
function playAdditiveSynthesis(frequencies, amplitudes) {
	const numOscillators = Math.min(frequencies.length, amplitudes.length);
	const oscillators = [];

	for (let i = 0; i < numOscillators; i++) {
		oscillators.push(createOscillator(frequencies[i], amplitudes[i]));
		oscillators[i].start();
	}

	// Stop oscillators after some time (in this case, after 2 seconds)
	setTimeout(() => {
		oscillators.forEach(oscillator => oscillator.stop());
	}, 2000);
}

// Example usage
const frequencies = [440, 660, 880]; // Hz
const amplitudes = [0.5, 0.3, 0.2]; // Relative amplitude (0 to 1)
playAdditiveSynthesis(frequencies, amplitudes);
