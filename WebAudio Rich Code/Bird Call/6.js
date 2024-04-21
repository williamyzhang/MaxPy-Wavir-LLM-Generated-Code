// Create a new audio context
const audioContext = new AudioContext();

function playBirdCall() {
	// Function to play a single chirp
	const playChirp = () => {
		// Create an oscillator
		const oscillator = audioContext.createOscillator();
		oscillator.type = 'sine'; // Sine wave for a smoother tone

		// Randomize the frequency to simulate different chirp pitches
		const baseFrequency = 1000; // Base frequency in Hz
		const frequencyVariance = 500; // Variance in frequency to add randomness
		oscillator.frequency.setValueAtTime(baseFrequency + Math.random() * frequencyVariance, audioContext.currentTime);

		// Create a gain node for controlling the volume
		const gainNode = audioContext.createGain();
		gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Start at full volume
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5); // Fade out quickly

		// Connect the oscillator to the gain node and the gain node to the audio context's destination
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		// Start the oscillator
		oscillator.start();

		// Stop the oscillator after a short delay
		oscillator.stop(audioContext.currentTime + 0.5);
	};

	// Loop to play multiple chirps
	for (let i = 0; i < 5; i++) {
		// Delay each chirp randomly to avoid a regular pattern
		const chirpDelay = i * 500 + Math.random() * 300; // Delay in milliseconds
		setTimeout(playChirp, chirpDelay);
	}
}

// Play the bird call
playBirdCall();
