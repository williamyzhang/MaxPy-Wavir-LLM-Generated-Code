// Initialize the AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function birdCall() {
  // Create the primary oscillator for the bird call
  const primaryOscillator = audioCtx.createOscillator();
  primaryOscillator.type = 'sine';
  primaryOscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // Start frequency
  
  // Modulate frequency to mimic bird call
  primaryOscillator.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.2); // Chirp up
  primaryOscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.4); // And back down

  // Create a gain node for volume control
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1); // Fade in
  gainNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + 0.4); // And fade out

  // Connect the oscillator to the gain node and the gain node to the context's destination
  primaryOscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // Start the oscillator
  primaryOscillator.start(audioCtx.currentTime);
  
  // Stop the oscillator after the sound is over
  primaryOscillator.stop(audioCtx.currentTime + 0.5);
}

// Call the function to play the bird call
birdCall();
