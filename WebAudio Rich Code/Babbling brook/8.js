// Step 1: Create an audio context
const audioContext = new AudioContext();

// Step 2: Create a white noise buffer source
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate,
		noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
		output = noiseBuffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1; // Generate white noise
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Step 3: Apply filters to mimic the babbling brook
function applyFilters(source) {
	const biquadFilter = audioContext.createBiquadFilter();
	biquadFilter.type = 'bandpass';
	biquadFilter.frequency.value = 1000; // Center frequency - play around with this value
	biquadFilter.Q.value = 1; // Q factor - adjust for different effects

	source.connect(biquadFilter);
	biquadFilter.connect(audioContext.destination);
}

// Step 4: Play the sound
const whiteNoiseSource = createWhiteNoise();
applyFilters(whiteNoiseSource);
whiteNoiseSource.start(0);

// To stop the sound, you can use whiteNoiseSource.stop();
