// Initialize AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate white noise
function createWhiteNoise() {
    // Create an empty stereo buffer at the sample rate of the AudioContext
    const bufferSize = 2 * audioContext.sampleRate,
    buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
    output = buffer.getChannelData(0);

    // Fill the buffer with white noise;
    // Math.random() is in [0; 1.0], so we need to normalize it to [-1; 1]
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    return buffer;
}

// Function to apply a low-pass filter at 1000 Hz to the given audio buffer source
function applyLowPassFilter(source) {
    const lowPassFilter = audioContext.createBiquadFilter();
    lowPassFilter.type = 'lowpass';
    lowPassFilter.frequency.value = 1000; // Set cutoff frequency to 1000 Hz
    source.connect(lowPassFilter);
    lowPassFilter.connect(audioContext.destination);
}

// Create a buffer source for the white noise
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = createWhiteWhiteNoise();
// Apply a low-pass filter to the white noise source
applyLowPassFilter(whiteNoiseSource);

// Start playback of the processed white noise
whiteNoiseSource.start();
