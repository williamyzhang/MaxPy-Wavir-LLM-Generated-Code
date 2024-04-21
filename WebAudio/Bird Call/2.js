// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator node
const oscillator = audioContext.createOscillator();

// Set oscillator type to 'sine' for a smooth sound
oscillator.type = 'sine';

// Set the frequency of the oscillator to mimic a bird call (adjust as needed)
oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);

// Connect the oscillator to the destination (speaker)
oscillator.connect(audioContext.destination);

// Start the oscillator
oscillator.start();

// Stop the oscillator after a certain duration (adjust as needed)
setTimeout(() => {
	oscillator.stop();
}, 2000); // Stop after 2 seconds
