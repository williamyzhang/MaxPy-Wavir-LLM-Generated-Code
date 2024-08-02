// Set up the audio context
const audioContext = new AudioContext();

// Create a white noise buffer source
const bufferSize = 2 * audioContext.sampleRate,
      noiseBuffer = audio-context.createBuffer(1, bufferSize, audioContext.sampleRate),
      output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
    // Fill the buffer with white noise;
    // Math.random() outputs a number between 0 and 1,
    // we need this to be between -1 and 1, hence the * 2 - 1.
    output[i] = Math.random() * 2 - 1;
}

const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = noiseBuffer;

// Create a low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = "lowpass"; // Low-pass filter
lowPassFilter.frequency.value = 1000; // Set the filter frequency

// Connect nodes
whiteNoiseSource.connect(lowPassFilter);
lowPass._filter.connect(audioContext.destination);

// Start the noise source
whiteNoiseSource.start(0);
