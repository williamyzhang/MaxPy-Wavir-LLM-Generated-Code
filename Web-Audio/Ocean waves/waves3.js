// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise(audioContext) {
    const bufferSize = 2 * audioContext.sampleRate, // 2 seconds of buffering
          noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
          output = noise.



Buffer.getChannelData(0);
    
    // Fill buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    return whiteNoiseSource;
}

// Function to simulate ocean waves sound
function simulateOceanWaves() {
    const whiteNoiseSource = createWhiteNoise(audioContext),
          gainNode = audioContext.createGain(),
          lfo = audioContext.createOscillator();

    // Configure LFO for volume modulation
    lfo.frequency.setValueAtTime(0.05, audioContext.currentTime); // Slow oscillation
    lfo.start();

    // Connect LFO to gain node's gain parameter to modulate volume
    lfo.connect(gainNode.gain);

    // Increase LFO effect for more pronounced volume changes
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Base volume
    gainNode.gain.exponentialRampToValueAtTime(0.8, audioContext.currentTime + 2); // Ramp volume for more dynamic effect

    // Connect and play white noise through gain node
    whiteNoiseSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
    whiteNoiseSource.start();
    whiteNoiseSource.loop = true;
}

// Call the function to simulate ocean waves
simulateOceanWaves();
