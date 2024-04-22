// Create the audio context
const audioContext = new AudioContext();

// Function to create and play a bell sound
function playBell() {
	// Create an oscillator
	const oscillator = audioContext.createOscillator();
	// Use a sine wave for a smooth bell sound
	oscillator.type = 'sine';

	// Randomize the bell frequency a bit to simulate different bell strikes
	const baseFrequency = 300; // Base frequency in Hz
	const randomVariance = 30; // Frequency variance in Hz
	oscillator.frequency.value = baseFrequency + Math.random() * randomVariance;

	// Create a gain node for volume control
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Start at full volume

	// Decay the volume over 3 seconds to simulate the bell's echo
	gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);

	// Connect the oscillator to the gain node and the gain node to the audio context
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start();

	// Stop the oscillator after 4 seconds
	oscillator.stop(audioContext.currentTime + 4);
}

// Simulate a church bell that strikes every 5 seconds
setInterval(playBell, 5000);
