// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create AudioBuffer to store wave sound
function createWaveSound() {
	const duration = 5; // duration of the wave sound in seconds
	const sampleRate = audioContext.sampleRate;
	const numFrames = duration * sampleRate;
	const buffer = audioContext.createBuffer(1, numFrames, sampleRate);
	const data = buffer.getChannelData(0);

	// Generate wave sound data
	for (let i = 0; i < numFrames; i++) {
		// Simple wave equation to simulate ocean waves
		data[i] = Math.sin(2 * Math.PI * 0.1 * (i / sampleRate)); // Adjust the frequency to your liking
	}

	return buffer;
}

// Create AudioBufferSourceNode
const waveSoundBuffer = createWaveSound();
const waveSoundSource = audioContext.createBufferSource();
waveSoundSource.buffer = waveSoundBuffer;

// Connect to output
waveSoundSource.connect(audioContext.destination);

// Play the wave sound
waveSoundSource.start();
