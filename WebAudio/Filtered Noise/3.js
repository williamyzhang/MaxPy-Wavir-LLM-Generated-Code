// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create white noise buffer
function createWhiteNoiseBuffer(length) {
	const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i++) {
		data[i] = Math.random() * 2 - 1; // Generate random value between -1 and 1
	}
	return buffer;
}

// Create low-pass filter
function createLowPassFilter() {
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 1000; // Set cutoff frequency to 1000 Hz
	return filter;
}

// Connect nodes
const noiseSource = audioContext.createBufferSource();
noiseSource.buffer = createWhiteNoiseBuffer(44100); // 1 second of white noise
const lowPassFilter = createLowPassFilter();

noiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start playing
noiseSource.start();
