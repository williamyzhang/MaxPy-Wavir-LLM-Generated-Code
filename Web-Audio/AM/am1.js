// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Set to sine wave
carrier.frequency.value = 440; // Frequency in Hz (A4 pitch)

// Create the modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Modulator as a sine wave for simplicity
modulator.frequency.value = 20; // Modulation frequency in Hz

// Create a gain node for modulation depth
const modulationDepth = audioContext.createGain();
modulationDepth.gain.value = 0.5; // Change this value for deeper/shallower modulation

// Connect the modulator to the modulationDepth's gain
modulator.connect(modulationDepth.gain);

// Connect the modulationDepth to the carrier's frequency
modulationDepth.connect(carrier.frequency);

// Connect the carrier to the destination
carrier.connect(audioContext.destination);

// Start the oscillators
modulator.start();
carrier.start();

// Optionally, stop oscillators after a duration
setTimeout(() => {
  carrier.stop();
  modulator.stop();
  carrier.disconnect();
  modulator.disconnect();
}, 5000); // stops after 5 seconds
