
// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

let oscillator;

// Function to start dial tone
function startDialTone() {
	oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(350, audioContext.currentTime); // Set frequency to 350 Hz
oscillator.connect(audioContext.destination);
oscillator.start();
}

	// Function to stop dial tone
function stopDialTone() {
	if (oscillator) {
			oscillator.stop();
	}
}

startDialTone();