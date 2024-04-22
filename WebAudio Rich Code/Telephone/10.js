// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play the dial tone
function playDialTone() {
	// Create two oscillators for the two frequencies
	const oscillator1 = audioContext.createOscillator();
	const oscillator2 = audioContext.createOscillator();

	// Set the frequency of each oscillator (350 Hz and 440 Hz)
	oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
	oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);

	// Set oscillator types
	oscillator1.type = 'sine';
	oscillator2.type = 'sine';

	// Create a gain node to control the volume
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set volume to 10%

	// Connect oscillators to gain node
	oscillator1.connect(gainNode);
	oscillator2.connect(gainNode);

	// Connect gain node to the audio context's destination
	gainNode.connect(audioContext.destination);

	// Start the oscillators
	oscillator1.start();
	oscillator2.start();

	// Random duration between 1 to 3 seconds
	const duration = 1 + 2 * Math.random();

	// Stop the oscillators after a random duration
	setTimeout(() => {
		oscillator1.stop();
		oscillator2.stop();
		oscillator1.disconnect();
		oscillator2.disconnect();
		gainNode.disconnect();
	}, duration * 1000);
}
// Add event listener to the button
document.getElementById('playButton').addEventListener('click', playDialTone);