// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Create oscillator node
const oscillator = audioCtx.createOscillator();

// Set oscillator type to sine wave for bell-like sound
oscillator.type = 'sine';

// Set frequency for the bell sound (adjust as needed)
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);

// Create GainNode to control volume
const gainNode = audioCtx.createGain();

// Set initial volume to 0
gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

// Connect oscillator to gain node
oscillator.connect(gainNode);

// Connect gain node to the audio output
gainNode.connect(audioCtx.destination);

// Start the oscillator
oscillator.start();

// Gradually increase the volume to simulate the fading in of the bell sound
gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 2);

// Schedule the volume to decrease after 2 seconds to simulate the ringing of the bell
gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4);
