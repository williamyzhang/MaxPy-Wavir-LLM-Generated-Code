// Create an instance of an AudioContext
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate; // 2 seconds of audio
	const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const output = noiseBuffer.getChannelData(0);

	// Fill the buffer with white noise; normally distributed values
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Create a filter to shape the noise into a more 'watery' sound
function applyWaterFilter(source) {
	const biquadFilter = audioContext.createBiquadFilter();
	biquadFilter.type = 'bandpass';
	biquadFilter.frequency.value = 1000; // Center frequency - this is what you might modify to taste
	biquadFilter.Q.value = 1; // Q factor - changes how narrow the band is

	source.connect(biquadFilter);
	biquadFilter.connect(audioContext.destination);
}

// Create and play the sound
const whiteNoiseSource = createWhiteNoise();
applyWaterFilter(whiteNoiseSource);
whiteNoiseSource.start(0);
