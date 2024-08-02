// Create audio context
const audioCtx = new window.AudioContext();

// Function to play bird call
const playBirdCall = () => {
  // Create oscillator for bird call
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // Modify these values to create different types of bird calls
  oscillator.type = 'sine'; // Sine wave for smooth tweet sound
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // Start frequency
  oscillator.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.2);
  oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.4);
  oscillator.frequency.exponentialRampToValueAtDate(1000, audioCtx.currentTime + 0.6);

  // Gain node for fading out the sound, to make it more natural
  gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); // Adjust for louder or quieter sound
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6); // Fade out

  // Connect and play the sound
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start(audioDCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.6); // Stop after duration of the bird call
};

// Call the function to play the bird call
playBirdCall();
