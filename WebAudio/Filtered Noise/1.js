// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create white noise buffer
const bufferSize = 2 * audioContext.sampleRate,
	noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
	output = noiseBuffer.getChannelData(0);

for (let i = 0; i < bufferSize; i++) {
	output[i] = Math.random() * 2 - 1;
}

// Create buffer source
const whiteNoise = audioContext.createBufferSource();
whiteNoise.buffer = noiseBuffer;
whiteNoise.loop = true;

// Create low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = "lowpass";
lowPassFilter.frequency.value = 1000; // Set cutoff frequency to 1000 Hz

// Connect the nodes
whiteNoise.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start the white noise
whiteNoise.start();

// Stop the white noise after a certain duration (for example, 5 seconds)
setTimeout(() => {
	whiteNoise.stop();
}, 5000);
