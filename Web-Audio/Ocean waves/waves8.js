// 1. Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise() {
  const bufferSize = 2 * audioContext.sampleRate,
    noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
    output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const whiteNoiseSource = audioContext.createBufferSource();
  whiteNoiseSource.buffer = noiseBuffer;
  whiteNoiseSource.loop = true;
  return whiteNoiseSource;
}

// Function to simulate ocean waves
function simulateOceanWaves() {
  const whiteNoise = createWhiteNoise();

  // 3. Apply a lowpass filter
  const biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = 'lowpass';
  biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
  biquadFilter.Q.value = 1.0;
  
  // 4. Modulate the volume
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueCurveAtTime(
    new Float32Array([0.01, 0.3, 0.02, 0.25, 0.05, 0.2, 0.01]),
    audioContext.currentTime,
    4 // total duration of one "wave"
  );
  
  // Connect the nodes
  whiteNoise.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start the sound
  whiteNoise.start();
}

// Call the function to simulate ocean waves
simulateOceanWaves();
