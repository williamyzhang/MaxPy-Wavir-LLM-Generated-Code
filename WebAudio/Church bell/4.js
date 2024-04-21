// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a bell sound
function createBell() {
	// Create an oscillator node
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // Set oscillator type to sine wave

	// Create a gain node
	const gainNode = audioContext.createGain();

	// Connect the oscillator to the gain node
	oscillator.connect(gainNode);

	// Connect the gain node to the AudioContext's destination (output)
	gainNode.connect(audioContext.destination);

	// Set the oscillator frequency (adjust as needed for desired pitch)
	oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

	// Set the gain node's initial gain value
	gainNode.gain.setValueAtTime(1, audioContext.currentTime);

	// Ramp down the gain to create a fading effect
	gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);

	// Start the oscillator
	oscillator.start();

	// Stop the oscillator after a duration (adjust as needed for desired bell sound length)
	oscillator.stop(audioContext.currentTime + 2);
}

// Call the function to create the bell sound
createBell();
