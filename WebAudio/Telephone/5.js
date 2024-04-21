let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;

function startDialTone() {
	oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // Sine wave for dial tone
	oscillator.frequency.setValueAtTime(350, audioContext.currentTime); // Dial tone frequency
	oscillator.connect(audioContext.destination);
	oscillator.start();
}

function stopDialTone() {
	if (oscillator) {
		oscillator.stop();
	}
}

startDialTone();