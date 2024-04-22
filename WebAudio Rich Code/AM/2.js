// Create an audio context
const audioCtx = new AudioContext();

// Create a carrier oscillator
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // Carrier frequency in Hz (A4 pitch)

// Create a modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 10; // Modulation frequency in Hz

// Create a gain node for modulating amplitude
const modulatorGain = audioCtx.createGain();
modulatorGain.gain.value = 0.5; // Modulation depth

// Connect the modulator to the gain node
modulator.connect(modulatorGain);

// Modulate the carrier's amplitude
modulatorGain.connect(carrier.frequency); // Modulating the frequency

// Connect the carrier to the output (speakers)
carrier.connect(audioCtx.destination);

// Start the oscillators
modulator.start();
carrier.start();

// Stop the oscillators after 5 seconds
setTimeout(() => {
	modulator.stop();
	carrier.stop();
	modulator.disconnect();
	carrier.disconnect();
}, 5000);

