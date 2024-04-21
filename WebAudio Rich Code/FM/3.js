// Create audio context
const audioContext = new AudioContext();

// Carrier oscillator - the primary sound frequency
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Sine wave
carrier.frequency.setValueAtTime(440, audioContext.currentTime); // A4 pitch

// Modulator oscillator - modulates the frequency of the carrier
const modulator = audioContext.createOscillator();
modulator.type = 'sine';

// Randomly set the frequency of the modulator between 20 and 100 Hz
modulator.frequency.setValueAtTime(20 + Math.random() * 80, audioContext.currentTime);

// Gain node for the modulator to control modulation depth
const modulatorGain = audioContext.createGain();

// Randomly set the modulation depth (modulation index)
modulatorGain.gain.setValueAtTime(Math.random() * 100, audioContext.currentTime); // Modulation index

// Connect modulator to the gain node
modulator.connect(modulatorGain);

// Connect the modulator gain node to the frequency of the carrier
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the destination (output)
carrier.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Stop the oscillators after 5 seconds
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	carrier.disconnect();
	modulator.disconnect();
	modulatorGain.disconnect();
}, 5000);
