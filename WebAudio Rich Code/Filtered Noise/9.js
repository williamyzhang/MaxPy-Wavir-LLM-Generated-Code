// Create a new audio context
const audioContext = new AudioContext();

// Define a function to create a buffer filled with white noise
function createWhiteNoise(audioContext) {
	// The number of samples to generate, 2 seconds of audio at the sample rate of the context
	const bufferSize = audioContext.sampleRate * 2;
	// Create an audio buffer
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	// Fill the buffer with white noise
	let data = buffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i++) {
		// Generate random samples between -1.0 and 1.0
		data[i] = Math.random() * 2 - 1;
	}
	return buffer;
}

// Create a buffer source node
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = createWhiteNoise(audioContext);
whiteNoiseSource.loop = true;

// Create a low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass';
lowPassFilter.frequency.value = 1000; // Set the cutoff frequency to 1000 Hz

// Connect the white noise source to the low-pass filter
whiteNoiseSource.connect(lowPassFilter);

// Connect the low-pass filter to the audio context's destination
lowPassFilter.connect(audioContext.destination);

// Start playing the white noise
whiteNoiseSource.start();
