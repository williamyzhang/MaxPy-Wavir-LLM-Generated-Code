// Create an instance of an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate,
		noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
		output = noiseBuffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;  // Generate random numbers between -1 and 1
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Function to apply filters
function applyFilters(source) {
	let lastNode = source;

	// Creating multiple bandpass filters for more natural brook sound
	for (let i = 0; i < 5; i++) {
		const bandpass = audioContext.createBiquadFilter();
		bandpass.type = 'bandpass';
		bandpass.frequency.value = 500 + Math.random() * 1000; // Randomize the central frequency
		bandpass.Q.value = 1.0 + Math.random(); // Randomize the Q factor a bit

		lastNode.connect(bandpass);
		lastNode = bandpass;
	}

	return lastNode;
}

// Play the sound
function playBrook() {
	const whiteNoise = createWhiteNoise();
	const filteredNoise = applyFilters(whiteNoise);
	filteredNoise.connect(audioContext.destination);
	whiteNoise.start();
}

playBrook();

// Function to stop the sound
function stopBrook() {
	audioContext.close();
}
