// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create gain node for controlling volume
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

// Create a buffer for the babbling brook sound
const bufferSize = 4096;
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const data = buffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
	// Generate random values for the audio buffer to simulate the sound of a babbling brook
	data[i] = Math.random() * 2 - 1;
}

// Create a buffer source
const source = audioContext.createBufferSource();
source.buffer = buffer;
source.loop = true;
source.connect(gainNode);

// Start the buffer source
source.start();

// You can adjust the volume by changing the gain value (0 to 1)
gainNode.gain.value = 0.5;
