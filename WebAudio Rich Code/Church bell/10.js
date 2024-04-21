// Create a new audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a church bell sound
function playBell() {
	// Create an oscillator for the bell sound
	let oscillator = audioCtx.createOscillator();
	let gainNode = audioCtx.createGain();

	// Connect oscillator to gain node and gain node to output
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	// Set initial gain to prevent clicking sound
	gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

	// Configure the oscillator
	oscillator.type = 'sine'; // Sine wave for a smooth bell sound

	// Set the frequency using a base frequency and add some randomness
	const baseFrequency = 300; // Base frequency in Hz
	const randomShift = Math.random() * 100 - 50; // Random shift in Hz
	oscillator.frequency.setValueAtTime(baseFrequency + randomShift, audioCtx.currentTime);

	// Envelope for the bell sound
	const attackTime = 0.2; // Time in seconds for the sound to reach full volume
	const decayTime = 2.5; // Time in seconds for the sound to fade out
	const sustainLevel = 0.7; // Sustain level (0 to 1)
	const releaseTime = 1.5; // Time in seconds for the sound to end after key release

	// Gain envelope to shape the bell sound
	gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + attackTime);
	gainNode.gain.linearRampToValueAtTime(sustainLevel, audioCtx.currentTime + attackTime + decayTime);
	gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + attackTime + decayTime + releaseTime);

	// Start and stop the oscillator after the envelope has completed
	oscillator.start();
	oscillator.stop(audioCtx.currentTime + attackTime + decayTime + releaseTime);
}

// Add a loop to simulate the ringing of the church bell every few seconds
setInterval(playBell, 3000); // Ring the bell every 3 seconds
