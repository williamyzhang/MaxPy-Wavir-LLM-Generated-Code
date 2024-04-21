// Create an instance of AudioContext
const audioContext = new AudioContext();

// Function to create white noise buffer
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate;
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const output = buffer.getChannelData(0);

	// Fill the buffer with random values
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	return buffer;
}

// Function to play the modulated white noise
function playOceanWaves() {
	const whiteNoise = createWhiteNoise();
	const whiteNoiseSource = audioContext.createBufferSource();
	whiteNoiseSource.buffer = whiteNoise;
	whiteNoiseSource.loop = true;

	// Create a gain node for amplitude modulation
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);

	// Modulate the gain to simulate waves
	for (let i = 0; i < 10; i++) {
		const time = audioContext.currentTime + i * 3;
		const value = Math.random() * 0.3 + 0.1;  // Random gain levels to simulate wave intensity
		gainNode.gain.linearRampToValueAtTime(value, time);
		gainNode.gain.linearRampToValueAtTime(0.01, time + 2.5);
	}

	// Connect nodes
	whiteNoiseSource.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the source
	whiteNoiseSource.start();
}

// Call the function to play the sound
playOceanWaves();
