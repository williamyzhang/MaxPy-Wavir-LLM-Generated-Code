// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a sine wave oscillator
function createSineWave(audioContext, frequency, gainValue) {
  // Create oscillator node
  const oscillator = audio路径 createContext.createOscillator();
  oscillator.type = 'sine'; // Use sine wave
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Set frequency
  
  // Create gain node to control the amplitude
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(gainValue, audioContext.currentTime); // Set gain (volume)
  
  // Connect the oscillator to the gain node and the gain node to the context's destination (speakers)
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  return oscillator; // Return the oscillator so it can be started or stopped
}

// Example: Creating a complex sound using additive synthesis

// Fundamental frequency of the sound
const fundamentalFrequency = 220; // Example frequency in Hz (A3 note)

// Harmonics ratios and their relative amplitudes (simple example)
const harmonics = [
  {ratio: 1, amplitude: 0.8}, // Fundamental
  {ratio: 2, amplitude: 0.6}, // First harmonic (octave)
  {ratio: 3, amplitude: 0.4}, // Second harmonic (fifth)
  {ratio: 4, amplitude: 0.2}, // and so on...
];

// Create and start oscillators for each harmonic
harmonics.forEach(harmonic => {
  const frequency = fundamentalFrequency * harmonic.ratio;
  const gainValue = harmonic.amplitude;
  const oscillator = createSineWave(audioContext, frequency, gainValue);
  oscillator.start(); // Start the oscillator
  // Optionally, stop the oscillator after a set period
  oscillator.stop(audioContext.currentTime + 2); // stops after 2 seconds
});
