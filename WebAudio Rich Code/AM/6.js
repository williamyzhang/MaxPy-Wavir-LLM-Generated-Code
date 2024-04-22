// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create the carrier oscillator
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // 440 Hz, standard tuning A

// Create the modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine';
modulator.frequency.setValueAtTime(10, audioCtx.currentTime); // 10 Hz, low frequency for modulation

// Create gain node for modulation effect
const modulatorGain = audioCtx.createGain();
// Initial modulator gain is set randomly
modulatorGain.gain.setValueAtTime(Math.random(), audioCtx.currentTime);

// Connect the modulator to the modulatorGain
modulator.connect(modulatorGain);

// Modulate the amplitude of the carrier by connecting modulatorGain to the carrier's gain node
modulatorGain.connect(carrier.frequency);

// Create the carrier's gain node to control its output level
const carrierGain = audioCtx.createGain();
carrierGain.gain.setValueAtTime(0.5, audioCtx.currentTime); // Set gain to avoid clipping

// Connect the carrier to the carrierGain
carrier.connect(carrierGain);

// Connect the carrierGain to the audio context destination
carrierGain.connect(audioCtx.destination);

// Start the oscillators
carrier.start();
modulator.start();

// Randomly change the modulator gain every second using a loop
setInterval(() => {
	const newGain = Math.random();
	console.log(`Modulator Gain updated to: ${newGain}`);
	modulatorGain.gain.setValueAtTime(newGain, audioCtx.currentTime);
}, 1000);

// Optionally stop oscillators after some time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	console.log('Oscillators stopped');
}, 10000); // stops after 10 seconds
