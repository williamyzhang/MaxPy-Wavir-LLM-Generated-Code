// Create audio context
const audioContext = new AudioContext();

// Create a function to generate a dial tone
function generateDialTone() {
	// Define the frequencies for the dial tone (350 Hz and 440 Hz)
	const frequencies = [350, 440];

	// Create an array to hold the oscillators
	let oscillators = [];

	for (let i = 0; i < frequencies.length; i++) {
		// Create oscillator for each frequency
		const oscillator = audioContext.createOscillator();
		oscillator.type = 'sine';
		oscillator.frequency.setValueAtTime(frequencies[i], audioContext.currentTime);

		// Randomize the gain slightly to add some variation
		const gain = audioContext.createGain();
		gain.gain.setValueAtTime(0.5 + Math.random() * 0.1, audioContext.currentTime);

		// Connect oscillator to gain and gain to the audio context's destination
		oscillator.connect(gain);
		gain.connect(audioContext.destination);

		// Start the oscillator
		oscillator.start();

		// Add oscillator to the array
		oscillators.push(oscillator);
	}

	// Function to stop the dial tone
	function stopDialTone() {
		oscillators.forEach(oscillator => {
			oscillator.stop();
			oscillator.disconnect();
		});
	}

	// Stop the dial tone after 5 seconds
	setTimeout(stopDialTone, 5000);
}

// Call the function to play the dial tone
generateDialTone();
