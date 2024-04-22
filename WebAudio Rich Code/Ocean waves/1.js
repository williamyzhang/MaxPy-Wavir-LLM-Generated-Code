// Create the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioCtx.sampleRate, // buffer for 2 seconds
		noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
		output = noiseBuffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1; // generate random values between -1.0 and 1.0
	}

	const whiteNoise = audioCtx.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Create a lowpass filter
function createLowpassFilter() {
	const filter = audioCtx.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.setValueAtTime(1000, audioCtx.currentTime); // lower frequencies more like ocean
	return filter;
}

// Create a gain node for volume modulation
function createGainNode() {
	const gainNode = audioCtx.createGain();
	gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
	return gainNode;
}

// Connect everything together
const whiteNoise = createWhiteNoise();
const filter = createLowpassFilter();
const gainNode = createGainNode();

whiteNoise.connect(filter);
filter.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Modulate the gain to simulate waves
function modulateGain() {
	const now = audioCtx.currentTime;
	gainNode.gain.setValueAtTime(gainNode.gain.value, now);
	gainNode.gain.linearRampToValueAtTime(0.5 + Math.random() * 0.5, now + 5);
	gainNode.gain.linearRampToValueAtTime(0.2 + Math.random() * 0.3, now + 10);
}

// Start noise and modulate gain periodically
whiteNoise.start();
setInterval(modulateGain, 10000); // Modulate every 10 seconds

// To start and stop the sound, add controls as needed
