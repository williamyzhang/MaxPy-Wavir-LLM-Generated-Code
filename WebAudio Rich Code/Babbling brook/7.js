// Set up the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a filtered noise node
function createFilteredNoise() {
	// Create a buffer
	const bufferSize = audioCtx.sampleRate * 2; // 2 seconds of audio
	const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
	const data = buffer.getChannelData(0);

	// Fill buffer with white noise
	for (let i = 0; i < bufferSize; i++) {
		data[i] = Math.random() * 2 - 1;
	}

	// Create a buffer source
	const noise = audioCtx.createBufferSource();
	noise.buffer = buffer;
	noise.loop = true;

	// Create a biquad filter to shape the noise into a more 'watery' sound
	const biquadFilter = audioCtx.createBiquadFilter();
	biquadFilter.type = 'bandpass';
	biquadFilter.frequency.value = 1000; // Center frequency - play with this to emulate different stream flows
	biquadFilter.Q.value = 1; // Q factor - controls the sharpness of the filter

	// Connect nodes
	noise.connect(biquadFilter);
	biquadFilter.connect(audioCtx.destination);

	return noise;
}

// Create multiple noise nodes with slight variations for a more realistic effect
const brookSounds = [];
for (let j = 0; j < 3; j++) {
	const noise = createFilteredNoise();
	noise.start();
	brookSounds.push(noise);
}

// Function to randomly change filter frequency over time to simulate water dynamics
function modifySound() {
	brookSounds.forEach(noise => {
		const biquadFilter = noise.context.createBiquadFilter();
		biquadFilter.type = 'bandpass';
		biquadFilter.frequency.value = 800 + Math.random() * 400; // Randomize center frequency
		noise.connect(biquadFilter);
		biquadFilter.connect(audioCtx.destination);
	});

	setTimeout(modifySound, 2000); // Change every 2 seconds
}

// Start modifying sound after initial setup
modifySound();
