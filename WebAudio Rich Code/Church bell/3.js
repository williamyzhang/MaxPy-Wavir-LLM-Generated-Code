// Initialize the AudioContext
const audioContext = new AudioContext();

// Function to create and play a bell sound
function playBell() {
	// Create an oscillator
	const oscillator = audioContext.createOscillator();
	// Create a gain node
	const gainNode = audioContext.createGain();

	// Configure the oscillator for a bell-like sound
	oscillator.type = 'sine'; // A sine wave for a smooth bell sound
	oscillator.frequency.setValueAtTime(400 + Math.random() * 100, audioContext.currentTime); // Randomize the frequency for variability

	// Configure the gain node to fade the sound, simulating a bell strike
	gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Start at full volume
	gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5); // Fade out quickly

	// Connect the oscillator to the gain node and the gain node to the output
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start(audioContext.currentTime);
	// Stop the oscillator after 1.5 seconds to simulate the bell striking
	oscillator.stop(audioContext.currentTime + 1.5);
}

// Schedule multiple bell strikes with random intervals
for (let i = 0; i < 5; i++) {
	// Random delay for the strike
	const randomDelay = i * 2 + Math.random() * 2;
	setTimeout(playBell, randomDelay * 1000); // Convert seconds to milliseconds
}

