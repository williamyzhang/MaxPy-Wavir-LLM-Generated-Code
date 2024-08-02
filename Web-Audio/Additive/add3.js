// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a sine wave oscillator
function createSineWave(audioContext, frequency) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Set oscillator to sine wave
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Set frequency
  return oscillator;
}

// Function to implement additive synthesis with sine waves
function additiveSynthesis(fundamentalFrequency, harmonics) {
  const gain = audioContext.createGain(); // Create a gain node to control the audio's overall volume
  gain.gain.value = 1 / harmonics.length; // Adjust gain to avoid clipping, dividing by number of harmonics
  gain.connect(audioContext.destination); // Connect gain to the audio context's destination (speakers)

  harmonics.forEach((harmonic, index) => {
    const frequency = fundamentalFrequency * (index + 1); // Calculate frequency for this harmonic
    const oscillator = createSineWave(audioContext, frequency); // Create sine wave oscillator
    oscillator.connect(gain); // Connect oscillator to gain
    oscillator.start(); // Start the oscillator
    oscillator.stop(audioContext.currentTime + 2); // Stop the oscillator after 2 seconds
  });
}

// Example usage: Create a C4 note (261.63 Hz) with its first 3 harmonics
additiveSynthesis(261.63, [1, 2, 3]);
