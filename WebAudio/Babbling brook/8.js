// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create a source with white noise
function createWhiteNoise() {
	const bufferSize = 4096;
	const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const output = noiseBuffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}
	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Function to create a low-pass filter
function createLowPassFilter() {
	const lowpassFilter = audioContext.createBiquadFilter();
	lowpassFilter.type = "lowpass";
	lowpassFilter.frequency.value = 1000; // Adjust to change the tone
	return lowpassFilter;
}

// Function to create the babbling brook sound
function createBabblingBrook() {
	const whiteNoise = createWhiteNoise();
	const lowpassFilter = createLowPassFilter();

	// Connect nodes
	whiteNoise.connect(lowpassFilter);
	lowpassFilter.connect(audioContext.destination);

	// Start the white noise
	whiteNoise.start(0);
}

// Create babbling brook sound
createBabblingBrook();
