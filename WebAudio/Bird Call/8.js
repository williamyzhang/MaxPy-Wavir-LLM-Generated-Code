// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Define parameters
const duration = 2; // Duration of the bird call in seconds
const frequency = 2000; // Frequency of the bird call in Hz

// Create oscillator node
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Sine wave for a pure tone
oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

// Create gain node to control volume
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0, audioContext.currentTime);
gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1);
gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration - 0.1);

// Connect nodes
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// Start the oscillator
oscillator.start();

// Stop the oscillator after the specified duration
oscillator.stop(audioContext.currentTime + duration);
