// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create an oscillator node
const oscillator = audioContext.createOscillator();

// Set oscillator type to 'sine' for a smooth wave
oscillator.type = 'sine';

// Set frequency of the oscillator to mimic a bird call
const frequency = 1000; // Adjust as needed
oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

// Connect the oscillator to the audio output
oscillator.connect(audioContext.destination);

// Start the oscillator
oscillator.start();

// Set a timeout to stop the sound after a certain duration
const duration = 2000; // in milliseconds
setTimeout(() => {
	oscillator.stop();
}, duration);
