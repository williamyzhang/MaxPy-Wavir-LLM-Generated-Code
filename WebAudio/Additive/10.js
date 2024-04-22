// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Define parameters
const baseFrequency = 440; // Base frequency of the sine wave
const numPartials = 4; // Number of partials
const partialsAmplitudes = [1.0, 0.5, 0.3, 0.2]; // Amplitudes of partials relative to the base frequency
const partialsFrequencies = [1, 2, 3, 4]; // Frequencies of partials relative to the base frequency

// Create an oscillator node for the base sine wave
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Sine wave
oscillator.frequency.value = baseFrequency;

// Create GainNodes for each partial and connect them to the destination
const partials = [];
for (let i = 0; i < numPartials; i++) {
	const partial = audioContext.createGain();
	partial.gain.value = partialsAmplitudes[i];

	const partialOscillator = audioContext.createOscillator();
	partialOscillator.type = 'sine';
	partialOscillator.frequency.value = baseFrequency * partialsFrequencies[i]; // Set frequency of the partial

	// Connect the partial oscillator to its gain node and then to the destination
	partialOscillator.connect(partial);
	partial.connect(audioContext.destination);

	partials.push(partial);
}

// Connect the base oscillator to the destination
oscillator.connect(audioContext.destination);

// Start the oscillators
oscillator.start();
partials.forEach(partial => partial.gain.setValueAtTime(0, audioContext.currentTime)); // Start partials at 0
partials.forEach(partial => partial.gain.linearRampToValueAtTime(1.0, audioContext.currentTime + 1)); // Ramp up partials to their full amplitude
