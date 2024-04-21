// Create an audio context
const audioContext = new AudioContext();

// Base frequency of the fundamental tone
const baseFrequency = 440; // A4 note, commonly used as a tuning standard

// Master gain to control overall volume
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.5; // Reduce volume to avoid clipping
masterGain.connect(audioContext.destination);

// Function to create an oscillator
function createOscillator(frequency, amplitude) {
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // Sine wave for pure tone
	oscillator.frequency.value = frequency;

	const gainNode = audioContext.createGain();
	gainNode.gain.value = amplitude;

	oscillator.connect(gainNode);
	gainNode.connect(masterGain);
	oscillator.start();

	return oscillator;
}

// Number of partials including the fundamental
const numberOfPartials = 5;

// Create oscillators for the fundamental and its harmonics
for (let i = 1; i <= numberOfPartials; i++) {
	const frequency = baseFrequency * i; // Frequency of the i-th partial
	const amplitude = 1 / i; // Reduce amplitude of higher partials
	createOscillator(frequency, amplitude);
}

// Optionally start and stop the sound after some time
setTimeout(() => {
	audioContext.close(); // Stops the audio context after 5 seconds
}, 5000);
