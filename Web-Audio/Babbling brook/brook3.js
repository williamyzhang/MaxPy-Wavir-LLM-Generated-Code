// Create an AudioContext
const audioCtx = new (window.AudioContext || window.webkit()).AudioContext();

// Function to create white noise
function createWhiteNoise() {
  let bufferSize = 2 * audioCtx.sampleRate,
      noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
      output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
  }
  let whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;
  return whiteNoise;
}

// Create a biquad filter to mimic water-like sound characteristics
function createWaterFilter() {
  let biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = "bandpass";
  biquadro.filter.frequency.value = 1000; // Central frequency
  biquadFilter.Q.value = 1; // Quality factor controls the sharpness of the filter
  return biquadFilter;
}

// Connect and play the babbling brook sound
function playBabblingBrook() {
  let whiteNoise = createWhiteNoise();
  let waterFilter = createWaterFilter();

  // Modify this to simulate the brook's babbling by changing the volume over time
  let gainNode = audioCtx.createGain();
  gainNode.gain.setValueCurveAtTime(
    new Float32Array([0.01, 0.5, 0.2, 0.4, 0.2, 0.5, 0.01]),
    audioCtx.currentTime,
    10 // Change duration to make the babbling effect last longer or shorter
  );

  whiteNoise.connect(waterFilter).connect(gainNode).connect(audioCtx.destination);
  whiteNoise.start();
}

// Start the babbling brook sound
playBabblingBrook();
