// 1. Create AudioContext
const audioContext = new AudioContext();

// 2. Create a buffer for the white noise
const bufferSize = 4096; // Choose a buffer size
const noiseBuffer = audioContext.createBuffer(1, bufferSize, audio, sampleRate);

// 3. Fill the buffer with white noise
let channelData = noiseBuffer.getChannelData(0); // Get the buffer's channel data
for (let i = 0; i < bufferSize; i++) {
    // Generate random numbers between -1.0 and 1.0 for white noise
    channelData[i] = Math.random() * 2 - 1;
}

// 4. Create a BufferSource
const noiseSource = audioContext.createBufferSource();
noiseSource.buffer = noiseBuffer;
noiseSource.loop = true; // Loop the noise playback for continuous sound

// 5. Create a low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass'; // Set type to low-pass
lowPassFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Set cutoff to 1000 Hz

// 6. Connect the nodes
noiseSource.connect(lowPassFilter); // Connect noise source to filter
lowPassFilter.connect(audioContext.destination); // Connect filter to output

// Start playback
noiseSource.start();
