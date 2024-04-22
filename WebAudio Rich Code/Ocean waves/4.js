// Initialize the AudioContext
const audioContext = new AudioContext();

// Function to create buffer with white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate,
		noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
		output = noiseBuffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}
	return noiseBuffer;
}

// Create a white noise source
const whiteNoise = audioContext.createBufferSource();
whiteNoise.buffer = createWhiteNoise();
whiteNoise.loop = true;

// Create a BiquadFilterNode
const filter = audioContext.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 1000; // Lowpass filter to mimic the sound of ocean waves

// Create a GainNode for volume control
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.01, audioContext.currentTime); // Start quiet

// Modulate the gain to simulate waves
for (let i = 0; i < 200; i++) {
	let time = audioContext.currentTime + i * 0.25;
	let value = 0.05 + Math.random() * 0.3;
	gainNode.gain.exponentialRampToValueAtTime(value, time);
}

// Connect everything
whiteNoise.connect(filter);
filter.connect(gainNode);
gainNode.connect(audioContext.destination);

// Start playing the sound
whiteNoise.start();
