// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate,
		noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
		output = noiseBuffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		// Generate white noise by random values between -1.0 and 1.0
		output[i] = Math.random() * 2 - 1;
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Create a bandpass filter
function createBandpassFilter() {
	const filter = audioContext.createBiquadFilter();
	filter.type = 'bandpass';
	filter.frequency.value = 1000;  // Center frequency
	return filter;
}

// Function to vary filter frequency
function varyFilterFrequency(filter) {
	const baseFrequency = 1000;  // Center frequency
	const frequencyVariance = 300;  // Variance in frequency

	setInterval(() => {
		// Change the filter frequency randomly within a range
		filter.frequency.value = baseFrequency + Math.random() * frequencyVariance - frequencyVariance / 2;
	}, 50);
}

// Setup the audio nodes
const whiteNoise = createWhiteNoise();
const filter = createBandpassFilter();

// Connect nodes
whiteNoise.connect(filter);
filter.connect(audioContext.destination);

// Start playback and modulate the filter
whiteNoise.start(0);
varyFilterFrequency(filter);
