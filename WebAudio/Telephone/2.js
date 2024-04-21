function startDialTone() {
	// Create audio context
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioContext = new AudioContext();

	// Create oscillator node for the dial tone
	var oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // Sine wave for dial tone
	oscillator.frequency.setValueAtTime(350, audioContext.currentTime); // Frequency for dial tone
	oscillator.connect(audioContext.destination); // Connect oscillator to audio output
	oscillator.start(); // Start the oscillator
}

// Function to stop the dial tone
function stopDialTone() {
	// Stop the audio context to stop the dial tone
	audioContext.close();
}

startDialTone();