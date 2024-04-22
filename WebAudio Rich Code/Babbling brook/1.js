// Initialize the AudioContext
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate; // Set buffer size (2 seconds of audio)
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate); // Create an audio buffer
	const output = buffer.getChannelData(0);

	// Fill the buffer with random values
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	const whiteNoiseSource = audioContext.createBufferSource();
	whiteNoiseSource.buffer = buffer;
	whiteNoiseSource.loop = true;
	return whiteNoiseSource;
}

// Function to apply a low-pass filter to the white noise
function applyFilter(source) {
	const biquadFilter = audioContext.createBiquadFilter();
	biquadFilter.type = 'lowpass';
	biquadFilter.frequency.value = 1000; // Low-pass filter at 1000 Hz
	source.connect(biquadFilter);
	biquadFilter.connect(audioContext.destination);
}

// Create and play the babbling brook sound
function playBabblingBrook() {
	const whiteNoise = createWhiteNoise();
	applyFilter(whiteNoise);
	whiteNoise.start(0);
}

// Start the sound
playBabblingBrook();
