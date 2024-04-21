// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Define frequencies for dial tone
const dialToneFreq1 = 350;
const dialToneFreq2 = 440;

// Create OscillatorNodes for each frequency
const oscillator1 = audioContext.createOscillator();
oscillator1.type = 'sine';
oscillator1.frequency.setValueAtTime(dialToneFreq1, audioContext.currentTime);
oscillator1.start();

const oscillator2 = audioContext.createOscillator();
oscillator2.type = 'sine';
oscillator2.frequency.setValueAtTime(dialToneFreq2, audioContext.currentTime);
oscillator2.start();

// Connect OscillatorNodes to the AudioContext's destination
oscillator1.connect(audioContext.destination);
oscillator2.connect(audioContext.destination);

// Stop the oscillators after a specified duration (in milliseconds)
const duration = 5000; // 5 seconds
setTimeout(() => {
	oscillator1.stop();
	oscillator2.stop();
}, duration);
