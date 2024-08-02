// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate white noise
function createWhiteNoise() {
    const bufferSize = 2 * audioCtx.sampleRate,
        noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        // Generate white noise by filling the buffer with random values
        output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    return whiteNoise;
}

// Function to simulate the wave effect
function oceanWaves() {
    const whiteNoise = createWhiteNoise();
    const gainNode = audioCtx.createGain();

    // Gain adjustments to simulate waves
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    for (let i = 0; i < 60; i++) { // Simulate for 60 seconds
        let time = audioCtx.currentTime + i;
        let gainValue = Math.random() * 0.3 + 0.1; // Random gain value for variability
        gainNode.gain.exponentialRampToValueAtTime(gainValue, time + Math.random() * 4);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 6 + Math.random() * 4);
    }

    whiteNoise.connect(gainNode).connect(audioCtx.destination);
    whiteNoise.start();
}

// Run the function to simulate ocean waves
oceanWaves();
