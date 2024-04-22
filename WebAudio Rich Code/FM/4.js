// Create a new audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a carrier oscillator (this will produce the audible sound)
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';  // Carrier wave type
carrier.frequency.value = 440;  // Frequency in Hz (A4 note)

// Create a modulator oscillator (this will modulate the frequency of the carrier)
const modulator = audioCtx.createOscillator();
modulator.type = 'sine';  // Modulator wave type
modulator.frequency.value = 5;  // Frequency in Hz

// Create a gain node for the modulation index
const modulationIndex = audioCtx.createGain();
modulationIndex.gain.value = 100;  // Modulation depth

// Connect modulator to modulation index gain
modulator.connect(modulationIndex);

// Connect modulation index gain to the frequency of the carrier
modulationIndex.connect(carrier.frequency);

// Start the oscillators
modulator.start();
carrier.start();

// Connect the carrier to the output (speakers)
carrier.connect(audioCtx.destination);

// Change modulator frequency over time using a loop
setInterval(() => {
	// Randomly set modulator frequency between 5 Hz and 10 Hz
	modulator.frequency.value = 5 + Math.random() * 5;
}, 1000);  // Change frequency every 1000 milliseconds (1 second)
