// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and play a church bell sound
function playChurchBell() {
	// Create an oscillator node
	const oscillator = audioContext.createOscillator();

	// Set the type of the oscillator to 'sine' for a smooth bell-like sound
	oscillator.type = 'sine';

	// Set the frequency of the oscillator to the desired bell frequency
	oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

	// Create a gain node to control the volume
	const gainNode = audioContext.createGain();

	// Set the initial gain value
	gainNode.gain.setValueAtTime(1, audioContext.currentTime);

	// Connect the oscillator to the gain node
	oscillator.connect(gainNode);

	// Connect the gain node to the destination (speaker)
	gainNode.connect(audioContext.destination);

	// Schedule the oscillator to start playing immediately
	oscillator.start();

	// Ramp down the volume over 2 seconds to simulate the sound of a bell ringing
	gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);

	// Stop the oscillator after 2 seconds
	oscillator.stop(audioContext.currentTime + 2);
}

// Call the function to play the church bell sound
playChurchBell();
