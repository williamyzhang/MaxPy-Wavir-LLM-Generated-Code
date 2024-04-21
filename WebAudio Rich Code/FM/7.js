// Create audio context
const audioContext = new AudioContext();

// Create carrier oscillator - This is the primary sound source
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Carrier wave type
carrier.frequency.value = 440; // Frequency in Hz (A4 note)

// Create modulator oscillator - This modulates the carrier's frequency
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Modulator wave type
modulator.frequency.value = 50; // Frequency of modulation in Hz

// Create gain node for the modulator to control modulation depth
const modulationGain = audioContext.createGain();
modulationGain.gain.value = 100; // Modulation depth

// Connect modulator to modulation gain
modulator.connect(modulationGain);

// Connect modulation gain to the frequency parameter of the carrier oscillator
modulationGain.connect(carrier.frequency);

// Connect carrier to the destination (speakers)
carrier.connect(audioContext.destination);

// Start oscillators
modulator.start();
carrier.start();

// Use for loops and Math.random() to change modulator parameters over time
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		// Randomly change the modulator frequency and gain
		modulator.frequency.value = Math.random() * 100 + 20; // Random frequency between 20 Hz and 120 Hz
		modulationGain.gain.value = Math.random() * 200; // Random modulation depth between 0 and 200
		console.log(`Modulator frequency: ${modulator.frequency.value}, Modulation depth: ${modulationGain.gain.value}`);
	}, i * 1000); // Changes every second
}

// Optionally, stop oscillators after some time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	console.log('Stopped oscillators');
}, 11000); // Stop after 11 seconds
