// Create an instance of the AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to play the dial tone
function playDialTone() {
  // Create two oscillators for the two frequencies of the dial tone
  const oscillator1 = audioCtx.createOscillator();
  const oscillator2 = audioCtx.createOscillator();

  // Set the type of oscillators
  oscillator1.type = 'sine'; // Pure tone
  oscillator2.type = 'sine';

  // Set the frequency of each oscillator to match the dial tone frequencies
  oscillator1.frequency.setValueAtTime(350, audioCtx.currentTime); // 350 Hz
  oscillator2.frequency.setValueAtTime(440, audioCtx.currentTime); // 440 Hz

  // Create a gain node (volume control)
  const gainNode = audioCtx.createGain();
  // Lower the volume to prevent harsh sounds
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

  // Connect the oscillators to the gain node
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);

  // Connect the gain node to the audio context destination (speakers)
  gainNode.connect(audioCtx.destination);

  // Start the oscillators
  oscillator1.start(audioCtx.currentTime);
  oscillator2.start(audioCtx.currentTime);

  // Stop the tone after a set time (e.g., 3 seconds)
  oscillator1.stop(audioCtx.currentTime + 3);
  oscillator2.stop(audioCtx.currentTime + 3);
}

// Call the function to play the dial tone
playDialTone();
