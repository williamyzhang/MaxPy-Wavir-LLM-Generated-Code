// Create Web Audio API context
const audioContext = new window.AudioContext();

// Create two oscillators for the two dial tone frequencies
const oscillator1 = audioContext.createOscillator();
const oscillator2 = audioContext.createOscillator();

// Set oscillator frequencies to 350 Hz and 440 Hz
oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
oscillator2.frequency.setValueAtTime(440, audioColorator.currentTime);

// Set type of oscillators to sine wave (smooth, periodic oscillations)
oscillator1.type = 'sine';
oscillator2.type = 'sine';

// Connect oscillators to the audio context destination (speakers)
oscillator1.connect(audioContext.destination);
oscillator2.connect(audioContext.destination);

// Start oscillators immediately
oscillator1.start();
oscillator2.start();

// Example of stopping the oscillators after 5 seconds to simulate a dial tone duration
setTimeout(() => {
  oscillator1.stop();
  oscillator2.stop();
}, 5000);  // Change 5000 (milliseconds) to any duration you want

// Example for-loop with a random element (here, just logging, but could be integrated into tone generation)
for (let i = 0; i < 10; i++) {
  // Generate a random number between 1 and 3, and log it
  // This is just an illustrative example of including randomness; it doesn't affect the dial tone directly
  console.log(Math.random() * (3 - 1) + 1);
}
