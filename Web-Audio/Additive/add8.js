// Create AudioContext
const audioContext = new AudioContext();

// Define the fundamental frequency
const fundamentalFrequency = 220; // For example, A3

// Define harmonics' frequencies as multiples of the fundamental frequency
// and their respective amplitudes
const harmonics = [
  {frequencyMultiple: 1, amplitude: 0.8}, // First harmonic (fundamental frequency)
  {frequencyMultiple: 2, amplitude: 0.5}, // Second harmonic
  {frequencyMultiple: 3, amplitude: 0.3}, // Third harmonic
  {frequencyMultiple: 4, amplitude: 0.2}, // Fourth harmonic
  {frequencyMultiple: 5, amplitude: 0.1}, // Fifth harmonic
  // Add more harmonics as needed
];

// Create a gain node for controlling the overall volume
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.5; // Adjust overall volume
masterGain.connect(audioContext.destination);

// Function to create and play a harmonic
function playHarmonic(frequency, amplitude) {
  // Create oscillator for this harmonic
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Use sine wave
  oscillator.frequency.value = frequency; // Set frequency based on harmonic

  // Create gain node for this harmonic to control its amplitude
  const gain = audioContext.createGain();
  gain.gain.value = amplitude; // Set amplitude

  // Connect this oscillator through its gain node to the master gain
  oscillator.connect(gain);
  gain.connect(masterGain);

  // Start the oscillator
  oscillator.start();

  // Optionally stop the oscillator after some time
  // oscillator.stop(audioContext.currentTime + 2); // stops after 2 seconds
}

// Play all harmonics
harmonics.forEach(harmonic => {
  const frequency = fundamentalFrequency * harmonic.frequencyMultiple;
  playHarmonic(frequency, harmonic.amplitude);
});
