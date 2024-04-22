function playBirdCall() {
	// Create a new audio context
	const audioContext = new AudioContext();

	// This function creates a single bird chirp
	function createChirp(startTime) {
		// Create an oscillator
		const oscillator = audioContext.createOscillator();
		// Create a gain node to control the volume
		const gainNode = audioContext.createGain();

		// Connect oscillator to gain node and gain node to the audio context's destination
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		// Set the initial frequency of the oscillator to a random value
		// This mimics the starting pitch of a bird chirp
		oscillator.frequency.setValueAtTime(1000 + Math.random() * 1000, startTime);

		// Randomly modulate the frequency over time to mimic the natural chirp
		oscillator.frequency.exponentialRampToValueAtTime(1200 + Math.random() * 800, startTime + 0.2);

		// Start the oscillator at the specified start time
		oscillator.start(startTime);

		// Ramp down the gain to end the chirp, this creates a fade-out effect
		gainNode.gain.setValueAtTime(0.3, startTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

		// Stop the oscillator after the chirp is complete
		oscillator.stop(startTime + 0.3);
	}

	// Play a series of chirps
	for (let i = 0; i < 5; i++) {
		// Start each chirp at a slightly different time to create a sequence
		createChirp(audioContext.currentTime + i * 0.3);
	}
}

// Call the function to play the bird call
playBirdCall();
