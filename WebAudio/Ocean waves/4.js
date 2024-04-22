// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a GainNode to control the overall volume
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5; // Adjust the volume here (0 to 1)

// Connect the GainNode to the AudioContext destination (i.e., speakers)
gainNode.connect(audioContext.destination);

// Function to generate the wave sound
function generateWaveSound() {
	// Create an OscillatorNode to generate the sine wave
	const oscillator = audioContext.createOscillator();

	// Set the oscillator type to sine wave
	oscillator.type = 'sine';

	// Set initial frequency and amplitude
	let baseFrequency = 100; // Adjust the base frequency of the wave
	let amplitude = 0.5; // Adjust the amplitude of the wave

	// Set up a modulation function to create variation in frequency and amplitude
	oscillator.onended = generateWaveSound; // Schedule the next wave

	oscillator.frequency.setValueAtTime(baseFrequency, audioContext.currentTime);
	oscillator.frequency.exponentialRampToValueAtTime(baseFrequency * 1.5, audioContext.currentTime + 2); // Adjust the rate of frequency change

	oscillator.connect(gainNode); // Connect the oscillator to the GainNode

	// Start the oscillator
	oscillator.start();

	// Ramp down the amplitude to create a fade-out effect
	gainNode.gain.setValueAtTime(amplitude, audioContext.currentTime);
	gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2); // Adjust the duration of the fade-out
	// Stop the oscillator after the fade-out
	oscillator.stop(audioContext.currentTime + 2);
}

// Start generating the wave sound
generateWaveSound();
