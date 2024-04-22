// Create a new audio context
const audioContext = new AudioContext();

// Function to create an oscillator and gain, set frequency and connect them
function createTone(frequency, volume) {
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();

	oscillator.type = 'sine';  // Sine wave — smooth periodic oscillation
	oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Frequency in Hz
	gainNode.gain.setValueAtTime(volume, audioContext.currentTime); // Volume control

	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	return oscillator;
}

// Function to start the dial tone
function startDialTone() {
	// Frequencies for a standard North American dial tone
	const frequencies = [350, 440];
	const oscillators = [];

	for (let i = 0; i < frequencies.length; i++) {
		// Random volume between 0.1 and 0.5 for each tone
		const volume = Math.random() * 0.4 + 0.1;
		const oscillator = createTone(frequencies[i], volume);
		oscillator.start();
		oscillators.push(oscillator);
	}

	// Stop the dial tone after 5 seconds
	setTimeout(() => {
		oscillators.forEach(osc => osc.stop());
	}, 5000);
}

// Start the dial tone
startDialTone();
