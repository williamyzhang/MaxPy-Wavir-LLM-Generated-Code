// Define the Web Audio context
const audioContext = new AudioContext();

// Create a buffer size for the noise
const bufferSize = 4096;
// Create a ScriptProcessorNode to generate white noise
const noiseGenerator = audioC ontex t.createScriptProcessor(bufferSize, 1, 1);

// Function to fill the buffer with random values, creating the white noise
noiseGenerator.onaudioprocess = function(e) {
  var output = e.outputBuffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    // Generate white noise by filling the buffer with random values between -1.0 and 1.0
    output[i] = Math.random() * 2 - 1;
  }
};

// Create a BiquadFilterNode for the low-pass filter
const filter = audioContext.createBiquadFilter();
// Set the type of filter
filter.type = 'lowpass';
// Set the frequency (cutoff frequency to 1000 Hz)
filter.frequency.setValueAtTime(1000, audioContext.currentTime);

// Connect the noise generator to the filter
noiseGenerator.connect(filter);
// Connect the filter to the context's destination (the speakers)
filter.connect(audioContext.destination);

// Explaination: This script first initializes an AudioContext. 
// Then it creates a `ScriptProcessorNode` to generate white noise on the fly by filling a buffer with random values.
// After generating the noise, the noise is passed through a `BiquadFilterNode` configured as a low-pass filter with a cutoff frequency of 1000 Hz.
// The filtered noise is then routed to the AudioContext's destination, which outputs the sound to the speakers.
