// Step 1: Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create a buffer source
const bufferSize = 2 * audioCtx.sampleRate, // For 2 seconds of audio
    numberOfChannels = 1, // Mono audio
    myArrayBuffer = audioCtx.createBuffer(numberOfChannels, bufferSize, audioCtx.sampleRate);

// Fill the buffer with white noise;
// For each channel...
for (let channel = 0; channel < numberOfChannels; channel++) {
  // This gives us the actual array that contains the data
  const nowBuffering = myArrayBuffer.getChannelData(channel);
  for (let i = 0; i < bufferSize; i++) {
    // Math.random() is in [0; 1.0]
    // We need to normalize and center the output
    // This gives us white noise
    nowBuffering[i] = Math.random() * 2 - 1;
  }
}

// Create a buffer source node
const source = audioCtx.createBufferSource();
source.buffer = myArrayBuffer;

// Step 3: Create a low-pass filter
const filter = audioCtx.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 1000; // Cutoff at 1000 Hz

// Step 4: Connect nodes and play the sound
source.connect(filter);
filter.connect(audioCtx.destination);

// Start the source playing
source.start();
