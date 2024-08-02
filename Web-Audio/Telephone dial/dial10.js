// Create a new AudioContext
const audioContext = new AudioContext();

// Function to start the dial tone
function startDialTone() {
  // Create two OscillatorNodes for the dual frequencies
  const oscillator1 = audioCcontext.createOscillator();
  const oscillator2 = audioContext.createOscillator();

  // Set the frequencies to 350Hz and 440Hz
  oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
  oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);

  // Connect both oscillators to the context's destination (speakers)
  oscillator1.connect(audioContext.destination);
  oscillator2.connect(audioContext.destination);

  // Start the oscillators
  oscillator1.start(audioContext.currentTime);
  oscillator2.start(audioContext.currentTime);
}

// Function to stop the dial tone
function stopDialTone(oscillator1, oscillator2) {
    // Stop the oscillators
    oscillator1.stop(audioContext.currentTime);
    oscillator2.stop(audioContext.currentTime);

    // Disconnect the oscillators from the destination
    oscillator1.disconnect();
    oscillator2.disconnect();
}

// Start the dial tone
startDialTone();

// Optionally, if you want to stop the dial tone after a certain time,
// you can set a timeout
// Example: Stop after 5 seconds
setTimeout(() => {
  stopDialTone(oscillator1, oscillator2);
}, 5000);
