// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Base frequency for our sine wave
const baseFrequency = 440; // A4 note as an example

// Number of oscillators to create
const numberOfOscillators = 5;

// Gain value for each oscillator to control the overall volume when summing
const oscillatorGainValue = 0.2;

// Create a gain node for master control
const masterGain = audioCtx.createGain();
masterGain.gain.value = 0.5; // Adjust master volume
masterGain.connect(audioCtx.destination);

// Function to create an oscillator
function createOscillator(freq) {
  let oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  
  let oscillatorGain = audioCtx.createGain();
  oscillatorGain.gain.value = oscillatorGainValue;
  
  oscillator.connect(oscillatorGain);
  oscillatorGain.connect(masterGain);
  
  oscillator.start();
}

// Generate additional oscillators at random frequencies around the base frequency
for (let i = 0; i < numberOfOscillators; i++) {
  // Create a random multiplier for the frequency to add variability
  let randomMultiplier = Math.random() * 2; // Random between 0 and 2
  let freq = baseFrequency * randomMultiplier; // Calculate random frequency around the base
  createOscillator(freq);
}
