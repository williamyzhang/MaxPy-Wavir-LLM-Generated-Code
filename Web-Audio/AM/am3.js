// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create carrier oscillator - the sine wave
const carrier = audioContext.createOscillator();
carrier.frequency.value = 440; // A4, adjust as needed
carrier.type = 'sine';

// Create modulator oscillator
const modulator = audioContext.createOscillator();
modulator.frequency.value = 5; // Modulation frequency in Hz, adjust as needed
modulator.type = 'sine';

// Create gain node for modulator to control the amplitude
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 0.5; // Initial amplitude of the modulator, adjust for depth of modulation

// Connect the modulator to the modulator gain node
modulator.connect(modulatorgain);

// Modulate the amplitude of the carrier by connecting the modulatorGain node to the gain 
// parameter of the carrier. This is done indirectly through connecting to a gain node's gain parameter.
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the destination (speakers) and start oscillators
carrier.connect(audioContext.destination);
carrier.start();
modulator.start();

// Optionally, stop the oscillators after some time
setTimeout(() => {
    carrier.stop();
    modulator.stop();
}, 10000); // Stops after 10 seconds
