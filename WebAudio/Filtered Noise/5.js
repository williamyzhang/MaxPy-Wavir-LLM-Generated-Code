// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create buffer size and sample rate
const bufferSize = 2 * audioContext.sampleRate;
const whiteNoise = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = whiteNoise.getChannelData(0);

// Fill the buffer with white noise
for (let i = 0; i < bufferSize; i++) {
	output[i] = Math.random() * 2 - 1;
}

// Create a low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = "lowpass";
lowPassFilter.frequency.value = 1000; // Set cutoff frequency to 1000 Hz

// Connect the white noise buffer to the low-pass filter
const source = audioContext.createBufferSource();
source.buffer = whiteNoise;
source.connect(lowPassFilter);

// Connect the low-pass filter to the audio context destination (output)
lowPassFilter.connect(audioContext.destination);

// Start the white noise
source.start();

// Optionally, stop the noise after some time
// setTimeout(() => {
//   source.stop();
// }, 5000); // Stop after 5 seconds
