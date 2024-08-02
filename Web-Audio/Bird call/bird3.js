// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function birdCall(duration = 1000) {
  // Create an oscillator node for the bird call sound
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Sine wave for a smooth natural sound

  // Create a gain node to control the volume
  const gainNode = audioContext.createGain();

  // Connect the oscillator to the gain node and the gain node to the destination
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Frequency sweep for the bird call effect
  const startTime = audioContext.currentTime;
  const endTime = startTime + duration / 1000; // Convert duration from ms to seconds
  oscillator.frequency.setValueAtTime(1000, startTime); // Start frequency
  oscillator.frequency.exponentialRampToValueAtTime(6000, endTime); // End frequency higher for a chirp

  // Fade in and out for a more natural sound
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(1, startTime + duration / 4000); // Quick fade in
  gainNode.gain.linearRampToValueAtTime(0, endTime); // Fade out

  // Start and stop the oscillator
  oscillator.start(startTime);
  oscillator.stop(endEndTime);

  oscillator.onended = () => {
    // Cleanup after the sound has stopped playing
    oscillator.disconnect();
    gainNode.disconnect();
  };
}

// Trigger the bird call
birdCall(1500); // Duration of the bird call in milliseconds
