// Step 1: Create an audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create a buffer source
var bufferSize = 4096;  // Choose a buffer size
var myNoise = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
var output = myNoise.getChannelData(0);

// Step 3: Fill the buffer with white noise
for (var i = 0; i < bufferSize; i++) {
	// Generate random numbers between -1.0 and 1.0
	output[i] = Math.random() * 2 - 1;
}

// Step 4: Create and configure a low-pass filter
var myFilter = audioCtx.createBiquadFilter();
myFilter.type = 'lowpass';
myFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);

// Step 5: Create a buffer source node
var source = audioCtx.createBufferSource();
source.buffer = myNoise;

// Connect the source to the filter, and the filter to the destination
source.connect(myFilter);
myFilter.connect(audioCtx.destination);

// Start playing the noise
source.start();
