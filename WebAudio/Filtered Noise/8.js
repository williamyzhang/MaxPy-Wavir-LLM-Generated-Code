// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create white noise buffer
const bufferSize = 2 * audioContext.sampleRate;
const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
	output[i] = Math.random() * 2 - 1;
}

// Create buffer source
const noiseSource = audioContext.createBufferSource();
noiseSource.buffer = noiseBuffer;

// Create low-pass filter
const filter = audioContext.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 1000; // 1000 Hz cutoff frequency

// Connect nodes
noiseSource.connect(filter);
filter.connect(audioContext.destination);

// Start playing
noiseSource.start();

// Stop after 5 seconds (optional)
setTimeout(() => {
	noiseSource.stop();
}, 5000);
