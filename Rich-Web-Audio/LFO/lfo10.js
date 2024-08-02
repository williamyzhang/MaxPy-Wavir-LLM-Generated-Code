// Create an Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to add vibrato to a sine wave
function addVibrato(frequency=440, vibratoFrequency=5, vibratoAmount=10) {
  // Create the oscillator for the sine wave
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Sine wave frequency

  // Create an LFO (Low Frequency Oscillator) for the vibrato effect
  const lfo = audioContext.createOscillator();
  lfo.frequency.setValueAtTime(vibratoFrequency, audioContext.currentTime); // Frequency of the vibrato
  
  // Create a GainNode to control the depth of the vibrato
  const lfoGain = audioContext.createGain();
  lfoGain.gain.setValueAtTime(vibratoAmount, audioContext.currentTime); // Depth of the vibrato

  // Connect the LFO through the GainNode to the sine wave oscillator's frequency
  lfo.connect(lfoGain);
  lfoGain.connect(oscillator.frequency);

  // Connect the oscillator to the audio context destination (output)
  oscillator.connect(audioContext.destination);

  // Start the oscillators
  oscillator.start();
  lfo.start();

  // Stop oscillator after some time to prevent it from running indefinitely
  oscillator.stop(audioContext.currentTime + 5); // Stops after 5 seconds
  lfo.stop(audioContext.currentTime + 5); // Also stop LFO after 5 seconds
}

// Example usage
addVibrato(440, 5, 10);

// Optionally, to use for loops or random values, you can adapt the function calls like this:
for (let i = 0; i < 5; i++) {
  const randomFreq = Math.random() * 1000 + 100; // Random frequency between 100 and 1100 Hz
  const randomVibFreq = Math.random() * 10 + 2; // Random vibrato frequency between 2 and 12 Hz
  const randomVibAmount = Math.random() * 20 + 5; // Random vibrato amount between 5 and 25
  addVibrato(randomFreq, randomVibFreq, randomVintAmount);
}
