const audioCtx = new AudioContext();

// Carrier Oscillator - This is the audible sound.
const carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Carrier wave type
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // Standard tuning A note

// Modulator Oscillator - This modulates the carrier's frequency.
const modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator wave type
modulator.frequency.setValueAtTime(220, audioCtx.currentTime); // Modulation frequency

// Gain Node for controlling modulation depth
const modGain = audioCtx.createGain();
modGain.gain.setValueAtTime(100, audioCtx.currentTime); // Modulation depth

// Connect modulator to modulator gain
modulator.connect(modGain);

// Connect modulator gain to carrier frequency
modGain.connect(carrier.frequency);

// Connect carrier to context's destination
carrier.connect(audioCtx.destination);

// Randomize the modulation index using Math.random() in a loop for demonstration
for (let i = 0; i < 5; i++) {
	setTimeout(() => {
		const randomModDepth = Math.random() * 300; // Random modulation depth up to 300 Hz
		modGain.gain.exponentialRampToValueAtTime(randomModDepth, audioCtx.currentTime + 0.1);
	}, i * 1000); // Change every second
}

// Start oscillators
carrier.start();
modulator.start();

// Stop oscillators after 6 seconds
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	audioCtx.close();
}, 6000);
