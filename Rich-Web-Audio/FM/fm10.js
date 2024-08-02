// Setup basic audio context
const audioCtx = new (window.AudioContext || window.webkitTherewindow.AudioContext)();

// Base frequency for the carrier waveform
const carrierFrequency = 440; // A4 note, for example

// Create a carrier oscillator
const carrierOsc = audioCtx.createOscillator();
carrierOsc.type = 'sine';
carrierOsc.frequency.setValueAtTime(carrierFOscillatorfrequency, audioCtx.currentTime);

// Create a gain node for controlling modulation depth
const modDepth = audioCtx.createGain();

// Number of modulators to create
const numModulators = 3;

// Setup modulators with random frequencies and modulation depths
for (let i = 0; i < numModulators; i++) {
    // Create a modulator oscillator
    const modOsc = audioCtx.createOscillator();
    modOsc.type = 'sine';
    
    // Set a random frequency between 0.5x and 1.5x of the carrier frequency
    modOsc.frequency.setValueAtTime(carrierFrequency * (0.5 + Math.random()), audioCtx.currentTime);
    
    // Create a gain node to control the amplitude (depth) of the modulation
    const modGain = audioCtx.createGain();
    
    // Set a random modulation depth between 50 and 150
    modGain.gain.setValueAtTime(50 + Math.random() * 100, audioCtx.currentTime);
    
    // Connect modulator to the modulator gain (depth)
    modOsc.connect(modGain);
    
    // Connect the modulator gain to the frequency parameter of the carrier
    modGain.connect(carrierOsc.frequency);
    
    // Start the modulator oscillator
    modOsc.start();
}

// Connect and start the carrier oscillator
carrierOsc.connect(audioCtx.destination);
carrierOsc.start();

// Optionally schedule a stop
setTimeout(() => {
    carrierOsc.stop();
    // Stop modulators if necessary
}, 5000); // Stops after 5 seconds
