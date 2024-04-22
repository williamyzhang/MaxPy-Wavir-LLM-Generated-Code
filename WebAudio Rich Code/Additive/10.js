// Create an audio context
const audioContext = new AudioContext();

// Define the fundamental frequency of the sine wave
const fundamentalFrequency = 220; // A3 note, 220 Hz

// Create a gain node for controlling overall volume
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.5; // Set the master gain to a reasonable level
masterGain.connect(audioContext.destination);

// Function to create a sine wave oscillator
function createSineWave(frequency, amplitude) {
	const oscillator = audioContext.createOscillator();
	const gain = audioContext.createGain();

	// Configure oscillator
	oscillator.type = 'sine';
	oscillator.frequency.value = frequency;

	// Configure gain (volume) for this oscillator
	gain.gain.value = amplitude;

	// Connect the oscillator to its gain node and then to the master gain node
	oscillator.connect(gain);
	gain.connect(masterGain);

	// Start the oscillator
	oscillator.start();

	return oscillator;
}

// Create an array to store the oscillators
const oscillators = [];

// Create the fundamental frequency oscillator
oscillators.push(createSineWave(fundamentalFrequency, 0.8)); // Higher amplitude for the fundamental

// Create four partials, each at a harmonic of the fundamental frequency
for (let i = 1; i <= 4; i++) {
	const frequency = fundamentalFrequency * (i + 1); // Calculate the frequency of the harmonic
	const amplitude = 0.2 * Math.random(); // Random amplitude for each partial, up to 0.2
	oscillators.push(createSineWave(frequency, amplitude));
}

// Optionally, stop all oscillators after a set time
setTimeout(() => {
	oscillators.forEach(osc => osc.stop());
	audioContext.close(); // Close the audio context to clean up resources
}, 5000); // Stop after 5 seconds
