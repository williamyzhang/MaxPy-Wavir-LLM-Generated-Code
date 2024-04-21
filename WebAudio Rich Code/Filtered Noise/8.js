// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create an empty stereo buffer at the sample rate of the audio context
const bufferSize = 2 * audioCtx.sampleRate * 1.0; // 1 second of audio
const myBuffer = audioCtx.createBuffer(2, bufferSize, audioCtx.sampleRate);

// Fill the buffer with white noise;
// Math.random() produces values between 0 and 1, so we need to adjust
// these to be between -1 and 1 to represent audio wave amplitudes.
for (let channel = 0; channel < myBuffer.numberOfChannels; channel++) {
	// This gives us the actual array that contains the data
	const nowBuffering = myBuffer.getChannelData(channel);
	for (let i = 0; i < bufferSize; i++) {
		// Math.random() * 2 - 1 gives a random number between -1 and 1
		nowBuffering[i] = Math.random() * 2 - 1;
	}
}

// Create a buffer source node
const source = audioCtx.createBufferSource();
source.buffer = myBuffer;

// Create the low-pass filter
const filter = audioCtx.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 1000; // Set cutoff to 1000 Hz

// Connect the source to the filter, and the filter to the destination
source.connect(filter);
filter.connect(audioCtx.destination);

// Start playing the sound
source.start();

// To handle user interaction for playing audio, you can use this:
document.addEventListener('click', function () {
	// Ensure audio plays after user interaction
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
});

// Optionally stop the source after a set time
setTimeout(() => {
	source.stop();
	// Disconnect after stopping
	source.disconnect(filter);
	filter.disconnect(audioCtx.destination);
}, 1000); // stop after 1 second
