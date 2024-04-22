// Create an audio context
const audioContext = new AudioContext();

// Function to generate a dial tone
function generateDialTone() {
	const oscillators = [];
	const frequencies = [350, 440]; // Frequencies for the standard dial tone

	for (let i = 0; i < frequencies.length; i++) {
		// Create an oscillator for each frequency
		const oscillator = audioContext.createOscillator();
		oscillator.type = 'sine'; // Use sine wave
		oscillator.frequency.setValueAtTime(frequencies[i] + Math.random() * 10 - 5, audioContext.currentTime); // Random variation
		oscillators.push(oscillator);
	}

	// Create a gain node to control volume
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set volume to a reasonable level

	// Connect each oscillator to the gain node
	oscillators.forEach(osc => {
		osc.connect(gainNode);
	});

	// Connect the gain node to the audio context destination
	gainNode.connect(audioContext.destination);

	// Start the oscillators
	oscillators.forEach(osc => osc.start());

	// Stop the oscillators after 3 seconds
	setTimeout(() => {
		oscillators.forEach(osc => osc.stop());
		// Disconnect after stopping to clean up
		oscillators.forEach(osc => osc.disconnect());
		gainNode.disconnect();
	}, 3000);
}

// Start the dial tone when a specific action is performed (e.g., button click)
document.addEventListener('DOMContentLoaded', () => {
	const button = document.createElement('button');
	button.textContent = 'Play Dial Tone';
	button.addEventListener('click', generateDialTone);
	document.body.appendChild(button);
});
