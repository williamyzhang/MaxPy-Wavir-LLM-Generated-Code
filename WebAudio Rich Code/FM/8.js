// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a carrier oscillator
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // Set to A4 note

// Create a modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine';

// Randomize modulator frequency and depth using a for loop and Math.random()
for (let i = 0; i < 10; i++) {
	const randomFreq = Math.random() * 20 + 5; // Random frequency between 5 and 25 Hz
	const randomDepth = Math.random() * 100 + 50; // Random depth between 50 and 150

	modulator.frequency.setValueAtTime(randomFreq, audioCtx.currentTime + i * 0.1);
	const modulationIndex = audioCtx.createGain();
	modulationIndex.gain.setValueAtTime(randomDepth, audioCtx.currentTime + i * 0.1);

	// Connect modulator to modulation index
	modulator.connect(modulationIndex);

	// Modulation index adjusts carrier frequency
	modulationIndex.connect(carrier.frequency);
}

// Start oscillators
modulator.start();
carrier.start();

// Connect carrier to output
carrier.connect(audioCtx.destination);

// Optionally stop after some time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	carrier.disconnect();
	modulator.disconnect();
}, 5000); // stops after 5 seconds
