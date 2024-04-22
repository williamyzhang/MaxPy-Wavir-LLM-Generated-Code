// Create a new AudioContext
const audioContext = new AudioContext();

// Create a carrier oscillator (sine wave)
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // Frequency in Hz (A4 pitch)

// Create a modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 10; // Low frequency for noticeable modulation effect

// Create a gain node for modulation
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 0.5; // Initial modulation depth

// Connect modulator to the gain node's gain parameter
modulator.connect(modulatorGain.gain);

// Connect the carrier through the modulator's gain node
carrier.connect(modulatorGain);

// Connect the modulator gain node to the audio context's destination
modulatorGain.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Optionally, change modulation depth over time with random values
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		modulatorGain.gain.value = Math.random(); // Randomly change modulation depth
		console.log('Modulation depth changed to:', modulatorGain.gain.value);
	}, i * 1000); // Change every second
}

// Stop the oscillators after a certain time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	console.log('Oscillators stopped');
}, 10000); // Stops after 10 seconds
