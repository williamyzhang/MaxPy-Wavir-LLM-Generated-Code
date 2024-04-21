// Create an audio context
const audioCtx = new AudioContext();

// Define carrier and modulator frequencies
const carrierFreq = 440; // A4 note, standard pitch (440 Hz)
const modulatorFreq = 50; // Frequency of the modulating wave

// Create carrier oscillator (this produces the actual sound)
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';
carrier.frequency.setValueAtTime(carrierFreq, audioCtx.currentTime);

// Create modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine';
modulator.frequency.setValueAtTime(modulatorFreq, audioCtx.currentTime);

// Create gain node for the modulation depth
const modDepth = audioCtx.createGain();
modDepth.gain.setValueAtTime(100, audioCtx.currentTime); // Modulation depth in Hz

// Connect modulator to modDepth
modulator.connect(modDepth);

// Connect modDepth to the frequency parameter of the carrier oscillator
modDepth.connect(carrier.frequency);

// Connect carrier to the context's destination (speakers)
carrier.connect(audioCtx.destination);

// Start oscillators
modulator.start();
carrier.start();

// Randomize parameters using for loops and Math.random()
for (let i = 0; i < 5; i++) {
	let randomFreq = Math.random() * 100 + 20; // Random frequency between 20 and 120 Hz
	setTimeout(() => {
		modulator.frequency.setValueAtTime(randomFreq, audioCtx.currentTime);
		console.log(`Modulator frequency changed to ${randomFreq} Hz`);
	}, i * 1000); // Change frequency every 1 second
}

// Optionally stop oscillators after some time
setTimeout(() => {
	modulator.stop();
	carrier.stop();
	console.log('Oscillators stopped');
}, 6000); // Stop after 6 seconds
