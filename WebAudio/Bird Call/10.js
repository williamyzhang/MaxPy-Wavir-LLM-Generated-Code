function playBirdCall() {
	// Create audio context
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	const audioContext = new AudioContext();

	// Create oscillator
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // You can experiment with different waveforms
	oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency of the bird call

	// Create envelope for smoother sound
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0, audioContext.currentTime);
	gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1); // Attack
	gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1); // Release

	// Connect nodes
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start();

	// Stop the oscillator after 1 second
	setTimeout(() => {
		oscillator.stop();
	}, 1000);
}