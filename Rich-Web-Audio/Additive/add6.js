// Create the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Define the fundamental frequency
const fundamentalFrequency = 220; // A3 note

// Define the number of harmonics
const numberOfHarmonics = 5;

// Create a gain node for master volume control
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.2; // Reduce the volume to avoid clipping
masterGain.connect(audioContext.destination);

// Function to create a sine wave oscillator
function createSineWaveOscillator(frequency, gainValue) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  const gain = audioContext.createGain();
  gain.gain.value = gainValue;

  oscillator.frequency.value = frequency;
  oscillator.connect(gain);
  gain.connect(masterGain);

  oscillator.start();
  return oscillator;
}

// Generate harmonics using additive synthesis
for (let n = 1; n <= numberOfHarmonics; n++) {
  // Calculate harmonic frequency
  const harmonicFrequency = fundamentalFrequency * n;

  // Randomize the amplitude (gainValue) for each harmonic
  const gainValue = Math.random() * 0.5;

  // Create oscillator for each harmonic
  createSineWaveOscillator(harmonicFrequency, gainValue);
}

// Optionally, you can stop all oscillators after a set period
setTimeout(() => {
  masterGain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
}, 2000); // Stop after 2 seconds
