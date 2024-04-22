function generateBirdCall() {
	// Create audio context
	const audioContext = new AudioContext();

	// Function to create a single chirp
	const chirp = (frequency, time) => {
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.type = 'sine'; // Sine wave for smooth natural sound
		oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Start frequency

		// Randomize the frequency to vary chirps
		const endFrequency = frequency + 100 * Math.random();
		oscillator.frequency.linearRampToValueAtTime(endFrequency, audioContext.currentTime + 0.1);

		gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set initial volume
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2); // Fade out

		oscillator.connect(gainNode); // Connect oscillator to gain node
		gainNode.connect(audioContext.destination); // Connect gain node to output

		oscillator.start(time); // Start sound at specified time
		oscillator.stop(time + 0.5); // Stop sound after 0.5 seconds
	};

	// Generate multiple chirps over time
	for (let i = 0; i < 10; i++) {
		const randomFrequency = 1500 + 500 * Math.random(); // Random frequency between 1500 Hz and 2000 Hz
		const startTime = i * 0.3 + Math.random() * 0.2; // Random start time for each chirp
		chirp(randomFrequency, startTime);
	}
}

// Call the function to play the bird call
generateBirdCall();
