// Create a new audio context
const audioContext = new AudioContext();

function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function playBirdCall() {
	const startTime = audioContext.currentTime;
	let currentTime = startTime;

	// Generate multiple chirps
	for (let i = 0; i < 5; i++) {
		// Random frequency between 1000 Hz and 5000 Hz
		const frequency = randomBetween(1000, 5000);

		// Random duration between 0.1 and 0.5 seconds
		const duration = randomBetween(0.1, 0.5);

		// Create oscillator for tone generation
		const oscillator = audioContext.createOscillator();
		oscillator.type = 'sine'; // Sine wave — other types are 'square', 'sawtooth', 'triangle'
		oscillator.frequency.setValueAtTime(frequency, currentTime);

		// Create gain node to control the volume
		const gainNode = audioContext.createGain();
		gainNode.gain.setValueAtTime(1, currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.1, currentTime + duration);

		// Connect nodes
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		// Start and stop the oscillator
		oscillator.start(currentTime);
		oscillator.stop(currentTime + duration);

		// Update current time for next chirp
		currentTime += duration + randomBetween(0.05, 0.2); // Add some randomness to the start time of the next chirp
	}
}

// Play the bird call
playBirdCall();
