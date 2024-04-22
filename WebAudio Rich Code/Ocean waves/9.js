// Create the audio context
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate,
		noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
		output = noiseBuffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1; // Generate random values between -1 and 1
	}
	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}

// Create bandpass filter to shape the noise into a more 'wave-like' sound
function createBandpassFilter() {
	const bandpass = audioContext.createBiquadFilter();
	bandpass.type = 'bandpass';
	bandpass.frequency.value = 1000; // Center frequency - can be adjusted
	bandpass.Q.value = 0.5; // Quality factor - can be adjusted
	return bandpass;
}

// Create gain node for controlling the volume envelope
function createGain() {
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
	gainNode.gain.exponentialRampToValueAtTime(0.5, audioContext.currentTime + 2); // Fade in
	gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 4); // Fade out
	return gainNode;
}

// Function to play the ocean wave sound
function playOceanWaves() {
	const whiteNoise = createWhiteNoise();
	const bandpassFilter = createBandpassFilter();
	const gainNode = createGain();

	// Connect the nodes
	whiteNoise.connect(bandpassFilter);
	bandpassFilter.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the sound
	whiteNoise.start();

	// Stop the sound after 5 seconds
	setTimeout(() => {
		whiteNoise.stop();
		console.log('Stopped ocean wave sound');
	}, 5000);
}

// Play the ocean waves sound
playOceanWaves();
