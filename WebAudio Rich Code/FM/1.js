// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create carrier oscillator (this will produce the sound)
const carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Carrier wave type
carrier.frequency.value = 440; // Frequency in Hz (A4 note)

// Create modulator oscillator (this will modulate the frequency of the carrier)
const modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator wave type
modulator.frequency.value = 5; // Frequency in Hz (Low frequency to modulate the carrier)

// Create gain node for the modulation index
const modIndex = audioCtx.createGain();
modIndex.gain.value = 50; // Modulation depth

// Connect modulator to modulation index gain node
modulator.connect(modIndex);

// Connect modulation index gain node to the frequency modulation of the carrier
modIndex.connect(carrier.frequency);

// Start oscillators
modulator.start();
carrier.start();

// Connect carrier to the destination (speakers)
carrier.connect(audioCtx.destination);

// Change modulation frequency and index randomly every second using a loop
setInterval(() => {
	const newModFreq = Math.random() * 10 + 5; // Random frequency between 5 and 15 Hz
	const newModDepth = Math.random() * 100; // Random modulation depth

	modulator.frequency.setValueAtTime(newModFreq, audioCtx.currentTime);
	modIndex.gain.setValueAtTime(newModDepth, audioCtx.currentTime);
	console.log(`Modulation Frequency: ${newModFreq} Hz, Modulation Depth: ${newModDepth}`);
}, 1000);

// To stop the sound after a certain time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	carrier.disconnect();
	modulator.disconnect();
}, 10000); // Stops after 10 seconds
