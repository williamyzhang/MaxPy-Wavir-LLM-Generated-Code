// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function oceanWaveSound(duration = 5) {
  // Function to create a single wave sound
  const createWave = (frequency, duration) => {
    const bufferSize = 2 * audioCtx.sampleRate * duration;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Fill the buffer with white noise;
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Create a lowpass filter
    const biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    // Use a random frequency for the lowpass filter to vary the waves
    biquadFilter.frequency.value = frequency;

    // Connect the nodes
    noiseSource.connect(biquadFilter);
    biquadFilter.connect(audioCtx.destination);

    // Play the sound
    noiseSource.start();
    // Stop the sound after `duration` seconds
    noiseSource.stop(audioCtx.currentTime + duration);
  };

  // Create multiple waves with slight variations
  for (let i = 0; i < 5; i++) {
    // Generate random frequencies within the ocean wave frequency range and random duration
    const frequency = Math.random() * 800 + 500; // Frequency between 500Hz and 1300Hz
    const waveDuration = duration + Math.random() * 0.5; // Duration between `duration` and `duration` + 0.5
    createWave(frequency, waveDuration);
  }
}

// Play the ocean waves sound for 5 seconds
oceanWaveSound(5);
