// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and connect an oscillator node for a given frequency and amplitude
function createOscillator(frequency, amplitude) {
	const oscillator = audioContext.createOscillator();
	oscillator.frequency.value = frequency;

	const gainNode = audioContext.createGain();
	gainNode.gain.value = amplitude;

	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	return oscillator;
}

// Function to generate a single frame of audio
function generateFrame() {
	const numHarmonics = 10; // Number of harmonics to generate
	const baseFrequency = 220; // Base frequency in Hz
	const duration = 1; // Duration of the frame in seconds

	// Create an empty AudioBuffer to store the generated audio
	const frameBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);

	// Get the audio data for the single channel
	const frameData = frameBuffer.getChannelData(0);

	// Loop through each sample in the frame
	for (let i = 0; i < frameData.length; i++) {
		let sample = 0;

		// Generate each harmonic and sum their values
		for (let h = 1; h <= numHarmonics; h++) {
			const frequency = baseFrequency * h;
			const amplitude = 1 / h; // Amplitude decreases for higher harmonics

			// Calculate the value of the sine wave for this harmonic
			sample += Math.sin(2 * Math.PI * frequency * (i / audioContext.sampleRate)) * amplitude;
		}

		// Store the sample value in the buffer
		frameData[i] = sample;
	}

	// Create an AudioBufferSourceNode to play the generated audio
	const source = audioContext.createBufferSource();
	source.buffer = frameBuffer;

	// Connect the source node to the audio context's destination
	source.connect(audioContext.destination);

	// Start playing the audio
	source.start();
}

// Call the function to generate and play a frame of audio
generateFrame();
