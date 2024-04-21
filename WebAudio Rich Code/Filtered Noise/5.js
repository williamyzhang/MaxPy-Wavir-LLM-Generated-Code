// Create an instance of AudioContext
const audioContext = new AudioContext();

// Create a buffer source
const bufferSize = 4096; // Choose an appropriate buffer size
const sampleRate = audioContext.sampleRate; // Typically 44100 Hz
const noiseBuffer = audioContext.createBuffer(1, bufferSize, sampleRate);
const output = noiseBuffer.getChannelData(0);

// Fill the buffer with white noise
for (let i = 0; i < bufferSize; i++) {
	// Generate random values between -1.0 and 1.0
	output[i] = Math.random() * 2 - 1;
}

// Create a buffer source node
const noiseSource = audioContext.createBufferSource();
noiseSource.buffer = noiseBuffer;
noiseSource.loop = true; // Loop the noise

// Create a low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass'; // Set filter type
lowPassFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set frequency to 1000 Hz

// Connect the source to the filter and the filter to the destination (output)
noiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start playing the noise
noiseSource.start();
