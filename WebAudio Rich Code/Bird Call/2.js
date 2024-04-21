// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function generateBirdCall() {
	let duration = 0.3;  // duration of each chirp in seconds
	let gap = 0.1;       // gap between chirps in seconds
	let baseFrequency = 1000;  // base frequency of the chirp in Hz
	let variation = 500;       // frequency variation in Hz

	for (let i = 0; i < 5; i++) {
		// Create an oscillator
		let oscillator = audioCtx.createOscillator();
		oscillator.type = 'sine';  // 'sine' wave type for smooth bird-like chirps

		// Randomly alter the frequency to simulate natural variation
		let frequency = baseFrequency + Math.random() * variation;
		oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

		// Create a gain node to control the volume
		let gainNode = audioCtx.createGain();
		gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);  // Start at low volume
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

		// Connect the oscillator to the gain node and the gain node to the audio context's destination
		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		// Start and stop the oscillator after the specified duration
		oscillator.start(audioCtx.currentTime + i * (duration + gap));
		oscillator.stop(audioCtx.currentTime + i * (duration + gap) + duration);
	}
}

// Call the function to play the bird call
generateBirdCall();
