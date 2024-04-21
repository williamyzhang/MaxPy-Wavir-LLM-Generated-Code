// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create white noise buffer
const bufferSize = 2 * audioContext.sampleRate;
const whiteNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = whiteNoiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
	output[i] = Math.random() * 2 - 1;
}

// Create buffer source
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = whiteNoiseBuffer;
whiteNoiseSource.loop = true;

// Create low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass';
lowPassFilter.frequency.value = 1000; // Set cutoff frequency to 1000 Hz

// Connect nodes
whiteNoiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Start playback
whiteNoiseSource.start();
