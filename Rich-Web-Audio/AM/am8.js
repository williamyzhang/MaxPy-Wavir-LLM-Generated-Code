// Create an AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Carrier oscillator - Sine wave
const carrierOsc = audioCtx.createOscillator();
carrierOsc.type = 'sine';
carrierOsc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Modulator oscillator - Sine wave, with random frequency
const modulatorOsc = audioCtx.createOscillator();
modulatorOsc.type = 'sine';
// Use Math.random() to get a random frequency in a range, e.g., 1 to 20 Hz
modulatorOsc.frequency.setValueAtTime(1 + Math.random() * 19, audioCtx.currentTime);

// Gain node for modulating amplitude
const modulatorGain = audioCtx.createGain();
// Adjust gain, 0.5 to reduce effect intensity; change as needed
modulatorGain.gain.setValueAtTime(0.5, audioCtx.currentTime);

// Connecting nodes
// Connect the modulator oscillator to the modulator gain
modulatorOsc.connect(modulatorGain);

// Then connect the modulator gain to the carrier oscillator's gain.audioParam
modulatorGain.connect(carrierOsc.frequency);

// Connect the carrier oscillator to the destination (speakers)
carrierOsc.connect(audioCtx.destination);

// Start the oscillators
carrierOsc.start();
modulatorOsc.start();

// Optionally stop the oscillators after a duration
setTimeout(() => {
    carrierOsc.stop();
    modulatorOsc.stop();
    // Disconnect nodes to clean up
    carrierOsc.disconnect();
    modulatorOsc.disconnect();
    modulatorGain.disconnect();
}, 5000); // Stops after 5 seconds
