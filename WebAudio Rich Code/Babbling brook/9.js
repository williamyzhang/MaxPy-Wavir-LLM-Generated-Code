// Create an instance of AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createWhiteNoise() {
	// The sample rate is the number of samples of audio carried per second.
	const sampleRate = audioContext.sampleRate;
	const bufferSize = sampleRate * 2; // buffer size of 2 seconds
	const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
	const output = buffer.getChannelData(0);

	// Fill the buffer with white noise;
	// mathematically generate random values between -1.0 and 1.0
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	return buffer;
}

function playWhiteNoise() {
	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = createWhiteNoise();

	// Create a BiquadFilterNode
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 1000; // Set cutoff to 1000 Hz

	// Connect the white noise to the filter, and the filter to the destination
	whiteNoise.connect(filter);
	filter.connect(audioContext.destination);

	// Start playing the white noise
	whiteNoise.start();

	return whiteNoise;
}

// Function to stop the noise
function stopWhiteNoise(noiseSource) {
	noiseSource.stop();
}

// Example usage:
const myNoise = playWhiteNoise();
// Stop the noise after 5 seconds
setTimeout(() => {
	stopWhiteNoise(myNoise);
}, 5000);
