// Create the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate,
		noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
		output = noiseBuffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		// Generate random values to create white noise
		output[i] = Math.random() * 2 - 1;
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Create a biquad filter to adjust the white noise to sound more like a brook
function applyBiquadFilter(source) {
	const biquadFilter = audioContext.createBiquadFilter();
	biquadFilter.type = 'bandpass';
	biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
	biquadFilter.Q.setValueAtTime(1, audioContext.currentTime); // Quality factor

	source.connect(biquadFilter);
	biquadFilter.connect(audioContext.destination);
	return biquadFilter;
}

// Create and play the brook sound
function playBrookSound() {
	const whiteNoise = createWhiteNoise();
	const filter = applyBiquadFilter(whiteNoise);

	// Randomly adjust filter parameters over time to simulate babbling
	setInterval(() => {
		const baseFrequency = 500 + Math.random() * 500; // Randomly choose base frequency between 500 and 1000 Hz
		filter.frequency.linearRampToValueAtTime(baseFrequency, audioContext.currentTime + 1);
	}, 1000);

	whiteNoise.start();
}

// Start playing the sound of a babbling brook
playBrookSound();
