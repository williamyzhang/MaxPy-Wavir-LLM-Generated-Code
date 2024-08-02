// Create an AudioContext instance
const audioContext = new AudioContext();

// Create a buffer source
const bufferSize = 4096; // Set buffer size
const whiteNoiseSource = audioContext.createScriptProcessor(bufferSize, 1, 1);

// Function to generate white noise
whiteNoiseSource.onaudioprocess = function(e) {
  var output = e.outputBuffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    // Generate white noise by random samples between -1.0 and 1.0
    output[i] = Math.random() * 2 - 1;
  }
};

// Create a low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass'; // Set filter type to low-pass
lowPassFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set frequency to 1000 Hz

// Connect the white noise source to the low-pass filter, then to the destination
whiteNoiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Since ScriptProcessorNode is an old API, consider using AudioWorklet if available
// Note that ScriptProcessorNode might not be supported in all environments
