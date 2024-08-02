// Step 1: Create the AudioContext
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create the carrier and modulator oscillators
var carrier = audioContext.createOscillator();
var modulator = audioContext.createOscillator();

// Step 3: Configure the carrier to produce a sine wave
carrier.type = 'sine';
carrier.frequency.value = 440; // A4 note, for instance

// Step 4: Configure the modulator, typically at a lower frequency for AM
modulator.frequency.value = 5; // Low frequency for modulation effect

// Step 5: Create a GainNode for the modulator
var modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 0.5; // Scale the modulation index

// Step 6: Route the modulator through the GainNode to the carrier's frequency
modulator.connect(modulatorGain);
modulatorGain.connect(carrier.frequency);

// Additional GainNode for controlling the carrier's amplitude
var carrierGain = audioContext.createGain();
carrierGain.gain.value = 1; // Set initial amplitude

// Connect the carrier to the carrierGain and the destination
carrier.connect(carrierGain);
carrierGain.connect(audioContext.destination);

// Start the oscillators
carrier.start();
modulator.start();

// Optionally, stop the oscillators after a certain period
setTimeout(function() {
    carrier.stop();
    modulator.stop();

    // Disconnect after stopping
    carrier.disconnect();
    modulator.disconnect();
    modulatorGain.disconnect();
    carrierGain.disconnect();
}, 5000); // Stops after 5 seconds
