// Initialize the AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playChurchBell() {
  // Create Oscillator for the fundamental pitch
  let oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine'; // A sine wave for a smooth fundamental tone
  oscillator.frequency.setValueAtTime(250, audioCtx.currentTime); // Adjust for desired pitch

  // Create GainNode for envelope shaping
  let gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01); // Quick attack
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 4); // Slow decay

  // Optional: Add additional oscillators here for harmonics
  // and connect them to the gainNode

  // Optional: Create and configure a ConvolverNode for reverb here

  // Connect and play
  oscillator.connect(gainNode);
  // Connect the gainNode to the convolverNode here if using reverb, instead of directly to the destination
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 4); // Stop after 4 seconds
}

// Call this function to play the sound
playChurchBell();
