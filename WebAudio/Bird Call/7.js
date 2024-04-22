let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;

function startBirdCall() {
	oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // You can experiment with other wave types like 'square', 'sawtooth', or 'triangle'
	oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Adjust frequency to make different bird calls
	oscillator.connect(audioContext.destination);
	oscillator.start();
}

function stopBirdCall() {
	if (oscillator) {
		oscillator.stop();
		oscillator.disconnect();
	}
}

startBirdCall();