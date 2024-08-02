// Create an instance of AudioContext
const audioContext = new AudioContext();

// Create a buffer source
const bufferSize = audioContext.sampleRate * 3; // buffer for 3 seconds
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = buffer.getChannelData(0);

// Fill the buffer with white noise;
// Math.random() - 0.5 is a simple way to generate white noise
for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
}

// Create a buffer source node
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = buffer;
whiteNoiseSource.loop = true;

// Create a BiquadFilterNode
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass'; // Low-pass filter
lowPassFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set cutoff frequency to 1000 Hz

// Connect the white noise source to the filter, and the filter to the destination
whiteNoiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start playback
whiteNoiseSource.start();
