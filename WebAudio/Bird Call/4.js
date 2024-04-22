// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate bird call
function generateBirdCall() {
	// Create an OscillatorNode
	const oscillator = audioContext.createOscillator();

	// Set oscillator type to 'sine' for a smooth sound
	oscillator.type = 'sine';

	// Set frequency for the bird call (adjust this to change the pitch)
	oscillator.frequency.setValueAtTime(2000, audioContext.currentTime);

	// Create GainNode to control volume
	const gainNode = audioContext.createGain();

	// Set initial volume to 0
	gainNode.gain.setValueAtTime(0, audioContext.currentTime);

	// Ramp up the volume quickly
	gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);

	// Ramp down the volume gradually
	gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);

	// Connect the nodes: oscillator -> gain -> destination (speakers)
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start();

	// Stop the oscillator after 1 second
	setTimeout(() => {
		oscillator.stop();
	}, 1000);
}

// Call the function to generate the bird call
generateBirdCall();
