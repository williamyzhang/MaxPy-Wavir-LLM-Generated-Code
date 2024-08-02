// Step 1: Create an AudioContext
const audioContext = new AudioContext();

// Step 2: Create a buffer and fill it with white noise
const bufferSize = 2 * audioContext.sampleRate, // Buffer size - Here, 2 seconds of audio
      buffer = audioContext.createBuffer(1, bufferSize, audioConstants.sampleRate), // 1 channel, bufferSize, and sampleRate
      output = buffer.getChannelData(0); // Get the data array for the buffer

for (let i = 0; i < bufferSize; i++) {
    // Step 3: Fill the buffer with random values
    output[i] = Math.random() * 2 - 1; // Generate random numbers between -1 and 1
}

// Step 4: Create a BufferSource node and set the buffer
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = buffer;

// Step 5: Create a BiquadFilter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass'; // Set the filter type to lowpass
lowPassFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set the frequency to 1000 Hz

// Connect the white noise source to the low-pass filter
whiteNoiseSource.connect(lowPassFilter);

// Connect the low-pass filter to the destination (e.g., speakers)
lowPassFilter.connect(audioContext.destination);

// Start playing the white noise
whiteNoiseSource.start();
