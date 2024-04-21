// 1. Create the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 2. Create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioCtx.sampleRate; // 2 seconds of noise
	const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
	let data = buffer.getChannelData(0);

	// Fill the buffer with random values
	for (let i = 0; i < bufferSize; i++) {
		data[i] = Math.random() * 2 - 1; // Generate random values between -1 and 1
	}

	const whiteNoise = audioCtx.createBufferSource();
	whiteNoise.buffer = buffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// 3. Modulate the noise with an LFO
function modulateNoise(noiseSource) {
	const gainNode = audioCtx.createGain();

	// LFO to control the gain
	const lfo = audioCtx.createOscillator();
	lfo.frequency.setValueAtTime(0.5, audioCtx.currentTime); // Slow LFO frequency (0.5 Hz)

	// LFO amplitude settings: from 0.2 to 1
	const lfoGain = audioCtx.createGain();
	lfoGain.gain.setValueAtTime(0.4, audioCtx.currentTime); // Depth of modulation

	// Connect LFO to the gain node's gain parameter
	lfo.connect(lfoGain);
	lfoGain.connect(gainNode.gain);
	noiseSource.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	// Start LFO
	lfo.start();

	return gainNode;
}

// Create and modulate noise
const noiseSource = createWhiteNoise();
const modulatedNoise = modulateNoise(noiseSource);

// Start playing the sound
noiseSource.start();

// Optionally, stop the sound after a duration
setTimeout(() => {
	noiseSource.stop();
	audioCtx.close();
}, 10000); // Stop after 10 seconds
