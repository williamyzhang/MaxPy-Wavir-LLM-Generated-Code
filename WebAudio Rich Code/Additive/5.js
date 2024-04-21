// Set up the audio context
const audioContext = new AudioContext();

// Function to create and start an oscillator
function createOscillator(frequency, amplitude) {
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();

	oscillator.type = 'sine'; // Set the waveform type
	oscillator.frequency.value = frequency; // Set the frequency
	gainNode.gain.value = amplitude; // Set the amplitude

	// Connect the oscillator to the gain node and the gain node to the context's destination
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	oscillator.start(); // Start the oscillator
	return oscillator;
}

// Define the fundamental frequency
const fundamentalFrequency = 440; // A4 note, 440 Hz

// Create the fundamental oscillator
const fundamentalOscillator = createOscillator(fundamentalFrequency, 0.5); // Higher amplitude for fundamental

// Create partials
const numberOfPartials = 4;
let partials = [];

for (let i = 1; i <= numberOfPartials; i++) {
	const frequency = fundamentalFrequency * (i + 1); // Frequency for each partial
	const amplitude = Math.random() * 0.5; // Random amplitude between 0 and 0.5
	partials.push(createOscillator(frequency, amplitude));
}

// Optionally stop oscillators after some time
setTimeout(() => {
	fundamentalOscillator.stop();
	partials.forEach(osc => osc.stop());
	audioContext.close();
}, 5000); // Stops after 5 seconds
