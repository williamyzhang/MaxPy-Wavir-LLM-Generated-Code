// Set up the audio context
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate;
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

// Function to modulate the gain
function createModulator(freq) {
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();

	oscillator.type = 'sine';
	oscillator.frequency.setValueAtTime(freq, audioContext.currentTime); // Low frequency for wave modulation
	gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Modulation depth

	oscillator.connect(gainNode);
	oscillator.start();

	return gainNode;
}

// Connect everything together
function playOceanWaves() {
	const whiteNoise = createWhiteNoise();
	const modulator = createModulator(0.2); // Slow modulation for wave-like effect

	whiteNoise.connect(modulator);
	modulator.connect(audioContext.destination);
	whiteNoise.start();
}

// Start playing
playOceanWaves();

// Stop after a certain time
setTimeout(() => {
	audioContext.close();
}, 10000); // Stops after 10 seconds
