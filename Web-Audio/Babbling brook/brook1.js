// Create an instance of AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise(audioContext) {
    const bufferSize = 2 * audioContext.sampleRate,
          noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
          output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // Generate white noise
    }
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;
    return whiteNoiseSource;
}

// Function to simulate a babbling brook
function babblingBrook() {
    const whiteNoiseSource = createWhiteNoise(audioContext);

    // Create a biquad filter to sculpt the white noise into a more 'watery' sound
    const biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = 'bandpass';
    biquadFilter.frequency.value = 1000; // Center frequency
    biquadFilter.Q.value = 1; // Quality factor

    // Create a lowpass filter to smooth out the sound further
    const lowpassFilter = audioContext.createBiquadFilter();
    lowpassFilter.type = 'lowpass';
    lowpassFilter.frequency.value = 1500; // Adjust to taste
    lowpassFilter.Q.value = 0.7; // Quality factor for the lowpass filter

    // Connect the nodes together
    whiteNoiseSource.connect(biquadFilter);
    biquadFilter.connect(lowpassFilter);
    lowpassFilter.connect(audioContext.destination);

    // Start the white noise source
    whiteNoiseSource.start(0);
}

// Invoke the function to simulate babbling brook sound
babblingBrook();
