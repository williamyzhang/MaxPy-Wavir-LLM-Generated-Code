// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create gain node for controlling overall volume
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5; // Set initial volume

// Create low-pass filter node to simulate water sounds
const filterNode = audioContext.createBiquadFilter();
filterNode.type = 'lowpass'; // Set filter type to low-pass
filterNode.frequency.value = 800; // Adjust cutoff frequency

// Connect nodes
gainNode.connect(filterNode);
filterNode.connect(audioContext.destination);

// Create oscillator nodes for generating noise
const osc1 = audioContext.createOscillator();
const osc2 = audioContext.createOscillator();

// Set oscillator types to 'noise'
osc1.type = 'noise';
osc2.type = 'noise';

// Set frequencies slightly detuned for a more natural sound
osc1.frequency.value = 200;
osc2.frequency.value = 202;

// Connect oscillators to gain node
osc1.connect(gainNode);
osc2.connect(gainNode);

// Start oscillators
osc1.start();
osc2.start();

// Function to control the intensity of the brook sound
function setIntensity(intensity) {
	// Adjust gain node's gain value based on intensity (between 0 and 1)
	gainNode.gain.value = intensity;
}

// Example usage
setIntensity(0.5); // Set intensity to 50%
