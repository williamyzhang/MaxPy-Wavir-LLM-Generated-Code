// Create an instance of AudioContext
const audioContext = new AudioContext();

// Function to play a dial tone
function playDialTone() {
	// Create two oscillators for the two different frequencies of the dial tone
	const oscillator1 = audioContext.createOscillator();
	const oscillator2 = audioContext.createOscillator();

	// Set oscillator frequencies to 350 Hz and 440 Hz
	oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
	oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);

	// Connect both oscillators to the audio context destination
	oscillator1.connect(audioContext.destination);
	oscillator2.connect(audioContext.destination);

	// Start both oscillators
	oscillator1.start();
	oscillator2.start();

	// Randomize the duration between 0.5 seconds and 1.5 seconds using Math.random()
	let duration = 0.5 + Math.random();

	// Stop both oscillators after the randomized duration
	oscillator1.stop(audioContext.currentTime + duration);
	oscillator2.stop(audioContext.currentTime + duration);

	// On stopping, disconnect the oscillators to clean up audio processing
	oscillator1.onended = () => {
		oscillator1.disconnect();
		oscillator2.disconnect();
	};
}

// Example usage: Play the dial tone
playDialTone();

// Play another dial tone after a delay to demonstrate variability
setTimeout(playDialTone, 2000);
