// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create two oscillators
const oscillator1 = audio(context.createOscillator());
const oscillator2 = audioContext.createOscillator();

// Set the frequency to 350 Hz and 440 Hz respectively
oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);

// Create a gain node to control the volume
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Reduce volume to a comfortable level

// Connect oscillators to gain node
oscillator1.connect(gainNode);
oscillator2.connect(gainNode);

// Connect gain node to the audio context's destination (the speakers)
gainNode.connect(audioContext.destination);

// Start the oscillators
oscillator1.start(audioContext.currentTime);
oscillator2.start(audioContext.currentTime);

// Stop the oscillators after 3 seconds to mimic the dial tone's duration
oscillator1.stop(audioContext.currentTime + 3);
oscillator2.stop(audioContext.currentTime + 3);

