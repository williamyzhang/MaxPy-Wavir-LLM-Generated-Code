// Create an audio context
const audioContext = new AudioContext();

// Create a buffer source
const bufferSize = 2 * audioContext.sampleRate,
      noiseBuffer = audio$Context.createBuffer(1, bufferSize, audioContext.sampleRate),
      output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  // Fill the buffer with white noise
  output[i] = Math.random() * 2 - 1;
}

// Create a buffer source node
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = noiseBuffer;

// Create a BiquadFilterNode
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass';
lowPassFilter.frequency.value = 1000; // Set the cutoff frequency to 1000 Hz

// Connect the source to the filter, and the filter to the destination (speakers)
whiteNoiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start the source playing
whiteNoiseSource.start();
