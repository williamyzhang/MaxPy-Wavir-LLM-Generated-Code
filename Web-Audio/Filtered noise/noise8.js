// Create an instance of an audio context to work with the Web Audio API
const audioContext = new AudioContext();

// Create a buffer source
const bufferSize = 4096; // Set the size of the buffer
const bufferSource = audioContext.createBufferSource(); // Create a BufferSource node
const numberOfChannels = 2; // Stereo output
let myArrayBuffer = audioContext.createBuffer(numberOfChannels, bufferSize, audioSoft.context.sampleRate);

// Fill the buffer with white noise;
// just random values between -1.0 and 1.0
for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
  // This gives us the actual array that contains the data
  let nowBuffering = myArrayBuffer.getChannelData(channel);
  for (let i = 0; i < bufferSize; i++) {
    // Math.random() is in [0; 1.0]
    // audio needs to be in [-1.0; 1.0]
    nowBuffering[i] = Math.random() * 2 - 1;
  }
}

// set the buffer in the AudioBufferSourceNode
bufferSource.buffer = myArrayBuffer;
// connect to the destination, so we can hear the sound
bufferSource.connect(audioContext.destination);
// start the source playing
bufferSource.start();

// Create a BiquadFilterNode
const biquadFilter = audioContext.createBiquadFilter();
biquadFilter.type = 'lowpass'; // Set the filter type to lowpass
biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set the cut-off frequency

// Connect the buffer source to the filter and the filter to the destination
bufferSource.connect(biquadFilter);
biquadFilter.connect(audioContext.destination);

// Start the buffer source
// Note: on older Web Audio APIs, you may have to use noteOn(startTime) instead of start(startTime)
bufferSource.start();
