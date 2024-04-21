// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create the bell sound
function createBellSound(context, frequency, duration) {
	const oscillator = context.createOscillator();
	oscillator.type = 'sine'; // You can try different types for different bell sounds
	oscillator.frequency.setValueAtTime(frequency, context.currentTime);

	// Envelope - ramp up and then down
	const gainNode = context.createGain();
	gainNode.gain.setValueAtTime(0, context.currentTime);
	gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 0.1); // Ramp up
	gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration); // Ramp down

	// Connect oscillator to gain to output
	oscillator.connect(gainNode);
	gainNode.connect(context.destination);

	// Start and stop the sound
	oscillator.start();
	oscillator.stop(context.currentTime + duration);
}

// Play the bell sound with desired frequency and duration
const bellFrequency = 500; // Adjust frequency for desired tone
const bellDuration = 2; // Adjust duration in seconds
createBellSound(audioContext, bellFrequency, bellDuration);
