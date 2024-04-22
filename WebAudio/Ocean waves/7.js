// Create Audio Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create audio buffer
function createWaveBuffer() {
	const sampleRate = audioContext.sampleRate;
	const duration = 2; // Duration of the wave sound in seconds
	const bufferSize = duration * sampleRate;
	const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
	const data = buffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		// Generate random noise for the sound of waves
		data[i] = Math.random() * 2 - 1; // Range from -1 to 1
	}

	return buffer;
}

// Create audio buffer source
const waveBuffer = createWaveBuffer();
const source = audioContext.createBufferSource();
source.buffer = waveBuffer;
source.loop = true;

// Connect audio source to output
source.connect(audioContext.destination);

// Play the wave sound
source.start(0);
