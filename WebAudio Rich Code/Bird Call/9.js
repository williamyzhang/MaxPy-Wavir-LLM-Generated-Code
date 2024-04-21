function birdCall() {
	// Create audio context
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();

	// Function to play a single chirp
	const playChirp = (startTime) => {
		// Create oscillator for the chirp sound
		const oscillator = audioContext.createOscillator();
		// Create a gain node to control the volume
		const gainNode = audioContext.createGain();

		// Randomize frequency for variation, typical bird chirps are between 1000 Hz and 5000 Hz
		const frequency = 1000 + Math.random() * 4000;
		oscillator.frequency.setValueAtTime(frequency, startTime);

		// Configure oscillator type
		oscillator.type = 'sine';

		// Envelope for the chirp
		gainNode.gain.setValueAtTime(0, startTime);
		gainNode.gain.linearRampToValueAtTime(1, startTime + 0.01); // Quick fade in
		gainNode.gain.linearRampToValueAtTime(0, startTime + 0.1); // Fade out

		// Connect oscillator to gain node and gain node to output
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		// Start and stop oscillator
		oscillator.start(startTime);
		oscillator.stop(startTime + 0.1);
	};

	// Schedule multiple chirps
	for (let i = 0; i < 5; i++) {
		const startTime = audioContext.currentTime + i * 0.3; // Start each chirp 0.3 seconds apart
		playChirp(startTime);
	}
}

// Call the function to play the bird call
birdCall();
