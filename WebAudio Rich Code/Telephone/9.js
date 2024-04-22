// Create audio context
const audioContext = new AudioContext();

// Function to create and play a tone
function playTone(frequency, duration = 5000) {
	// Create oscillator for tone generation
	const oscillator = audioContext.createOscillator();
	// Create gain node to control the volume
	const gainNode = audioContext.createGain();

	// Set oscillator type
	oscillator.type = 'sine';

	// Use Math.random() to slightly vary the frequency for demonstration
	oscillator.frequency.value = frequency + Math.random() * 10 - 5; // vary frequency by ±5 Hz

	// Gain node settings, slightly randomize volume for demonstration
	gainNode.gain.value = 0.5 + Math.random() * 0.1 - 0.05; // volume between 0.45 and 0.55

	// Connect oscillator to gain node and gain node to audio context
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillator immediately
	oscillator.start(audioContext.currentTime);
	// Stop the oscillator after the specified duration (milliseconds)
	oscillator.stop(audioContext.currentTime + duration / 1000);

	return oscillator;
}

// Frequencies for a standard dial tone
const frequencies = [350, 440]; // Standard dial tone frequencies

// Play each frequency using a loop
frequencies.forEach(freq => {
	playTone(freq);
});

// Example to stop the dial tone and cleanup after 5 seconds
setTimeout(() => {
	audioContext.close(); // Close the audio context to clean up resources
}, 5000);
