// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate bird call
function generateBirdCall() {
	// Create oscillator node
	const oscillator = audioContext.createOscillator();

	// Set oscillator type to sine wave (this produces a smooth, pure tone)
	oscillator.type = 'sine';

	// Set frequency of the oscillator to mimic bird call (you can adjust this to get different bird calls)
	oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);

	// Connect oscillator to audio context destination (i.e., speakers)
	oscillator.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start();

	// Set timeout to stop the oscillator after a certain duration (adjust this as needed)
	setTimeout(() => {
		oscillator.stop();
	}, 1000); // Stop after 1 second
}

// Call the function to generate bird call
generateBirdCall();
