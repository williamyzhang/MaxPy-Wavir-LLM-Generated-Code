// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Generate white noise function
function createWhiteNoise() {
    // Create an empty stereo buffer at the sample rate of the AudioContext
    const bufferSize = 2 * audioContext.sampleRate,
        noiseBuffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);

    // Fill the buffer with white noise;
    // Math.random() is in [0; 1.0], we need [-1.0; 1.0]
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    // Create a buffer source and set the white noise buffer
    let whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;
    
    return whiteNoiseSource;
}

// Create a biquad filter to shape the noise into more of a babbling brook sound
function createBiquadFilter(source) {
    const biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = 'bandpass';
    biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
    biquadFilter.Q.setValueAtTime(8.30, audioContext.currentTime);
    
    source.connect(biquadFilter);
    return biquadFilter;
}

// Create a gain node to control the overall volume
function createGainNode(source) {
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Initial gain level
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Optionally, automate gain changes to simulate variation in the brook's flow
    const currentTime = audioContext.currentTime;
    gainNode.gain.setValueCurveAtTime([0.5, 0.7, 0.3, 0.6, 0.5], currentTime, 60); // Example: Over 60 seconds, creates dynamic changes
    
    return gainNode;
}

// Combine everything
function playBabblingBrook() {
    const whiteNoiseSource = createWhiteWhiteNoise();
    const biquadFilter = createBiquadFilter(whiteNoiseSource);
    createGainNode(biquadFilter);
    whiteNoiseSource.start();
}

// Execute the function to play the sound
playBabblingBrook();
