// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a white noise buffer
function createWhiteNoiseBuffer(duration) {
	const bufferSize = audioContext.sampleRate * duration;
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const data = buffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		// Generate random value between -1 and 1 for white noise
		data[i] = Math.random() * 2 - 1;
	}

	return buffer;
}

// Create low-pass filter
function createLowPassFilter() {
	const filter = audioContext.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = 1000; // Set cutoff frequency to 1000 Hz
	return filter;
}

// Connect nodes
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = createWhiteNoiseBuffer(5); // 5-second duration
const lowPassFilter = createLowPassFilter();

whiteNoiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start playing
whiteNoiseSource.start();
