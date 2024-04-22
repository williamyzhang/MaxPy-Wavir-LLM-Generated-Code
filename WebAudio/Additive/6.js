// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator node (sine wave)
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Set oscillator type to sine wave

// Create a gain node to control the overall volume
const gainNode = audioContext.createGain();

// Connect the oscillator to the gain node
oscillator.connect(gainNode);

// Connect the gain node to the destination (audio output)
gainNode.connect(audioContext.destination);

// Set the initial frequency and amplitude for the fundamental frequency
const fundamentalFrequency = 440; // Hz (A4)
const fundamentalAmplitude = 0.5;

// Set the frequency and amplitude for the four partials above the fundamental
const partialFrequencies = [2, 3, 4, 5]; // Multipliers of the fundamental frequency
const partialAmplitudes = [0.2, 0.15, 0.1, 0.05]; // Amplitudes for each partial

// Set the frequency of the oscillator to the fundamental frequency
oscillator.frequency.setValueAtTime(fundamentalFrequency, audioContext.currentTime);

// Set the initial amplitude of the oscillator
gainNode.gain.setValueAtTime(fundamentalAmplitude, audioContext.currentTime);

// Start the oscillator
oscillator.start();

// Function to update the partials
function updatePartials() {
	// Calculate the sum of all partials
	let partialSum = fundamentalAmplitude;

	// Iterate over each partial
	for (let i = 0; i < partialFrequencies.length; i++) {
		// Calculate the frequency of the current partial
		const frequency = fundamentalFrequency * partialFrequencies[i];

		// Calculate the amplitude of the current partial
		const amplitude = partialAmplitudes[i];

		// Add the current partial to the sum
		partialSum += amplitude;

		// Set the frequency and amplitude of the current partial
		oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
		gainNode.gain.setValueAtTime(partialSum, audioContext.currentTime);
	}
}

// Call the updatePartials function periodically to update the partials
setInterval(updatePartials, 1000); // Update every second
