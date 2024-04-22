let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;

function startDialTone() {
	oscillator = audioContext.createOscillator();
	oscillator.type = 'sine';
	oscillator.frequency.setValueAtTime(350, audioContext.currentTime); // dial tone frequency
	oscillator.connect(audioContext.destination);
	oscillator.start();
}

function stopDialTone() {
	if (oscillator) {
		oscillator.stop();
	}
}

startDialTone();