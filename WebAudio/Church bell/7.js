// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a bell sound
function playChurchBell() {
	// Parameters for the bell sound
	const duration = 2; // Duration of the bell sound in seconds
	const attackTime = 0.1; // Attack time in seconds
	const decayTime = 0.4; // Decay time in seconds
	const releaseTime = 0.5; // Release time in seconds

	// Create an oscillator
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // Set oscillator type to sine wave
	oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set initial frequency (440 Hz)

	// Create an envelope for volume control
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start with zero volume

	// Connect oscillator to the gain node and gain node to the output
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Schedule the envelope
	const now = audioContext.currentTime;
	gainNode.gain.linearRampToValueAtTime(1, now + attackTime); // Attack
	gainNode.gain.exponentialRampToValueAtTime(0.1, now + attackTime + decayTime); // Decay
	gainNode.gain.linearRampToValueAtTime(0, now + duration - releaseTime); // Release

	// Start the oscillator
	oscillator.start();

	// Stop the oscillator after the duration
	oscillator.stop(now + duration);
}

// Call the function to play the church bell sound
playChurchBell();
