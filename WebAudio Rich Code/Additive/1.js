// Create an audio context
const audioContext = new AudioContext();

// Define the fundamental frequency (e.g., A4, 440 Hz)
const fundamentalFrequency = 440;

// Number of partials
const numberOfPartials = 4;

// Create an array to store oscillators
const oscillators = [];

// Create and configure oscillators for the fundamental and its partials
for (let i = 0; i <= numberOfPartials; i++) {
	// Create an oscillator
	const oscillator = audioContext.createOscillator();

	// Set the oscillator's frequency
	if (i === 0) {
		// Fundamental frequency
		oscillator.frequency.value = fundamentalFrequency;
	} else {
		// Random multiplier for partials; change this logic as needed
		const randomMultiplier = 1 + Math.random() * 2;
		oscillator.frequency.value = fundamentalFrequency * (i * randomMultiplier);
	}

	// Connect the oscillator to the audio context's destination
	oscillator.connect(audioContext.destination);

	// Add the oscillator to the array
	oscillators.push(oscillator);
}

// Start all oscillators
oscillators.forEach(oscillator => {
	oscillator.start();
});

// Stop oscillators after a set time (e.g., after 2 seconds)
setTimeout(() => {
	oscillators.forEach(oscillator => {
		oscillator.stop();
	});
}, 2000);
