// Step 1: Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise() {
    // Create an empty three-second stereo buffer at the sample rate of the audio context
    const bufferSize = audioCtx.sampleRate * 3; // 3 seconds
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);

    // Fill the buffer with white noise;
    let data = buffer.getChannelData(0); // get data of the first channel
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // fill with random values between -1 and 1
    }
    return buffer;
}

// Function to play the white noise through a lowpass filter
function playBabblingBrook() {
    const whiteNoiseBuffer = createWhiteNoise();
    const whiteNoiseSource = audioCtx.createBufferSource();
    whiteNoiseSource.buffer = whiteNoiseBuffer;
    whiteNoiseSource.loop = true;

    // Step 3: Create and configure a biquad filter for the lowpass effect
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000; // Starting frequency. Experiment with this value.
    
    // Step 4: Modulate the filter frequency to simulate water dynamics
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // Sine wave for smooth modulation
    oscillator.frequency.setValueAtTime(0.1, audioIdx.currentTime); // Modulation frequency
    const modulationGain = audioCtx.createGain();
    modulationGain.gain.setValueAtTime(500, audioCtx.currentTime); // Depth of the modulation. Experiment with this value.
    
    // Connect the modulation
    oscillator.connect(modulationGain);
    modulationGain.connect(filter.frequency);
    oscillator.start();
    
    // Connect the white noise source to the filter, then to the context's destination
    whiteNoiseSource.connect(filter);
    filter.connect(audioCtx.destination);

    // Step 5: Loop and play
    whiteNoiseSource.start();
}

// Play the sound
playBabblingBrook();
