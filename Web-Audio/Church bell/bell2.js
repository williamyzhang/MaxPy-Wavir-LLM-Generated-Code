// Define the context for the Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playChurchBell() {
  // Create oscillator for tone generation
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Sine wave for smooth bell sound
  oscillator.frequency.setValueAtTime(660, audioContext.currentTime); // Set frequency to 660 Hz for a bell-like tone

  // Create gain (volume) node to control the envelope
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode); // Connect the oscillator to the gain node
  gainNode.connect(audioContext.destination); // Connect gain node to the output

  // Envelope for the bell sound
  gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start with silence
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01); // Quick attack to max volume
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3); // Slow decay to mimic the ringing of the bell

  oscillator.start(audioContext.currentTime); // Start the oscillator

  // Stop the oscillator after 4 seconds to end the sound
  oscillator.stop(audioContext.currentTime + 4);
}

// Play the church bell sound
playChurchBell();
