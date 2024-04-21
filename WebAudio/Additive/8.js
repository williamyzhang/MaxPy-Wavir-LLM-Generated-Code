// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create oscillator
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Set oscillator type to sine wave

// Additive synthesis parameters
const baseFrequency = 220; // Base frequency of the sine wave
const partials = 4; // Number of partials above the base frequency
const partialAmplitudes = [1, 0.8, 0.6, 0.4]; // Amplitude of each partial

// Create GainNodes for each partial
const partialGainNodes = [];
for (let i = 0; i < partials; i++) {
	const gainNode = audioContext.createGain();
	gainNode.gain.value = partialAmplitudes[i];
	partialGainNodes.push(gainNode);
}

// Connect partials to oscillator
oscillator.connect(audioContext.destination);

// Connect each partial to its respective gain node and add to the destination
for (let i = 0; i < partials; i++) {
	oscillator.frequency.setValueAtTime(baseFrequency * (i + 1), audioContext.currentTime);
	oscillator.connect(partialGainNodes[i]);
	partialGainNodes[i].connect(audioContext.destination);
}

// Start the oscillator
oscillator.start();
