// Create audio context
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate; // 2 seconds of audio
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const output = buffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1; // Generate random values between -1 and 1
	}

	const whiteNoiseSource = audioContext.createBufferSource();
	whiteNoiseSource.buffer = buffer;
	whiteNoiseSource.loop = true;

	return whiteNoiseSource;
}

// Function to apply lowpass filter
function applyLowPassFilter(source) {
	const filter = audioContext.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.setValueAtTime(1000, audioContext.currentTime); // Lowpass filter at 1000 Hz
	source.connect(filter);
	return filter;
}

// Function to create volume control (Gain Node)
function createVolumeControl() {
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Start with medium volume
	return gainNode;
}

// Function to modulate volume for wave effect
function modulateVolume(gainNode) {
	const now = audioContext.currentTime;
	gainNode.gain.setValueAtTime(gainNode.gain.value, now);
	gainNode.gain.linearRampToValueAtTime(0.1, now + 2); // Decrease to low
	gainNode.gain.linearRampToValueAtTime(0.5, now + 4); // Increase back to medium
	setTimeout(() => modulateVolume(gainNode), 4000); // Continue modulation every 4 seconds
}

// Create white noise source
const noise = createWhiteNoise();

// Apply lowpass filter
const filteredNoise = applyLowPassFilter(noise);

// Create and connect gain node for volume control
const volumeControl = createVolumeControl();
filteredNoise.connect(volumeControl);
volumeControl.connect(audioContext.destination);

// Start noise source
noise.start(0);

// Modulate volume to simulate waves
modulateVolume(volumeControl);
