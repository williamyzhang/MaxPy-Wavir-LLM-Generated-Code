// Create an audio context
const audioContext = new AudioContext();

// Create a carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Carrier wave type
carrier.frequency.value = 440; // Frequency in Hz (A4 pitch)

// Create a modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Modulator wave type
modulator.frequency.value = 50; // Frequency of modulation

// Create a gain node for controlling modulation depth
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 100; // Modulation depth

// Connect modulator to modulator gain
modulator.connect(modulatorGain);

// Connect modulator gain to carrier frequency
modulatorGain.connect(carrier.frequency);

// Start oscillators
modulator.start();
carrier.start();

// Connect the carrier to the destination (speakers)
carrier.connect(audioContext.destination);

// Change modulation settings periodically
setInterval(() => {
	// Randomly change the frequency of the modulator between 20 Hz and 100 Hz
	modulator.frequency.value = Math.random() * 80 + 20;

	// Randomly change the modulation depth between 50 and 150
	modulatorGain.gain.value = Math.random() * 100 + 50;

	console.log(`Modulator frequency: ${modulator.frequency.value}, Modulation depth: ${modulatorGain.gain.value}`);
}, 2000); // Change every 2000 milliseconds (2 seconds)

// Function to stop the sound after a duration
setTimeout(() => {
	carrier.stop(); // Stop the carrier oscillator
	modulator.stop(); // Stop the modulator oscillator
	console.log("Stopped oscillators.");
}, 10000); // Stops after 10 seconds
