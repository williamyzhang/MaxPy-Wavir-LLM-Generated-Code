// Function to initialize and play a church bell sound
function playChurchBell() {
	const audioContext = new AudioContext();

	// Function to create a single bell strike
	function createBellStrike(timeOffset) {
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		// Configure oscillator
		oscillator.type = 'sine'; // Sine wave for a smooth bell sound
		const baseFrequency = 120; // Base frequency in Hz
		oscillator.frequency.setValueAtTime(baseFrequency + Math.random() * 60, audioContext.currentTime);

		// Configure gain (volume) envelope
		gainNode.gain.setValueAtTime(0, audioContext.currentTime + timeOffset);
		gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + timeOffset + 0.1); // Fade in
		gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + timeOffset + 1); // Fade out

		// Connect nodes
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		// Start and stop the oscillator
		oscillator.start(audioContext.currentTime + timeOffset);
		oscillator.stop(audioContext.currentTime + timeOffset + 1.5);
	}

	// Generate multiple strikes at random times
	for (let i = 0; i < 5; i++) {
		createBellStrike(i * 2 + Math.random() * 0.5);
	}
}

// Play the bell sound when desired
playChurchBell();
