// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create buffer size and sample rate
const bufferSize = 2 * audioContext.sampleRate;
const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = noiseBuffer.getChannelData(0);

// Fill the buffer with white noise
for (let i = 0; i < bufferSize; i++) {
	output[i] = Math.random() * 2 - 1;
}

// Create a Biquad Filter Node
const filter = audioContext.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 1000; // Set the cutoff frequency to 1000 Hz

// Connect the nodes
const source = audioContext.createBufferSource();
source.buffer = noiseBuffer;
source.connect(filter);
filter.connect(audioContext.destination);

// Start the playback
source.start();
