// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
const createWhiteNoise = () => {
  const bufferSize = 2 * audioCtx.sampleRate,
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
    output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;
  return whiteNoise;
};

// Function to simulate a babbling brook
const simulateBabblingBrook = (n) => {
  for (let i = 0; i < n; i++) {
    const whiteNoise = createWhiteNoise();
    const biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "bandpass";
    biquadFilter.frequency.setValueAtTime(1000 + Math.random() * 500, audioCtx.currentTime); // Randomize frequency to vary the sound between brook streams
    biquadFilter.Q.setValueAtTime(1 + Math.random() * 5, audioCtx.currentTime); // Randomize Q to vary the filter resonance

    const panner = audioCtx.createStereoPanner();
    panner.pan.setValueAtTime(-1 + 2 * Math.random(), audioCtx.currentTime); // Randomize panning to create a spatial effect

    // Connect nodes
    whiteNoise.connect(biquadFilter);
    biquadFilter.connect(panner);
    panner.connect(audioCtx.destination);

    whiteNoise.start();
  }
};

// Invoke function with the number of white noise sources you want
simulateBabblingBrook(5); // Feel free to adjust the number for more or less density
