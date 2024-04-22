// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create nodes
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

// Set oscillator type to noise
oscillator.type = 'white';

// Set gain to control volume
gainNode.gain.value = 0.5;

// Connect nodes
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// Start oscillator
oscillator.start();

// Function to modulate gain for babbling effect
function babble() {
	// Randomize gain value slightly
	const randomGain = Math.random() * 0.2 + 0.4; // Adjust values to control intensity
	gainNode.gain.setValueAtTime(randomGain, audioContext.currentTime);

	// Schedule next modulation
	const nextTime = Math.random() * 2000 + 1000; // Adjust timing
	setTimeout(babble, nextTime);
}

// Start babbling
babble();
