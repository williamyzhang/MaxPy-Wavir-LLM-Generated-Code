// Create audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create the carrier oscillator
var carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Carrier waveform type
carrier.frequency.setValueAtTime(220, audioCtx.currentTime); // Set carrier frequency (A3)
carrier.start();

// Create the modulator oscillator
var modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator waveform type
modulator.frequency.setValueAtTime(Math.random() * 1000 + 50, audioCtx.currentTime); // Random modulator frequency between 50Hz and 1050Hz

// Create a gain node for the modulator to control modulation depth (modulation index)
var modulatorGain = audioCtx.createGain();
modulatorGain.gain.setValueAtTime(Math.random() * 100, audioCtx.currentTime); // Random modulation depth

// Connect the modulator to its gain node
modulator.connect(modulatorGain);

// Connect the modulator gain node to the frequency parameter of the carrier oscillator
modulatorGain.connect(carrier.frequency);

// Start the modulator
modulator.start();

// Connect the carrier to the destination (speakers)
carrier.connect(audioCtx.destination);

// Optionally, implement a for loop to create multiple carriers and modulators for more complex FM synthesis
for (let i = 0; i < 5; i++) { // Example: creating 5 additional carrier-modulator pairs
    let newCarrier = audioCtx.createOscillator();
    newCarrier.type = 'sine';
    newCarrier.frequency.setValueAtTime(220 * (i + 1), audioCtx.currentTime); // Different base frequencies for each carrier
    newCarrier.start();

    let newModulator = audioCtx.createOscillator();
    newModulator.type = 'sine';
    newModulator.frequency.setValueAtTime(Math.random() * 500 + 50, audioCtx.currentTime); // Random frequency for each modulator

    let newModulatorGain = audioCtx.createGain();
    newModulatorGain.gain.setValueAtTime(Math.random() * 100, audioCtx.currentTime); // Random modulation depth for each modulator

    newModulator.connect(newModulatorGain);
    newModulatorGain.connect(newCarrier.frequency);
    newModulator.start();

    newCarrier.connect(audioCtx.destination);
}
