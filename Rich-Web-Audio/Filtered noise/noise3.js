// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a BufferSource node
const bufferSize = audioContext.sampleRate * 2; // buffer size of 2 seconds
const bufferSource = audioContext.createBufferSource();
bufferSource.buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);

// Populate the buffer with white noise
// Directly assigning random values to the buffer for L channel
let channelData = bufferSource.buffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  channelData[i] = Math.random() * 2 - 1; // generate white noise
}

// Create a BiquadFilterNode (low-pass filter)
const biquadFilter = audioContext.createBiquadFilter();
biquadFilter.type = 'lowpass';
biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set cutoff frequency to 1000 Hz

// Connect the nodes
bufferSource.connect(biquadFilter); // Connect the buffer source to the filter
biquadFilter.connect(audioContext.destination); // Connect the filter to the output (speakers)

// Start playing the sound
bufferSource.start();
