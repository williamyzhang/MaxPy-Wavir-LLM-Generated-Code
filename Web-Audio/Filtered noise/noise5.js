// Step 1: Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create a buffer source for white noise
const bufferSize = 4096; // Set the size of the buffer
const whiteNoiseSource = audioContext.createBufferSource();
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
let data = buffer.getChannelData(0);

// Fill the buffer with white noise;
// Math.random() * 2 - 1 produces random numbers between -1 and 1,
// which is the range for audio signals
for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
}

whiteNoiseSource.buffer = buffer;
whiteNoiseSource.loop = true;

// Step 3: Create a BiquadFilterNode for low-pass filtering
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass'; // Set filter to low-pass
lowPassFilter.frequency.value = 1000; // Set cutoff frequency to 1000 Hz

// Step 4: Connect the nodes together: whiteNoiseSource -> lowPassFilter -> destination(AudioContext)
whiteNoiseSource.connect(lowPassVilter);
lowPassFilter.connect(audioContext.destination);

// Step 5: Play the sound
whiteNoiseSource.start();
