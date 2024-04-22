// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create Oscillators for the two tones
const oscillator1 = audioContext.createOscillator();
const oscillator2 = audioContext.createOscillator();

// Set frequencies for the two tones (using frequencies for DTMF dial tone)
const frequency1 = 350; // Hz
const frequency2 = 440; // Hz

// Set the type of the oscillators to sine wave
oscillator1.type = 'sine';
oscillator2.type = 'sine';

// Set frequencies for the oscillators
oscillator1.frequency.setValueAtTime(frequency1, audioContext.currentTime);
oscillator2.frequency.setValueAtTime(frequency2, audioContext.currentTime);

// Create a gain node to control the volume
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.1; // Set volume level

// Connect the oscillators to the gain node
oscillator1.connect(gainNode);
oscillator2.connect(gainNode);

// Connect the gain node to the AudioContext's destination (speakers)
gainNode.connect(audioContext.destination);

// Start the oscillators
oscillator1.start();
oscillator2.start();

// Stop the oscillators after a certain duration (e.g., 3 seconds)
setTimeout(() => {
	oscillator1.stop();
	oscillator2.stop();
}, 3000);
