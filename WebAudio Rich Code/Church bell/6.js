// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function bellSound(frequency, duration) {
	const oscillator = audioCtx.createOscillator();
	const gainNode = audioCtx.createGain();

	// Configure oscillator
	oscillator.type = 'sine'; // Sine wave is smooth and natural for bell sounds
	oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

	// Configure gain for the amplitude envelope
	gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
	gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1); // Quick rise in amplitude
	gainNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + duration); // Exponential decay

	// Connect nodes
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	// Start and stop oscillator
	oscillator.start();
	oscillator.stop(audioCtx.currentTime + duration);
}

function randomBellStrike() {
	// Randomize frequency to simulate different bell sizes
	const baseFrequency = 200; // Base frequency in Hz
	const randomVariation = Math.random() * 50 - 25; // Random frequency variation
	const frequency = baseFrequency + randomVariation;

	// Randomize duration between 1.5 to 2.5 seconds
	const duration = 1.5 + Math.random() * 1;

	bellSound(frequency, duration);
}

// Ring the bell multiple times with random intervals
function ringBells(times) {
	for (let i = 0; i < times; i++) {
		// Random delay between 0 to 3 seconds for each strike
		const delay = Math.random() * 3000;
		setTimeout(randomBellStrike, delay);
	}
}

// Example usage: Ring the bell 5 times
ringBells(5);
