// Create an AudioContext
const audioContext = new AudioContext();

// Define the fundamental frequency
const fundamentalFrequency = 440; // A4 note

// Number of harmonics including the fundamental
const numberOfHarmonics = 5;

// Create a gain node to control the output level
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.2; // Reduce the master volume to avoid clipping
masterGain.connect(audioContext.destination);

// Function to create an oscillator for a harmonic
function createHarmonic(frequency, gainValue) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;

  const gain = audioContext.createGain();
  gain.gain.value = gainValue;

  oscillator.connect(gain);
  gain.connect(masterGain);

  return oscillator;
}

// Create the fundamental and harmonics
const oscillators = [];
for (let n = 1; n <= numberOfHarmonics; n++) {
  const harmonicFrequency = fundamentalFrequency * n; // Frequency of the n-th harmonic
  const gainValue = 1 / n; // Simple decreasing amplitude for each harmonic
  const oscillator = createHarmonic(harmonicFrequency, gainValue);
  oscillators.push(oscillator);
}

// Start the oscillators
oscillators.forEach(oscillator => {
  oscillator.start();
});

// Stop the oscillators after some time
setTimeout(() => {
  oscillators.forEach(oscillator => {
    oscillator.stop();
  });
}, 2000); // Stop after 2 seconds
