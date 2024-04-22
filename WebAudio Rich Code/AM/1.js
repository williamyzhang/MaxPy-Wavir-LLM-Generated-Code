// Create an audio context
const audioContext = new AudioContext();

// Carrier oscillator - This is the main sound wave
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Sine wave
carrier.frequency.value = 440; // Frequency in Hz (A4 note)

// Modulator oscillator - This will modulate the amplitude of the carrier
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Sine wave for modulating
modulator.frequency.value = 10; // Frequency of modulation in Hz

// Gain node to control the modulation depth
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 0.5; // Modulation depth

// Connect modulator to modulatorGain
modulator.connect(modulatorGain);

// The modulatorGain output needs to adjust the gain of another gain node that the carrier is connected through
const carrierGain = audioContext.createGain();
carrierGain.gain.value = 1; // Start with a base gain of 1

// Connect the modulatorGain to influence the amplitude of the carrierGain
modulatorGain.connect(carrierGain.gain);

// Connect the carrier through the carrierGain to the audio context's destination
carrier.connect(carrierGain);
carrierGain.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Optionally stop oscillators after some time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	audioContext.close(); // Clean up the audio context
}, 5000); // Stops after 5 seconds
