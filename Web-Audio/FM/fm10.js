// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create carrier oscillator - this will produce the audible sound
const carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Carrier wave type
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 pitch

// Create modulator oscillator - this will modulate the frequency of the carrier
const modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator wave type
modulator.frequency.setValueAtTime(440, audioCtx.currentTime); // Frequency of the modulation

// Create a gain node for the modulator to control the depth of the modulation
const modulationIndex = audioCtx.createGain();
modulationIndex.gain.setValueAtTime(100, audioCtx.currentTime); // Depth of the modulation

// Connect the modulator to the modulationIndex gain node
modulator.connect(modulationIndex);

// Connect the modulationIndex to the frequency parameter of the carrier oscillator
modulationIndex.connect(carrier.frequency);

// Connect the carrier to the destination (speakers/headphones)
carrier.connect(audioCtx.destination);

// Start the oscillators
carrier.start();
modulator.start();

// Stop the oscillators after some time (e.g., after 2 seconds)
setTimeout(() => {
  carrier.stop();
  modulator.stop();
}, 2000);
