// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a buffer filled with wave sound
function createWaveBuffer() {
	const duration = 2; // Duration of the wave sound in seconds
	const sampleRate = audioContext.sampleRate;
	const length = duration * sampleRate;
	const buffer = audioContext.createBuffer(1, length, sampleRate);
	const data = buffer.getChannelData(0);

	for (let i = 0; i < length; i++) {
		// Generate random noise for a wave-like sound
		data[i] = Math.random() * 2 - 1;
	}

	return buffer;
}

// Function to play the wave sound
function playWaveSound() {
	const source = audioContext.createBufferSource();
	source.buffer = createWaveBuffer();
	source.connect(audioContext.destination);
	source.start(0);
}

// Play the wave sound when the page loads
playWaveSound();
