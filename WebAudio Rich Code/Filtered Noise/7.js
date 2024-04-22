// Create an AudioContext instance
const audioContext = new AudioContext();

// Create a buffer size; you can adjust this according to your needs
const bufferSize = 4096;

// Create a BufferSource node
const noiseBufferSource = audioContext.createBufferSource();

// Create an empty buffer with 1 channel (mono) and fill it with random values
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const data = buffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
	// Generate random values between -1.0 and 1.0
	data[i] = Math.random() * 2 - 1;
}

// Set the buffer to the buffer source
noiseBufferSource.buffer = buffer;
noiseBufferSource.loop = true;

// Create a BiquadFilterNode with a low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass';
lowPassFilter.frequency.value = 1000; // Set the cutoff frequency to 1000 Hz

// Connect the noise source to the filter, then the filter to the destination (output)
noiseBufferSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start playing the noise
noiseBufferSource.start();
