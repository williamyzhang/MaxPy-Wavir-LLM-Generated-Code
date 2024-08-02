// Create an AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise() {
    const bufferSize = 2 * audioCtx.sampleRate,
          noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
          output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        // Generate white noise by random values
        output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    return whiteNoise;
}

// Function to simulate ocean waves sound
function oceanWaves() {
    const whiteNoise = createWhiteNoise();
    
    // Create a biquad filter to control the white noise frequency
    const biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime); // Starting frequency
    biquadFilter.Q.setValueAtTime(1, audioCtx.currentTime); // Q value controls the sharpness of the filter
    
    // Modulate the filter frequency to simulate waves
    const waveModulator = audioCtx.createGain();
    waveModulator.gain.setValueAtTime(1, audioCtx.currentTime); // modulation depth
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(0.25, audioCtx.currentTime); // Slow oscillation
    oscillator.connect(waveModulator);
    waveModulator.connect(biquadFilter.frequency);
    
    whiteNoise.connect(biquadFilter);
    biquadFilter.connect(audioCtx.destination);
    
    // Start the white noise source
    whiteNoise.start();
    oscillator.start();
    // Stop the noise after a duration if necessary
    // whiteNoise.stop(audioCtx.currentTime + duration);
    // oscillator.stop(audioCtx.currentTime + duration);
}

// Call the oceanWaves function to start the sound
oceanWaves();
