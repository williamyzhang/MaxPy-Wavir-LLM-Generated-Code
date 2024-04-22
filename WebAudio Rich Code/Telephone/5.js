// Function to initialize the Web Audio API context
function createDialTone() {
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();

	// Frequencies for the standard North American dial tone
	const frequencies = [350, 440];
	const oscillators = [];
	const gains = [];

	for (let i = 0; i < frequencies.length; i++) {
		// Create oscillator for each frequency
		const oscillator = audioContext.createOscillator();
		oscillator.type = 'sine'; // Dial tones are typically sine waves
		oscillator.frequency.setValueAtTime(frequencies[i], audioContext.currentTime);

		// Create gain (volume control) for each oscillator
		const gain = audioContext.createGain();
		gain.gain.setValueAtTime(0.5 + Math.random() * 0.05, audioContext.currentTime); // Random volume around 0.5

		// Connect each oscillator to its gain node
		oscillator.connect(gain);

		// Connect each gain node to the audio context's destination (speakers)
		gain.connect(audioContext.destination);

		// Start the oscillator
		oscillator.start();

		// Add to arrays to keep references
		oscillators.push(oscillator);
		gains.push(gain);
	}

	// Function to stop the dial tone
	function stopDialTone() {
		oscillators.forEach(osc => osc.stop(audioContext.currentTime));
		oscillators.forEach(osc => osc.disconnect());
		gains.forEach(gain => gain.disconnect());
	}

	return {
		stop: stopDialTone
	};
}

// Create and start the dial tone
const dialTone = createDialTone();

// Optionally stop the dial tone after some time
setTimeout(() => {
	dialTone.stop();
}, 5000); // Stops the dial tone after 5 seconds
