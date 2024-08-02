// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a buffer source
const bufferSize = 4096; // Change this value if needed
const bufferSource = audioContext.createBufferSource();
bufferSource.buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);

// Fill the buffer with white noise
// Math.random() is used inside the for loop for randomness
let data = bufferSource.buffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
}

// Create a BiquadFilterNode for the low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass'; // Set the filter type to low-pass
lowPassFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set the cut-off frequency to 1000 Hz

// Connect the nodes together
bufferSource.connect(lowPassFilter); // Connect the buffer source to the filter
lowPassFilter.connect(audioContext.destination); // Connect the filter to the destination (usually the speakers)

// Start playing the sound
bufferSource.start();
