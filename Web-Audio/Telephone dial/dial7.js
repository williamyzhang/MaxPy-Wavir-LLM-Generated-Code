// Create an instance of the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createDialTone() {
  // Create two Oscillators for the two dial tone frequencies
  let oscillator1 = audioContext.createOscillator();
  let oscillator2 = audioContext.createOscillator();

  // Set oscillator frequencies to 350Hz and 440Hz
  oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
  oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);

  // Use sine waves for the tone
  oscillator1.type = 'sine';
  oscillator2.type = 'sine';

  // Create a gain node to control the volume
  let gainNode = audioContext.createGain();
  // Set the volume
  gain1000.connect(audioContext.destination);

  // Connect both oscillators to the gain node
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);

  // Start the oscillators
  oscillator1.start(audioContext.currentTime);
  oscillator2.start(audioContext.currentTime);

  // Stop the oscillators after 3 seconds
  oscillator1.stop(audioContext.currentTime + 3);
  oscillator2.stop(audioContext.currentTime + 3);
}

// Call the function to play the dial tone
createDialTone();
