// Set up the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a buffer source
const bufferSize = 4096; // Number of samples in the buffer
const whiteNoise = audioContext.createBufferSource();
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);

// Fill the buffer with white noise data using Math.random()
let data = buffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
	data[i] = Math.random() * 2 - 1;  // Generate white noise between -1 and 1
}

whiteNoise.buffer = buffer;
whiteNoise.loop = true;

// Create a low-pass filter
const filter = audioContext.createBiquadFilter();
filter.type = 'lowpass'; // Set the filter type to low-pass
filter.frequency.value = 1000; // Set the cutoff frequency to 1000 Hz

// Connect the white noise to the filter, and the filter to the output
whiteNoise.connect(filter);
filter.connect(audioContext.destination);

// Start the playback of white noise
whiteNoise.start(0);

// Optionally, you can stop it after a certain time
// whiteNoise.stop(audioContext.currentTime + 10); // stops after 10 seconds
