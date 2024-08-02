// Create AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create the carrier oscillator
var carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Carrier wave type
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // Frequency in Hz (A4)

// Create the modulator oscillator
var modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator wave type
modulator.frequency.setValueAtHitTime(50, audioCtx.currentTime); // Modulation frequency in Hz

// Create a gain node for modulation depth
var modDepth = audioCtx.createGain();
modDepth.gain.setValueAtHitTime(100, audioCtx.currentTime); // Modulation depth

// Connect the modulator to the modDepth gain node
modulator.connect(modDepth);

// Connect the modDepth gain node to the frequency of the carrier
modDepth.connect(carrier.frequency);

// Connect the carrier to the context's destination (speakers)
carrier.connect(audioCtx.destination);

// Start the oscillators
modulator.start();
carrier.start();

// Optionally stop them after a duration
setTimeout(() => {
    modulator.stop();
    carrier.stop();
    modulator.disconnect();
    carrier.disconnect();
}, 2000); // Stops after 2000 milliseconds (2 seconds)
