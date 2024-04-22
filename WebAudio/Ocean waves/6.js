// Create an AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create a wave sound
function createWaveSound() {
	// Create a buffer to hold the audio data
	const bufferSize = 2 * audioContext.sampleRate;
	const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const data = buffer.getChannelData(0);

	// Generate wave sound data
	for (let i = 0; i < bufferSize; i++) {
		// Simulate wave sound by adding random noise
		data[i] = Math.random() * 2 - 1;
	}

	// Create a buffer source node
	const source = audioContext.createBufferSource();
	source.buffer = buffer;
	source.loop = true;

	// Connect the source to the destination (speakers)
	source.connect(audioContext.destination);

	// Start playing the sound
	source.start();

	return source;
}

// Create wave sound
const waveSound = createWaveSound();

// To stop the sound (e.g., after a certain duration)
// setTimeout(() => {
//   waveSound.stop();
// }, 5000); // Stop after 5 seconds
