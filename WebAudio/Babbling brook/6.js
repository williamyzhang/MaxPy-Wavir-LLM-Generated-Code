// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Create a ScriptProcessorNode for generating audio
const bufferSize = 4096;
const scriptNode = audioCtx.createScriptProcessor(bufferSize, 0, 1);

// Set up audio parameters
let sampleRate = audioCtx.sampleRate;
let time = 0;
let noiseBuffer = new Float32Array(bufferSize);
let gainNode = audioCtx.createGain();
gainNode.gain.value = 0.3; // Adjust the volume

// Fill noise buffer with random noise
for (let i = 0; i < bufferSize; i++) {
	noiseBuffer[i] = Math.random() * 2 - 1;
}

// Function to generate babbling brook sound
scriptNode.onaudioprocess = function (audioProcessingEvent) {
	let outputBuffer = audioProcessingEvent.outputBuffer;
	let outputData = outputBuffer.getChannelData(0);

	for (let i = 0; i < bufferSize; i++) {
		// Add some randomness to simulate water flow
		let randomValue = Math.random() * 0.05 - 0.025;

		// Modulate the noise to simulate water sounds
		outputData[i] = noiseBuffer[i] * Math.sin(2 * Math.PI * time * 0.3) + randomValue;

		time += 1 / sampleRate;
	}
}

// Connect the nodes
scriptNode.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Start the audio
scriptNode.start();
