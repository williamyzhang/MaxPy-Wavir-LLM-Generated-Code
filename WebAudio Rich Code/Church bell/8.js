// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function ringBell() {
	// Create oscillator for bell sound
	const oscillator = audioCtx.createOscillator();
	const gainNode = audioCtx.createGain();

	// Connect oscillator to gain node and gain node to output
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	// Initial settings for the oscillator
	oscillator.type = 'sine'; // Sine wave for smooth bell sound

	// Randomize the pitch slightly to simulate a real bell
	const baseFrequency = 300; // Base frequency in Hz
	const frequencyVariance = 30; // Variance in frequency for a natural effect
	oscillator.frequency.value = baseFrequency + Math.random() * frequencyVariance;

	// Gain (volume) envelope to simulate the bell strike
	gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
	gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1); // Bell strike is quick
	gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2); // Exponential decay of sound

	// Start and stop the oscillator to make sound
	oscillator.start(audioCtx.currentTime);
	oscillator.stop(audioCtx.currentTime + 2); // Stop after 2 seconds
}

// Ring the bell every 3 seconds
setInterval(ringBell, 3000);
