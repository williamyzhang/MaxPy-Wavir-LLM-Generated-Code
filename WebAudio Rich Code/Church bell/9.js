// Function to create and play a church bell sound
function playChurchBell() {
	// Create audio context
	const audioCtx = new AudioContext();

	// Define the base frequency for the bell (tuned to a typical bell)
	const baseFrequency = 440;  // A4 note, adjust as needed for different bell tones

	// Create an oscillator for generating sound waves
	const oscillator = audioCtx.createOscillator();
	oscillator.type = 'sine';  // Sine wave for a smooth bell sound

	// Set the frequency of the oscillator
	oscillator.frequency.setValueAtTime(baseFrequency, audioCtx.currentTime);

	// Create a gain node for controlling the amplitude of the sound
	const gainNode = audioCtx.createGain();
	gainNode.gain.setValueAtTime(1, audioCtx.currentTime);  // Start at full volume

	// Connect oscillator to gain node
	oscillator.connect(gainNode);

	// Connect gain node to the audio context's output
	gainNode.connect(audioCtx.destination);

	// Randomize the decay rate slightly using Math.random()
	const decayRate = 1.5 + Math.random() * 0.5;  // Decay rate between 1.5 and 2.0 seconds

	// Exponentially decrease the gain to simulate the bell sound fading out
	gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + decayRate);

	// Start the oscillator
	oscillator.start(audioCtx.currentTime);

	// Stop the oscillator after the decay has finished
	oscillator.stop(audioCtx.currentTime + decayRate + 0.1);
}

// Trigger the function to play the church bell sound
playChurchBell();

// Optionally, set intervals to repeat the bell sound
setInterval(playChurchBell, 3000);  // Repeat every 3000 milliseconds (3 seconds)
