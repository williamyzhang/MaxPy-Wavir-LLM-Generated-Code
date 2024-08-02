// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a carrier oscillator (this is the sine wave we'll be hearing)
const carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Carrier wave type
carrier.frequency.value = 440; // Frequency in Hertz (A note)

// Create a modulator oscillator (this will modulate the frequency of the carrier)
const modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator wave type
modulator.frequency.value = 10; // Frequency in Hertz (how fast the modulation occurs)

// Create a gain node (to control the amplitude of the modulation)
const modulatorGain = audioCtx.createGain();
modulatorGain.gain.value = 50; // The amount of frequency modulation applied

// Connect the modulator to the gain node
modulator.connect(modulatorGain);

// Connect the modulator gain node to the frequency parameter of the carrier oscillator
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the destination (speakers)
carrier.connect(audioCtx.destination);

// Start the oscillators
carrier.start();
modulator.start();

// Optionally stop the oscillators after a duration
setTimeout(() => {
    carrier.stop();
    modulator.stop();
    // You may need to handle cleanup of the audio context here depending on your use case
}, 5000); // Stops after 5 seconds
