// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a white noise buffer
function createWhiteNoiseBuffer(length) {
	const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i++) {
		data[i] = Math.random() * 2 - 1;
	}
	return buffer;
}

// Create a low-pass filter
function createLowPassFilter() {
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 1000; // Set the cutoff frequency to 1000 Hz
	return filter;
}

// Create a buffer source node with filtered white noise
function createBufferSource() {
	const source = audioContext.createBufferSource();
	const noiseBuffer = createWhiteNoiseBuffer(44100); // 1 second of white noise
	source.buffer = noiseBuffer;
	const filter = createLowPassFilter();
	source.connect(filter);
	filter.connect(audioContext.destination);
	return source;
}

// Start playing the filtered white noise
const bufferSource = createBufferSource();
bufferSource.start();
