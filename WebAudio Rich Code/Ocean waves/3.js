// Create audio context
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate; // 2 seconds of audio
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	let data = buffer.getChannelData(0);

	// Fill buffer with random values, which generates white noise
	for (let i = 0; i < bufferSize; i++) {
		data[i] = Math.random() * 2 - 1;
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = buffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Create a lowpass filter
function createLowpassFilter() {
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 1000; // Start with a cutoff at 1000 Hz
	return filter;
}

// Create an oscillator to modulate the volume
function createVolumeOscillator() {
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // Sine wave for smooth modulation
	oscillator.frequency.value = 0.1; // Modulate at 0.1 Hz (every 10 seconds)

	const gainNode = audioContext.createGain();
	gainNode.gain.value = 0.5; // Start at half volume

	oscillator.connect(gainNode.gain);
	oscillator.start();

	return gainNode;
}

// Setting up the nodes
const whiteNoise = createWhiteNoise();
const filter = createLowpassFilter();
const volumeControl = createVolumeOscillator();

// Connect everything
whiteNoise.connect(filter);
filter.connect(volumeControl);
volumeControl.connect(audioContext.destination);

// Start the sound
whiteNoise.start();

