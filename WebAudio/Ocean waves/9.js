// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create wave sound
function createWaveSound() {
	const osc = audioContext.createOscillator();
	const gainNode = audioContext.createGain();

	// Set oscillator type to sine wave (imitating smooth waves)
	osc.type = 'sine';

	// Set initial frequency and volume
	osc.frequency.value = 200; // Adjust this value to change the pitch of the waves
	gainNode.gain.value = 0.1; // Adjust this value to change the volume of the waves

	// Connect oscillator to gain node
	osc.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start and stop the oscillator to create wave-like sound
	const startTime = audioContext.currentTime;
	osc.start(startTime);
	gainNode.gain.exponentialRampToValueAtTime(0.00001, startTime + 3); // Adjust the second parameter to change the duration of the wave sound
	osc.stop(startTime + 3); // Adjust the parameter to change the duration of the wave sound
}

// Create wave sound
createWaveSound();
