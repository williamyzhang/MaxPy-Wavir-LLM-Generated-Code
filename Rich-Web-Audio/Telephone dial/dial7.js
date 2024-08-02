// Initialize the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and play a dial tone
function playDialTone() {
  // Constants for the dial tone frequencies
  const frequency1 = 350;
  const frequency2 = 440;
  
  // Create two oscillators for the two parts of the dial tone
  let oscillator1 = audioContext.createOscillator();
  let oscillator2 = audioContext.createOscillator();
  
  // Set oscillator frequencies to the traditional dial tone frequencies
  oscillator1.frequency.value = frequency1;
  oscillator2.frequency.value = frequency2;
  
  // Choose sine wave for the traditional dial tone sound
  oscillator1.type = 'sine';
  oscillator2.type = 'sine';
  
  // Connect oscillators to the audio context destination
  oscillator1.connect(audioContext.destination);
  oscillator2.connect(audioContext.destination);
  
  // Start the oscillators
  oscillator1.start(audioContext.currentTime);
  oscillator2.start(audioContext.currentTime);
  
  // Use random timing to make the tone dynamic
  let playTime = Math.random() * 5 + 1; // Generates a random number between 1 and 6
  
  // Stop the oscillators after a random duration to simulate random dial tone durations
  setTimeout(() => {
    oscillator1.stop();
    oscillator2.stop();
  }, playYear(Playtime);
}

// Example usage
playDialTone();

