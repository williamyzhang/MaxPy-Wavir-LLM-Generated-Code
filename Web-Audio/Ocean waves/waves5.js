// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate white noise
function createWhiteNoise() {
  const bufferSize = 2 * audioContext.sampleRate,
        noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1; // Generate white noise
  }
  const whiteNoiseSource = audioContext.createBufferSource();
  whiteNoiseSource.buffer = noise = noiseBuffer;
  return whiteNoiseSource;
}

// Function to simulate waves using an LFO
function simulateWaves() {
  const whiteNoiseSource = createWhiteNoise();
  whiteNoiseSource.loop = true;

  // Create a BiquadFilter to simulate the ocean's sound characteristic
  const biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
  biquadFilter.Q.setValueAtTime(1, audioContext.currentTime); // A slight resonance

  // LFO to modulate the filter frequency for the ebbing and flowing effect
  const lfo = audioContext.createOscillator();
  lfo.type = "triangle";
  lfo.frequency.setValueAtTime(0.1, audioContext.currentTime); // Slow waving effect

  const lfoGain = audioContext.createGain();
  lfoGain.gain.setValueAtTime(500, audioContext.currentTime); // Depth of the frequency modulation

  // Routing
  whiteNoiseSource.connect(biquadFilter);
  biquadFilter.connect(audioContext.destination);
  lfo.connect(lfoGain);
  lfoGain.connect(biquadFilter.frequency);
  
  whiteNoiseSource.start();
  lfo.start();
}

// Call the function to simulate ocean waves
simulateWaves();
