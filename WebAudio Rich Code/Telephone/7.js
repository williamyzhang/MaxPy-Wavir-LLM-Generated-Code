// Create an instance of an audio context
const audioContext = new window.AudioContext();

// Function to create a sine wave oscillator at a given frequency
function createSineWave(frequency) {
	const oscillator = audioContext.createOscillator(); // Create oscillator node
	oscillator.type = 'sine'; // Set type of oscillator
	oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Set frequency
	return oscillator;
}

// Function to play a dial tone
function playDialTone() {
	const frequencies = [350, 440]; // Standard frequencies for the dial tone
	const gainNode = audioContext.createGain(); // Create a gain node to control the volume
	gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Set the initial volume
	gainNode.connect(audioContext.destination); // Connect gain node to the output

	// Use a for loop to create and start each oscillator
	for (let i = 0; i < frequencies.length; i++) {
		const oscillator = createSineWave(frequencies[i]);
		oscillator.connect(gainNode); // Connect the oscillator to the gain node
		oscillator.start(); // Start the oscillator

		// Stop the oscillator after 10 seconds
		oscillator.stop(audioContext.currentTime + 10);
	}
}

// Example of using Math.random() - randomly decide whether to play the tone
if (Math.random() > 0.5) {
	playDialTone();
} else {
	console.log("Random choice: Not playing the dial tone this time.");
}
