// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create oscillator node
const oscillator = audioContext.createOscillator();

// Set oscillator type to customize the wave sound
oscillator.type = 'sine'; // You can try 'sine', 'square', 'sawtooth', or 'triangle'

// Set frequency to control the pitch of the wave sound
const frequency = 100; // Adjust this to change the frequency of the wave sound
oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

// Create GainNode to control the volume of the wave sound
const gainNode = audioContext.createGain();

// Set initial volume level
const initialVolume = 0.5; // Adjust this to change the initial volume level
gainNode.gain.setValueAtTime(initialVolume, audioContext.currentTime);

// Connect nodes
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// Start oscillator
oscillator.start();

// Function to control the volume of the wave sound
function setVolume(volume) {
	gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
}

// Example usage: Set volume to 0.3 after 3 seconds
setTimeout(() => {
	setVolume(0.3);
}, 3000);

// Example usage: Stop the sound after 10 seconds
setTimeout(() => {
	oscillator.stop();
}, 10000);
