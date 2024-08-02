// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise() {
    const bufferSize = 2 * audioContext.sampleRate,
          noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
          output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    return whiteNoise;
}

// Function to create the babbling brook sound
function createBabblingBrook() {
    const whiteNoise = createWhiteNoise();

    // Create a biquad filter to simulate water flow
    const biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
    biquadFilter.Q.setValueAtTime(1, audioContext.currentTime); // Adjust Q value for different effects

    // Another filter for more control over the sound texture
    const biquadFilter2 = audioContext.createBiquadFilter();
    biquadFilter2.type = "peaking";
    biquadFilter2.frequency.setValueAtTime(1500, audioContext.currentTime);
    biquadFilter2.Q.setValueAtTime(0.5, audioContext.currentTime);
    biquadFilter2.gain.setValueAtTime(3, audioContext.currentTime); // To slightly boost the high end

    // Chain the nodes together
    whiteNoise.connect(biquadFilter);
    biquadFilter.connect(biquadFilter2);
    biquadFilter2.connect(audioContext.destination);

    // Start the noise
    whiteNoise.start();
}

// Call the function to play the sound
createBabblingBrook();
