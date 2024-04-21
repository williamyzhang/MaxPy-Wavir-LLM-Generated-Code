// Setup the audio context
const audioCtx = new AudioContext();

// Create carrier oscillator
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';  // Carrier waveform type
carrier.frequency.setValueAtTime(440, audioCtx.currentTime);  // A4 note

// Create modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine';  // Modulator waveform type
modulator.frequency.setValueAtTime(50, audioCtx.currentTime);  // Modulation frequency

// Create gain node for modulation depth
const modDepth = audioCtx.createGain();
modDepth.gain.setValueAtTime(100, audioCtx.currentTime);  // Modulation depth

// Connect modulator to modDepth, and then modDepth to carrier frequency
modulator.connect(modDepth);
modDepth.connect(carrier.frequency);

// Connect carrier to output
carrier.connect(audioCtx.destination);

// Start oscillators
modulator.start();
carrier.start();

// Use a for loop and Math.random() to change modulator settings every 500ms
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		const newFreq = Math.random() * 100 + 20;  // Random frequency between 20 and 120 Hz
		const newDepth = Math.random() * 200;  // Random depth up to 200
		modulator.frequency.setValueAtTime(newFreq, audioCtx.currentTime);
		modDepth.gain.setValueAtTime(newDepth, audioCtx.currentTime);
		console.log(`Modulation frequency: ${newFreq}, Depth: ${newDepth}`);
	}, i * 500);
}

// Optionally stop oscillators after 5 seconds
setTimeout(() => {
	modulator.stop();
	carrier.stop();
	console.log('Oscillators stopped');
}, 5000);
