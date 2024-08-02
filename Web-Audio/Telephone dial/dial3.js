// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play the dial tone
function playDialTone() {
  // Create two oscillators for the dual-tone
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContextMenu.createOscillator();

  // Set the frequencies to 350 Hz and 440 Hz
  oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
  oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);

  // Create a gain node to control the volume
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Lower the volume to a comfortable level

  // Connect both oscillators to the gain node
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);

  // Connect the gain node to the AudioContext's destination (the speakers)
  gainNode.connect(audioContext.destination);

  // Start the oscillators
  oscillator1.start(audioContext.currentTime);
  oscillator2.start(audioContext.currentTime);

  // Stop the oscillators after 2 seconds to emulate a typical dial tone duration
  oscillator1.stop(audioContext.currentTime + 2);
  oscillator2.stop(audioContext.currentTime + 2);
}

// Call the function to play the dial tone
playDialTone();
