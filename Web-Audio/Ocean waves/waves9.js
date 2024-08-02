// Create an instance of an audio context
const context = new AudioContext();

// Function to create a buffer filled with white noise
function createWhiteNoise() {
    const bufferSize = 2 * context.sampleRate,
        noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
}

// Function to play the ocean wave sound
function playOceanWaves() {
    const whiteNoiseSource = context.createBufferSource();
    whiteNoiseSource.buffer = createWhiteNoise();

    // Create a biquad filter to simulate the sound of ocean waves
    const biquadFilter = context.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, context.currentTime);
    biquadFilter.Q.setValueAtTime(1, context.currentTime); // Q value controls the sharpness of the filter

    // Connect the noise source to the filter
    whiteNoiseSource.connect(biquadFilter);

    // Create and configure a gain node to automate the volume
    const gainNode = context.createGain();
    biquadFilter.connect(gainNode);
    gainNode.connect(context.destination);

    // Automate the gain to create the effect of waves
    const now = context.currentTime;
    gainNode.gain.setValueCurveAtTime(new Float32Array([0.3, 0.7, 0.4, 0.6, 0.5]), now, 5);

    // Automate the filter frequency to mimic the ebbing and flowing of waves
    biquadFilter.frequency.setValueCurveAtTime(new Float32Array([500, 800, 600, 700, 750]), now, 5);

    // Start the noise source
    whiteNoiseSource.start();

    // Automatically stop the source after a duration
    whiteNoiseSource.stop(context.currentTime + 5); // Adjust the duration as needed
}

// Call the function to play the ocean wave sound
playOceanWaves();
