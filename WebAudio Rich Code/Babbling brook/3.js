const audioContext = new AudioContext();
function createWhiteNoise() {
	const bufferSize = 2 * audioContext.sampleRate;  // Buffer size of 2 seconds
	const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	let output = noiseBuffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;  // Generate random numbers between -1 and 1
	}

	const whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	return whiteNoise;
}
function applyLowPassFilter(source) {
	const lowPass = audioContext.createBiquadFilter();
	lowPass.type = 'lowpass';
	lowPass.frequency.value = 1000;  // Lower the frequency to soften the sound
	source.connect(lowPass);
	return lowPass;
}
function modulateFilter(filter) {
	const lfo = audioContext.createOscillator();
	lfo.type = 'sine';
	lfo.frequency.setValueAtTime(0.5, audioContext.currentTime);  // Slow LFO for modulation

	const lfoGain = audioContext.createGain();
	lfoGain.gain.setValueAtTime(500, audioContext.currentTime);  // Depth of modulation

	lfo.connect(lfoGain);
	lfoGain.connect(filter.frequency);
	lfo.start();
}
function playBabblingBrook() {
	const whiteNoise = createWhiteNoise();
	const filteredNoise = applyLowPassFilter(whiteNoise);
	modulateFilter(filteredNoise);

	filteredNoise.connect(audioContext.destination);  // Connect to the output
	whiteNoise.start();  // Start playing the noise
}

playBabblingBrook();
