window.addEventListener('DOMContentLoaded', () => {
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();

	oscillator.type = 'sine'; // set oscillator type to sine wave
	oscillator.frequency.setValueAtTime(350, audioContext.currentTime); // dial tone frequency
	gainNode.gain.value = 0.1; // adjust the volume

	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	const playButton = document.getElementById('playButton');

	playButton.addEventListener('click', () => {
		if (audioContext.state === 'suspended') {
			audioContext.resume();
		}
		if (audioContext.state === 'running') {
			oscillator.start();
		}
	});
});