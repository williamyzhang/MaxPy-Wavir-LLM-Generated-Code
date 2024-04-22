// Create an instance of AudioContext
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate; // 2 seconds of noise
	const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const output = noiseBuffer.getChannelData(0);

	// Fill the buffer with random values
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Function to simulate waves using GainNode automation
function simulateWaves(noiseSource) {
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0, audioContext.currentTime);

	// Randomly vary the gain to simulate waves
	let currentTime = audioContext.currentTime;
	for (let i = 0; i < 100; i++) { // Create 100 gain changes
		gainNode.gain.linearRampToValueAtTime(Math.random() * 0.5, currentTime + Math.random() * 2);
		currentTime += Math.random() * 2 + 1; // Randomly space the timing of the next wave
	}

	noiseSource.connect(gainNode).connect(audioContext.destination);
	noiseSource.start();
}

// Create white noise source
const noiseSource = createWhiteNoise();

// Simulate the waves
simulateWaves(noiseSource);
