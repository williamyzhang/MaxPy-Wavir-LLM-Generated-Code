// Step 1: Create an AudioContext instance
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Generate white noise
const bufferSize = 2 * audioCtx.sampleRate, // 2 seconds of audio
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate), // 1 channel
    output = noiseBuffer.getChannelData(0);

for (let i = 0; i < bufferSize; i++) {
    // Populate buffer with random values
    output[i] = Math.random() * 2 - 1;
}

// Step 3: Create a BufferSource and set the white noise as its buffer
const whiteNoiseSource = audioCtx.createBufferSource();
whiteNoiseSource.buffer = noiseBuffer;
whiteNoiseSource.loop = true;

// Step 4: Create a BiquadFilterNode for the low-pass filter
const lowPassFilter = audioCtx.createBiquadFilter();
lowPassFilter.type = 'lowpass';
lowPassFilter.frequency.value = 1000; // Set the filter frequency to 1000 Hz

// Step 5: Connect the nodes
whiteNoiseSource.connect(lowPassFilter); // Connect the white noise source to the filter
lowPassFilter.connect(audioCtx.destination); // Connect the filter to the destination (speakers)

// Start playback of the white noise
whiteNoiseSource.start();
