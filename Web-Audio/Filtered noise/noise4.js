// Create a new AudioContext
const audioContext = new AudioContext();

// Create a buffer source
const bufferSize = 4096; // Set buffer size
const whiteNoiseSource = audioContext.createBufferSource();
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);

// Fill the buffer with white noise; that is, a random value between -1.0 and 1.0
let data = buffer.getChannelData(0); // Get reference to data array for channel 0
for (let i = 0; i < bufferSize; i++) {
  data[i] = Math.random() * 2 - 1;
}

// Set the buffer in the buffer source
whiteNoiseSource.buffer = buffer;

// Loop the white noise source
whiteNoiseSource.loop = true;

// Create a BiquadFilterNode
const biquadFilter = audioContext.createBiquadFilter();
biquadFilter.type = "lowpass"; // Set filter type as low-pass
biquadFilter.frequency.value = 1000; // Set the frequency

// Connect the white noise source to the filter, and the filter to the destination
whiteNoiseSource.connect(biquadFilter);
biquadFilter.connect(audioContext.destination);

// Start playing the white noise
whiteNoiseSource.start();
