// Create the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a sine wave oscillator at a specified frequency
function createOscillator(frequency) {
	const oscillator = audioContext.createOscillator(); // Create oscillator
	oscillator.type = 'sine'; // Set type to sine wave
	oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Set frequency
	return oscillator;
}

// Function to play the dial tone
function playDialTone() {
	const frequencies = [350, 440]; // Frequencies for the dial tone
	const gain = audioContext.createGain(); // Create gain node
	gain.gain.setValueAtTime(0.5, audioContext.currentTime); // Set volume
	gain.connect(audioContext.destination); // Connect gain to output

	// Create and start oscillators
	for (let i = 0; i < frequencies.length; i++) {
		const oscillator = createOscillator(frequencies[i]);
		oscillator.connect(gain); // Connect oscillator to gain node

		// Add random delay up to 100ms before starting (not typical for a real dial tone)
		const randomDelay = Math.random() * 0.1;
		oscillator.start(audioContext.currentTime + randomDelay);
	}
}

// Button to start the dial tone
const button = document.createElement('button');
button.textContent = 'Play Dial Tone';
button.onclick = playDialTone;
document.body.appendChild(button);
