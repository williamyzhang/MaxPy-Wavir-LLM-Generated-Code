// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create a bell sound
function createBell() {
	// Create an oscillator node
	const oscillator = audioContext.createOscillator();

	// Set the type of oscillator to sine wave (to mimic bell sound)
	oscillator.type = 'sine';

	// Set frequency of the oscillator (adjust for the desired pitch)
	oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4

	// Create an envelope for the sound
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0, audioContext.currentTime);
	gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01); // Attack
	gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1); // Decay

	// Connect oscillator to gain node and gain node to audio context destination (speakers)
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start();

	// Stop the oscillator after the decay
	setTimeout(() => {
		oscillator.stop();
	}, 1000);
}

// Call the function to play the bell sound
createBell();
