// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create a church bell sound
function createChurchBell() {
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();

	oscillator.type = 'sine'; // You can experiment with other wave types for different sounds
	oscillator.frequency.setValueAtTime(300, audioContext.currentTime); // Adjust frequency for desired pitch

	// Envelope - simulate bell's sound decay over time
	gainNode.gain.setValueAtTime(1, audioContext.currentTime);
	gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2); // Adjust the duration as needed

	// Connect nodes
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start();
}

// Call the function to create the bell sound
createChurchBell();
