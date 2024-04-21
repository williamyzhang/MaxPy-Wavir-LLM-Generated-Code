// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create a StereoPannerNode to pan the sound
const panner = audioContext.createStereoPanner();
panner.pan.value = 0; // Center the sound

// Create a GainNode to control the overall volume
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5; // Adjust the volume as needed

// Connect nodes
gainNode.connect(panner);
panner.connect(audioContext.destination);

// Create the babbling brook sound
function createBabblingBrook() {
	const bufferSize = 4096;
	const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	const output = noiseBuffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		// Generate random noise with low-pass filtering
		output[i] = Math.random() * 2 - 1;
	}

	// Create the buffer source
	const noiseSource = audioContext.createBufferSource();
	noiseSource.buffer = noiseBuffer;
	noiseSource.loop = true;

	// Connect source to panner and gain
	noiseSource.connect(gainNode);
	noiseSource.start();

	// Return the noise source for further manipulation if needed
	return noiseSource;
}

// Create the babbling brook sound
const babblingBrook = createBabblingBrook();

// Optionally, you can control the panning and gain in real-time
// For example, to pan the sound to the left:
// panner.pan.value = -1;
// To increase the volume:
// gainNode.gain.value = 1;
