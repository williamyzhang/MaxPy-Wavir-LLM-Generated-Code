// Create an audio context
const audioContext = new AudioContext();

// Create a buffer source
const bufferSize = audioContext.sampleRate * 2; // 2 seconds of audio
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = buffer.getChannelData(0);

// Fill the buffer with white noise
for (let i = 0; i < bufferSize; i++) {
	output[i] = Math.random() * 2 - 1;
}

// Create a buffer source node
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = buffer;
whiteNoiseSource.loop = true;

// Create a low-pass filter
const filter = audioContext.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.setValueAtTime(1000, audioContext.currentTime);

// Connect the white noise source to the filter, then to the destination
whiteNoiseSource.connect(filter);
filter.connect(audioContext.destination);

// Start playback
whiteNoiseSource.start();
