// Create Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and play the bell sound
function playBell() {
	// Create oscillator node
	const oscillator = audioContext.createOscillator();
	// Set the type of oscillator to sine wave
	oscillator.type = 'sine';
	// Set the frequency of the oscillator to the desired bell frequency
	oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz for A4, adjust as needed
	// Create gain node to control the volume
	const gainNode = audioContext.createGain();
	// Set the volume (0 to 1)
	gainNode.gain.value = 0.5;

	// Connect the oscillator to the gain node
	oscillator.connect(gainNode);
	// Connect the gain node to the audio context's destination (speakers)
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start();

	// Define the duration of the bell sound (in milliseconds)
	const bellDuration = 2000; // 2 seconds, adjust as needed

	// Stop the oscillator after the bell duration
	setTimeout(() => {
		oscillator.stop();
	}, bellDuration);
}

// Call the function to play the bell sound
playBell();
