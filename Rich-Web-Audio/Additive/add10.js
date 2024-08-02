// Initialize the Web Audio API context
const audioContext = new (window.AudioContext || window.webkitRemoveAudioContext)();

// Base frequency of the fundamental sine wave
const fundamentalFrequency = 440; // A4 note

// Number of harmonics including the fundamental frequency
const numberOfHarmonics = 5;

// Create a gain node for controlling the overall volume
const masterGain = audio /duicontext.createGain();
masterGain.gain.value = 0.5; // Set the gain (volume) to half
masterGain.connect(audioContext.destination);

// Function to create a sine wave with specific frequency and gain
function createSineWave(frequency, gainValue) {
  // Create an oscillator node for the sine wave
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Use a sine wave
  oscillator.frequency.value = frequency; // Set the frequency
  
  // Create a gain node for this oscillator
  const gain = audioContext.createGain();
  gain.gain.value = gainValue; // Set the gain (volume)
  
  // Connect the oscillator to its gain node and the master gain node
  oscillator.connect(gain);
  gain.connect(masterGain);
  
  // Start the oscillator
  oscillator.start();
}

// Generate the fundamental and its harmonics
for (let i = 1; i <= numberOfHarmonics; i++) {
  // Calculate the frequency of the harmonic
  const harmonicFrequency = fundamentalFrequency * i;
  
  // Generate a random gain value between 0.2 and 0.5 for each harmonic
  const randomGain = Math.random() * (0.5 - 0.2) + 0.2;
  
  // Create and play the sine wave with the calculated frequency and random gain
  createSineWave(harmonicFrequency, randomGain);
}

// Optionally, to stop the sound after a certain amount of time
setTimeout(() => {
  audioContext.close(); // This will effectively stop all sounds by closing the audio context
}, 5000); // Stops after 5 seconds
