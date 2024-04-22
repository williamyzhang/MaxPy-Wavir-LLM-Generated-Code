// Create an AudioContext instance
const audioContext = new AudioContext();

// Create a carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // Set frequency to 440 Hz (A note)

// Create a modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 5; // Low frequency for audible amplitude modulation effect

// Create a gain node to control the amplitude of the carrier
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 0.5; // Initial gain setting for modulation depth

// Connect modulator to the gain node's gain parameter
modulator.connect(modulatorGain.gain);

// Connect the carrier through the gain node to the audio context's destination
carrier.connect(modulatorGain);
modulatorGain.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Optional: Change modulation depth or frequency randomly using a loop and Math.random()
setInterval(() => {
	// Randomly change modulation frequency between 0.1 Hz and 10 Hz
	modulator.frequency.value = Math.random() * 9.9 + 0.1;

	// Randomly change modulation depth between 0.1 and 1
	modulatorGain.gain.value = Math.random() * 0.9 + 0.1;
}, 2000); // Change every 2000 milliseconds (2 seconds)
