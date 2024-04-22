// Create a new audio context
const audioContext = new AudioContext();

// Create a buffer size
const bufferSize = 4096;

// Create a ScriptProcessorNode (or AudioWorkletNode in modern implementations)
const noiseGenerator = audioContext.createScriptProcessor(bufferSize, 1, 1);

// Function to generate white noise
noiseGenerator.onaudioprocess = function (audioProcessingEvent) {
	// Get the buffer to fill with noise
	var output = audioProcessingEvent.outputBuffer.getChannelData(0);

	// Fill the buffer with random values between -1.0 and 1.0
	for (var i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}
};

// Create a BiquadFilterNode
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass';       // Set filter type to low-pass
lowPassFilter.frequency.value = 1000; // Set the cutoff frequency to 1000 Hz

// Connect the noise generator to the low-pass filter
noiseGenerator.connect(lowPassFilter);

// Connect the low-pass filter to the audio context's destination
lowPassFilter.connect(audioContext.destination);

// Start playing the noise (Note: some browsers require user interaction to start)
document.addEventListener('click', () => {
	if (audioContext.state === 'suspended') {
		audioContext.resume();
	}
});
