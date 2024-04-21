// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create audio nodes
const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

// Connect nodes
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// Set oscillator type to sine wave
oscillator.type = 'sine';

// Set initial frequency and gain values
const baseFrequency = 220; // Adjust this for different pitch
const maxFrequencyVariation = 20; // Maximum variation from base frequency
const baseGain = 0.3;
const maxGainVariation = 0.1;

// Set up function to generate random variations
function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

// Function to update oscillator parameters
function updateOscillator() {
	const frequency = baseFrequency + randomRange(-maxFrequencyVariation, maxFrequencyVariation);
	const gain = baseGain + randomRange(-maxGainVariation, maxGainVariation);

	oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
	gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
}

// Start oscillator
oscillator.start();

// Schedule updates to oscillator parameters
setInterval(updateOscillator, 200); // Adjust interval for desired variation speed
