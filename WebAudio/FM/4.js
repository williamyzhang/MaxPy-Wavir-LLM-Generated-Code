// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator nodes
const carrierOscillator = audioCtx.createOscillator();
const modulatorOscillator = audioCtx.createOscillator();

// Set initial frequencies
const carrierFrequency = 440; // Hz
const modulatorFrequency = 20; // Hz

// Set modulation depth (how much the frequency of the carrier will change)
const modulationDepth = 100;

// Connect modulator to the frequency of the carrier
modulatorOscillator.connect(carrierOscillator.frequency);

// Set types for both oscillators
carrierOscillator.type = 'sine';
modulatorOscillator.type = 'sine';

// Set frequencies
carrierOscillator.frequency.setValueAtTime(carrierFrequency, audioCtx.currentTime);
modulatorOscillator.frequency.setValueAtTime(modulatorFrequency, audioCtx.currentTime);

// Set modulation depth
modulatorOscillator.frequency.value = modulationDepth;

// Connect the carrier oscillator to the output
carrierOscillator.connect(audioCtx.destination);

// Start both oscillators
carrierOscillator.start();
modulatorOscillator.start();

// Stop after a while
setTimeout(() => {
	carrierOscillator.stop();
	modulatorOscillator.stop();
}, 5000); // Stop after 5 seconds