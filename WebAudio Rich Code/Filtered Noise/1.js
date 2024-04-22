const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let noiseBufferSource;
let filterNode;

function createWhiteNoise() {
	// Create an empty stereo buffer at the sample rate of the Audio Context
	const bufferSize = audioContext.sampleRate * 2; // 2 seconds of noise
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const output = buffer.getChannelData(0);

	// Fill the buffer with white noise;
	// Math.random() produces random values between 0 and 1,
	// so we need to scale these to between -1 and 1 to generate proper audio signal levels
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	return buffer;
}

function startNoise() {
	// Create a buffer source
	noiseBufferSource = audioContext.createBufferSource();
	noiseBufferSource.buffer = createWhiteNoise();

	// Create a low-pass filter
	filterNode = audioContext.createBiquadFilter();
	filterNode.type = 'lowpass';
	filterNode.frequency.setValueAtTime(1000, audioContext.currentTime);

	// Connect the noise source to the filter, then to the audio context's destination
	noiseBufferSource.connect(filterNode);
	filterNode.connect(audioContext.destination);

	// Start the source
	noiseBufferSource.start();
}

function stopNoise() {
	if (noiseBufferSource) {
		noiseBufferSource.stop();
		noiseBufferSource.disconnect();
	}
}