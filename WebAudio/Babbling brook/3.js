// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create a white noise buffer
function createWhiteNoiseBuffer(duration, sampleRate) {
	const bufferSize = Math.floor(duration * sampleRate);
	const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < bufferSize; i++) {
		data[i] = Math.random() * 2 - 1; // Generate random noise between -1 and 1
	}
	return buffer;
}

// Create audio nodes
const whiteNoiseNode = audioContext.createBufferSource();
whiteNoiseNode.buffer = createWhiteNoiseBuffer(10, audioContext.sampleRate);
whiteNoiseNode.loop = true;
whiteNoiseNode.start(0);

const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass';
lowPassFilter.frequency.value = 2000; // Adjust this value for different filtering effects

const highPassFilter = audioContext.createBiquadFilter();
highPassFilter.type = 'highpass';
highPassFilter.frequency.value = 500; // Adjust this value for different filtering effects

// Connect nodes
whiteNoiseNode.connect(lowPassFilter);
lowPassFilter.connect(highPassFilter);
highPassFilter.connect(audioContext.destination);

// Optional: You can add more audio nodes and connect them in the graph to simulate additional sound effects like splashes or rustling leaves

// Function to change filter parameters dynamically (e.g., to simulate wind gusts)
function changeFilterParameters(lowpassFreq, highpassFreq) {
	lowPassFilter.frequency.setValueAtTime(lowpassFreq, audioContext.currentTime);
	highPassFilter.frequency.setValueAtTime(highpassFreq, audioContext.currentTime);
}

// Example usage: simulate a wind gust
changeFilterParameters(3000, 1000); // Increase low-pass and high-pass frequencies to simulate wind
