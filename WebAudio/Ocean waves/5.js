// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create an oscillator node for generating the wave sound
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // You can experiment with different waveforms
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frequency of the waves
oscillator.start();

// Create a gain node to control the volume
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Set initial volume

// Connect oscillator to gain node and gain node to audio context destination
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// Function to simulate wave sounds by modulating the volume
function simulateWaves() {
	const now = audioContext.currentTime;
	// Modulate the volume to create the sound of waves
	gainNode.gain.setValueAtTime(0.5, now);
	gainNode.gain.exponentialRampToValueAtTime(0.001, now + 3); // Adjust the duration and curve as needed
}

// Call the function to start simulating waves
simulateWaves();
