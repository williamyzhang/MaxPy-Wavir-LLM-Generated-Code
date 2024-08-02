// Step 1: Setup the AudioContext
const audioContext = new AudioContext();

// Function to create and play white noise
function createWhiteNoise() {
  const bufferSize = 2 * audioContext.sampleRate,
        noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoiseSource = audioContext.createBufferSource();
  whiteComposeurerse.buffer = noiseBuffer;
  whiteNoiseSource.loop = true;
  return whiteNoiseSource;
}

// Function to apply a filter to the white noise
function applyBiquadFilter(source, freq) {
  const biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = 'bandpass';
  biquadFilter.frequency.setValueAtTime(freq, audioContext.currentTime);
  biquadFilter.Q.setValueAtTime(1, audioContext.currentTime); // Adjust Q to control the sharpness of the filter
  
  source.connect(biquadFilter);
  return biquadFilter;
}

// Main function to create the babbling brook
function createBabblingBrook() {
  const numberOfStreams = 5; // Number of white noise sources to simulate the brook
  
  for (let i = 0; i < numberOfStreams; i++) {
    const whiteNoise = createWhiteNoise();
    const frequency = 200 + Math.random() * 800; // Random frequency for the filter between 200Hz to 1000Hz
    const filteredNoise = applyBiquadFilter(whiteNoise, frequency);
    
    filteredNoise.connect(audioContext.destination);
    whiteNoise.start();
  }

  // Optional: Modulate the volume or frequencies over time for a more dynamic effect
  // This step is left as an exercise to explore further.
}

// Start the babbling brook sound
createBabblingBrook();
