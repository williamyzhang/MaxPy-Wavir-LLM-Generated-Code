// Function to create a dial tone using WebAudio API
function createDialTone() {
	// Create an AudioContext
	const audioContext = new AudioContext();

	// Frequencies for the standard dial tone in Hz
	const frequencies = [350, 440];
	const oscillators = [];

	// Create and configure oscillators for each frequency
	for (let i = 0; i < frequencies.length; i++) {
		// Create an oscillator for each frequency
		const oscillator = audioContext.createOscillator();

		// Set the oscillator's frequency
		oscillator.frequency.value = frequencies[i] + Math.random() * 10 - 5; // Add a small random variation to the frequency

		// Set the oscillator's type
		oscillator.type = 'sine'; // sine wave for smooth dial tone

		// Connect the oscillator to the audio context's destination (speakers)
		oscillator.connect(audioContext.destination);

		// Start the oscillator
		oscillator.start();

		// Keep track of the oscillators in an array
		oscillators.push(oscillator);
	}

	// Function to stop the dial tone
	function stopDialTone() {
		for (let oscillator of oscillators) {
			oscillator.stop();
			oscillator.disconnect(); // Clean up after stopping
		}
	}

	// Automatically stop the dial tone after 10 seconds
	setTimeout(stopDialTone, 10000);

	return stopDialTone; // Return the function to stop the dial tone manually if needed
}

// Usage example
const stopTone = createDialTone();
// Can call stopTone() manually to stop the dial tone earlier
