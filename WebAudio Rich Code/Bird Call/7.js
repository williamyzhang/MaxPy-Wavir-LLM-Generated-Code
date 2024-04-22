// Create a new audio context
const audioCtx = new AudioContext();

// Function to create a single bird chirp
function createChirp(frequency) {
	const oscillator = audioCtx.createOscillator();
	const gainNode = audioCtx.createGain();

	// Set oscillator type and frequency
	oscillator.type = 'sine';
	oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

	// Randomize the gain to simulate chirp volume variation
	gainNode.gain.setValueAtTime(Math.random() * 0.5, audioCtx.currentTime);

	// Connect the oscillator to the gain node and then to the audio context's destination
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	// Start and stop the oscillator to make a chirp sound
	oscillator.start();
	oscillator.stop(audioCtx.currentTime + 0.1 + Math.random() * 0.1); // Randomize duration slightly

	return oscillator;
}

// Function to generate a sequence of bird calls
function birdCall() {
	const baseFrequency = 1000; // Base frequency for a bird call
	const variation = 500; // Frequency variation range

	// Generate multiple chirps
	for (let i = 0; i < 5; i++) {
		// Randomize the frequency for each chirp
		const frequency = baseFrequency + Math.random() * variation;
		setTimeout(() => {
			createChirp(frequency);
		}, i * 300); // Delay each chirp by 300 ms
	}
}

// Trigger the bird call
birdCall();
