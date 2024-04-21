// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and connect oscillator nodes for additive synthesis
function createAdditiveSynth(frequency, amplitudes) {
	const masterGain = audioContext.createGain();
	masterGain.gain.value = 0.5; // Adjust the master gain as needed

	// Create and connect oscillator nodes for each partial
	for (let i = 0; i < amplitudes.length; i++) {
		const partialGain = audioContext.createGain();
		partialGain.gain.value = amplitudes[i];

		const oscillator = audioContext.createOscillator();
		oscillator.type = 'sine';
		oscillator.frequency.value = frequency * (i + 1); // Increment the frequency for each partial

		oscillator.connect(partialGain);
		partialGain.connect(masterGain);

		oscillator.start();
	}

	masterGain.connect(audioContext.destination);
}

// Define the frequency and amplitudes for each partial
const baseFrequency = 440; // Base frequency for the fundamental
const amplitudes = [1, 0.7, 0.5, 0.3]; // Amplitudes for the four partials above the fundamental

// Create additive synthesis with the defined parameters
createAdditiveSynth(baseFrequency, amplitudes);
