// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a ScriptProcessorNode to generate audio data
const bufferSize = 4096;
const scriptNode = audioCtx.createScriptProcessor(bufferSize, 1, 1);

// Connect the scriptNode to the audio context
scriptNode.connect(audioCtx.destination);

// Generate white noise
scriptNode.onaudioprocess = function (audioProcessingEvent) {
	const outputBuffer = audioProcessingEvent.outputBuffer;
	const outputData = outputBuffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i++) {
		// Generate random noise between -1 and 1
		outputData[i] = Math.random() * 2 - 1;
	}
};

// Create a BiquadFilterNode for the low-pass filter
const lowpassFilter = audioCtx.createBiquadFilter();
lowpassFilter.type = 'lowpass';
lowpassFilter.frequency.value = 1000; // Set cutoff frequency to 1000 Hz

// Connect the filter to the scriptNode
scriptNode.connect(lowpassFilter);
lowpassFilter.connect(audioCtx.destination);

// Start audio processing
scriptNode.start();
