// Create an AudioContext
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 4096; // Adjust for more or less processing
	const whiteNoiseNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
	whiteNoiseNode.onaudioprocess = function (e) {
		const output = e.outputBuffer.getChannelData(0);
		for (let i = 0; i < bufferSize; i++) {
			// Generate white noise by random values
			output[i] = Math.random() * 2 - 1;
		}
	};
	return whiteNoiseNode;
}

// Function to apply a low-pass filter
function applyLowPassFilter(source) {
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 1000; // Lower frequency to mimic water sound
	source.connect(filter);
	filter.connect(audioContext.destination);
	return filter;
}

// Create white noise and apply filter
const whiteNoise = createWhiteNoise();
const filteredNoise = applyLowPassFilter(whiteNoise);

// Start playing the sound
whiteNoise.connect(audioContext.destination);

// When you want to stop the sound
// whiteNoise.disconnect();
