// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an OscillatorNode
const oscillator = audioContext.createOscillator();

// Set the frequency and type of the oscillator to generate a bird-like sound
oscillator.type = 'sine'; // You can experiment with different types like 'sawtooth', 'triangle', or 'square' for different sounds
oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Adjust the frequency to change the pitch of the bird call

// Connect the oscillator to the destination (your speakers)
oscillator.connect(audioContext.destination);

// Start the oscillator
oscillator.start();

// Stop the oscillator after a duration (e.g., 1 second)
setTimeout(() => {
	oscillator.stop();
}, 1000); // Adjust the duration of the bird call as needed
