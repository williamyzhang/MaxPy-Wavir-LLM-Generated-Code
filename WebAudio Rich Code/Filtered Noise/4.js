// Step 1: Create the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create a buffer source
const bufferSize = 4096;
const sampleRate = audioContext.sampleRate;
const noiseBuffer = audioContext.createBuffer(1, bufferSize, sampleRate);
const output = noiseBuffer.getChannelData(0);

// Step 3: Fill the buffer with white noise
for (let i = 0; i < bufferSize; i++) {
	output[i] = Math.random() * 2 - 1; // Generates a random value between -1 and 1
}

// Step 4: Create and configure the low-pass filter
const lowpassFilter = audioContext.createBiquadFilter();
lowpassFilter.type = 'lowpass';
lowpassFilter.frequency.value = 1000;

// Step 5: Connect the nodes
const bufferSource = audioContext.createBufferSource();
bufferSource.buffer = noiseBuffer;
bufferSource.loop = true; // Loop the noise buffer
bufferSource.connect(lowpassFilter);
lowpassFilter.connect(audioContext.destination);

// Step 6: Play the sound
bufferSource.start();

// Optional: Stop the sound after a certain time
setTimeout(() => {
	bufferSource.stop();
	audioContext.close(); // Good practice to close the context if not used anymore
}, 10000); // Stops after 10 seconds
