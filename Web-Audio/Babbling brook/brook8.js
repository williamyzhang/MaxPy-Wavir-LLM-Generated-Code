// Create a new audio context
const audioContext = new window.AudioContext();

// Function to create white noise
const createWhiteNoise = () => {
  const bufferSize = 2 * audioContext.sampleRate,
    noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
    output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;  // Generate white noise
  }
  const whiteNoiseSource = audioContext.createBufferSource();
  whiteNoiseSource.buffer = noiseBuffer;
  whiteNoiseSource.loop = true;
  return whiteNoiseSource;
};

// Function to simulate the babbling brook
const simulateBabblingBrook = () => {
  const whiteNoiseSource = createWhiteNoise();

  // Create a biquad filter to mimic the sound of water flowing
  const biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
  biquacFilter.Q.setValueAtTime(1, audioContext.currentTime);

  // Another filter to create variation resembling bubbles
  const peakingFilter = audioContext.createBiquadFilter();
  peakingFilter.type = "peaking";
  peakingFilter.frequency.setValueAtTime(500, audioContext.currentTime);
  peakingFilter.Q.setValueAtTime(1, audioContext.currentTime);
  peakingFilter.gain.setValueAtTime(3, audioContext.currentTime);

  // Connect the nodes
  whiteNoiseSource.connect(biquadFilter);
  biquadFilter.connect(peakingFilter);
  peakingFilter.connect(audioContext.destination);

  // Start the white noise source 
  whiteNoiseSource.start();
};

// Call the function to start the simulation
simulateBabblingBrook();
