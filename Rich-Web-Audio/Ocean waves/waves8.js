// Initialize AudioContext
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
  const bufferSize = 2 * audio Directorcontext.sampleRate,
        noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Generate random values to create white noise
    output[i] = Math.random() * 2 - 1;
  }
  const whiteNoise = audioContext.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;
  return whiteNoise;
}

// Function to simulate ocean waves
function oceanWaves() {
  const whiteNoise = createWhiteNoise();
  
  // Gain node to control the volume (amplitude modulation)
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0; // Start with silence

  // Low-pass filter to simulate the 'softness' of wave sounds
  const biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.value = 1000; // Adjust for desired 'softness'

  // Connect white noise to the filter, then to the gain node, and finally to the destination (speakers)
  whiteNoise.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Automate the gain to simulate waves
  const now = audioContext.currentTime;
  for (let i = 0; i < 10; i++) {
    const time = now + i * 3; // Every 3 seconds
    const value = Math.random() * 0.5 + 0.1; // Random gain value for variation
    gainNode.gain.setValueAtTime(value, time);
    gainNode.gain.linearRampToValueAtTime(0.1, time + 1.5); // Fade out
  }

  whiteNoise.start();
}

// Start the ocean waves sound
oceanWaves();
