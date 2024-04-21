// Initialize the AudioContext
const audioContext = new AudioContext();

// Base frequency of the fundamental tone
const baseFrequency = 440; // A4 note, commonly used as a reference pitch

// Create a gain node for controlling overall volume
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.5; // Reduce volume to avoid distortion
masterGain.connect(audioContext.destination);

// Number of partials including the fundamental
const numberOfPartials = 5; // Fundamental + 4 partials

// Create and configure oscillators for the fundamental and partials
for (let i = 1; i <= numberOfPartials; i++) {
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine';
	oscillator.frequency.value = baseFrequency * i; // Multiply base frequency by i for harmonics

	// Create a gain node for this oscillator to control its amplitude
	const gain = audioContext.createGain();
	gain.gain.value = 1 / i; // Decrease amplitude of each partial inversely with its order

	// Connect this oscillator to its gain node, and then to the master gain node
	oscillator.connect(gain);
	gain.connect(masterGain);

	// Start the oscillator
	oscillator.start();

	// Optionally, you can stop oscillators after a certain time
	// oscillator.stop(audioContext.currentTime + 2); // stops after 2 seconds
}

// Note: You may want to add controls to start and stop the sound for better interaction.
