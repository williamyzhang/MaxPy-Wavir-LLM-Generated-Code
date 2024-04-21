// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to generate bird call
function generateBirdCall() {
	// Create oscillator node
	const oscillator = audioContext.createOscillator();

	// Set oscillator type to 'sine' for a simple waveform
	oscillator.type = 'sine';

	// Set frequency to simulate bird call
	const frequency = 1000; // Adjust frequency to change the bird call
	oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

	// Connect oscillator to audio output
	oscillator.connect(audioContext.destination);

	// Start oscillator
	oscillator.start();

	// Stop oscillator after 1 second
	setTimeout(() => {
		oscillator.stop();
	}, 1000);
}

// Call the function to generate bird call
generateBirdCall();
