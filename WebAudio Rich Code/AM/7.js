// Step 1: Create the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create two oscillators
const carrier = audioContext.createOscillator();
const modulator = audioContext.createOscillator();

// Step 3: Create a gain node for modulating the amplitude
const modulatorGain = audioContext.createGain();

// Configure the carrier oscillator
carrier.type = 'sine'; // Sine wave — other types you could try include "square", "sawtooth", "triangle"
carrier.frequency.value = 440; // Frequency in hertz (A4 pitch)

// Configure the modulator oscillator
modulator.type = 'sine';
modulator.frequency.value = 10 + Math.random() * 10; // Low frequency sine wave, plus some randomness

// Configure the gain node
modulatorGain.gain.value = 0.5; // Initial amplitude for the modulator

// Step 4: Connect everything
modulator.connect(modulatorGain);
modulatorGain.connect(carrier.frequency); // Modulator modulates the frequency of the carrier
carrier.connect(audioContext.destination);

// Optional: Randomize modulator gain using a for loop for subtle changes over time
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		modulatorGain.gain.value = Math.random(); // Random modulation depth
	}, i * 1000); // Change every second
}

// Step 5: Start oscillators
carrier.start();
modulator.start();

// Optionally stop after a duration
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	audioContext.close();
}, 10000); // Stops after 10 seconds
