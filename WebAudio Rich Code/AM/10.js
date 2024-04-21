// Create a new audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a carrier oscillator
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';  // Carrier wave is a sine wave
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // Frequency in Hz (A4 pitch)

// Create a modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator wave is also a sine wave
modulator.frequency.setValueAtTime(10, audioCtx.currentTime); // Low frequency for clear AM effect

// Create a gain node for modulating amplitude
const modulatorGain = audioCtx.createGain();
modulatorGain.gain.setValueAtTime(1, audioCtx.currentTime); // Initial modulation depth

// Connect modulator to modulator gain
modulator.connect(modulatorGain);

// Modulate the carrier's amplitude with the modulator gain
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the audio context's destination
carrier.connect(audioCtx.destination);

// Start the oscillators
carrier.start();
modulator.start();

// Change modulation frequency over time using a for loop and Math.random()
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		const newFreq = 5 + Math.random() * 10; // Random frequency between 5 and 15 Hz
		modulator.frequency.setValueAtTime(newFreq, audioCtx.currentTime);
		console.log('Modulation frequency changed to: ' + newFreq + ' Hz');
	}, i * 1000); // Change frequency every second
}

// Optionally stop oscillators after a while
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	console.log('Oscillators stopped.');
}, 11000); // Stop after 11 seconds
