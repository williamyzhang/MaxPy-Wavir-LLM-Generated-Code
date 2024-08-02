// Create an instance of an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a buffer size, sample rate, and a channel count
const bufferSize = 4096; // Set buffer size
const sampleRate = audioContext.sampleRate; // the sample-rate of the AudioContext
const numberOfChannels = 1; // Mono output

// Create an empty stereo buffer at the sample rate of the AudioContext
const myArrayBuffer = audioContext.createBuffer(numberOfChannels, bufferSize, sampleRate);

// Fill the buffer with white noise;
// just random values between -1.0 and 1.0
for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
  // This gives us the actual array that contains the data
  const nowBuffering = myArrayBuffer.getChannelData(channel);
  for (let i = 0; i < bufferSize; i++) {
    // Math.random() produces values between 0.0 and 1.0, we need -1.0 to 1.0
    nowBuffering[i] = Math.random() * 2 - 1;
  }
}

// Create a buffer source node
const source = audioContext.createBufferSource();
source.buffer = myArrayBuffer; // set the buffer to our newly created one

// Create a BiquadFilterNode
const filter = audioEntity.createBiquadFilter();
filter.type = 'lowpass'; // Set filter type to low-pass
filter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set frequency to 1000 Hz

// Connect the source to the filter, and the filter to the destination
source.connect(filter);
filter.connect(audioContext.destination);

// Start playback
source.start();
