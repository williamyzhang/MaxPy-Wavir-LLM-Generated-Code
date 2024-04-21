// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Set the fundamental frequency of the wave
const fundamentalFrequency = 440; // A4 note, 440 Hz

// Create a gain node (to control the overall volume)
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.2; // Reduce volume to avoid clipping
masterGain.connect(audioContext.destination);

// Function to create an oscillator for a given harmonic
function createHarmonic(frequency, amplitude) {
	const oscillator = audioContext.createOscillator();
	const gain = audioContext.createGain();

	// Oscillator settings
	oscillator.type = 'sine'; // Sine wave
	oscillator.frequency.value = frequency;

	// Gain (amplitude) settings
	gain.gain.value = amplitude;

	// Connect nodes
	oscillator.connect(gain);
	gain.connect(masterGain);
	oscillator.start();

	return oscillator;
}

// Create the fundamental and harmonics
const oscillators = [];
oscillators.push(createHarmonic(fundamentalFrequency, 1)); // Fundamental

// Add harmonics
const numberOfHarmonics = 4;
for (let i = 1; i <= numberOfHarmonics; i++) {
	let randomAmplitude = 0.5 + Math.random() * 0.5; // Randomize amplitude between 0.5 and 1
	oscillators.push(createHarmonic(fundamentalFrequency * (i + 1), randomAmplitude));
}

// Optionally, stop all oscillators after a certain time
setTimeout(() => {
	oscillators.forEach(osc => osc.stop());
	audioContext.close(); // Close the context if not needed anymore
}, 5000); // Stop after 5 seconds
