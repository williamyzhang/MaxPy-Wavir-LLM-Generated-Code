// Set up the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create noise
function createNoise() {
	const bufferSize = 4096;
	const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const output = noiseBuffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1; // Generate white noise
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Create and configure a bandpass filter
function createFilter() {
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 1000; // Can adjust this to taste
	return filter;
}

// Function to animate filter frequency with randomness
function animateFilter(filter) {
	setInterval(() => {
		const baseFrequency = 500; // Base frequency of the filter
		const frequencyVariance = 300; // Variance in frequency for randomness
		filter.frequency.value = baseFrequency + Math.random() * frequencyVariance;
	}, 50); // Change frequency every 50ms
}

// Connect and play the noise shaped by the filter
const noiseSource = createNoise();
const filter = createFilter();
noiseSource.connect(filter);
filter.connect(audioContext.destination);
noiseSource.start(0);

// Animate the filter to vary the sound
animateFilter(filter);
