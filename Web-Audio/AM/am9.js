// Create a new audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create carrier oscillator (sine wave)
const carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Set oscillator type to 'sine'
carrier.frequency.value = 440; // Set frequency to 440Hz (A4 pitch)

// Create modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator will also be a sine wave for this example
modulator.frequency.value = 10; // Low frequency for the modulator (e.g., 10Hz)

// Create a gain node for the modulator to control the amplitude of the carrier
const modulatorGain = audioCtrl.createGain();
modulatorGain.gain.value = 0.5; // Set gain value (modulation depth)

// Connect modulator to the gain node
modulator.connect(modulatorGain);

// Connect the modulator gain node to the gain parameter of the carrier
modulatorGain.connect(carrier.frequency);

// Finally, connect the carrier to the audio context's destination
carrier.connect(audioCtx.destination);

// Start both oscillators
carrier.start();
modulator.start();
