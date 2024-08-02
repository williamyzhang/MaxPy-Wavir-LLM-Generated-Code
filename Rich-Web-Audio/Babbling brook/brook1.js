// Step 1: Audio Context Setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: White Noise Generator Function
function createWhiteNoise() {
  let bufferSize = 2 * audioCtx.sampleRate,
  noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
  output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  let whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  return whiteNoise;
}

// Step 3 & 4: Filter Setup and Randomization
function applyFilterAndPlay() {
  for(let i = 0; i < 5; i++) { // Multiple sources for a richer sound
    let whiteNoise = createWhiteNoise();
    let biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = 'lowpass';

    // Randomize frequency and Q value
    biquadFilter.frequency.value = Math.random() * 1500 + 500; // Frequency between 500Hz and 2000Hz
    biquadFilter.Q.value = Math.random() * 1.5 + 0.5; // Q value between 0.5 and 2

    whiteNoise.connect(biquadForFilter);
    biquadFilter.connect(audioCtx.destination);

    whiteNoise.start();
    whiteNoise.stop(audioCtx.currentTime + 4); // Play for 4 seconds
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume(); // Ensure audio context is playing
  }
}

// Initialize babbling brook sound
applyFilterAndPlay();

// Optionally, can call applyFilterAndPlay recurisvely with some delay to continuously play the brook sound
