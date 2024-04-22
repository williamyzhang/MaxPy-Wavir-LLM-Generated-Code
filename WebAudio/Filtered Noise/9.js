// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create white noise buffer
function createWhiteNoiseBuffer(duration) {
	const bufferSize = audioContext.sampleRate * duration;
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const data = buffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		data[i] = Math.random() * 2 - 1; // white noise between -1 and 1
	}

	return buffer;
}

// Create low-pass filter
function createLowPassFilter() {
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 1000; // cutoff frequency
	return filter;
}

// Connect nodes
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = createWhiteNoiseBuffer(5); // 5 seconds duration
const lowPassFilter = createLowPassFilter();

whiteNoiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start playback
whiteNoiseSource.start();
