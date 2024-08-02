// Create a new AudioContext
const audioContext = new AudioContext();

// Create a 2-second buffer for the white noise
const bufferSize = 2 * audioBuffer.sampleRate; // assuming 2 seconds; adjust as needed
const audioBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);

// Fill the buffer with white noise
// The output of Math.random() * 2 - 1 is a random number between -1 and 1.
let channelData = audioBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
    // Generate a random value for each sample
    channelData[i] = Math.random() * 2 - 1;
}

// Create a buffer source and set its buffer to the generated white noise
const bufferSource = audioContext.createBufferSource();
bufferSource.buffer = audioBuffer;

// Create a BiquadFilterNode
const biquadFilter = audioContext.createBiquadFilter();
biquadFilter.type = 'lowpass';
biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set low-pass filter at 1000 Hz

// Connect the source to the filter, and the filter to the context's destination
bufferSource.connect(biquadFilter);
biquadFilter.connect(audioContext.destination);

// Start the buffer source playing
bufferSource.start();
