// Step 1: Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create oscillators
const carrierOscillator = audioCtx.createOscillator();
carrierOscillator.type = 'sine';
carrierOscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Carrier frequency at 440 Hz (A4)

const modulatorOscillator = audioCtx.createOscillator();
modulatorOscillator.type = 'sine';
modulatorOscillator.frequency.setValueAtTime(10, audioCtx.currentTime); // Modulation frequency, for example, at 10 Hz

// Step 3: Create gain node for amplitude modulation
const modulationGain = audioCtx.createGain();
modulationGain.gain.setValueAtTime(1, audioCtx.currentTime); // Initial gain value

// Connect the modulator to the gain node, adjusting its amplitude.
// modulationGain.gain is the AudioParam we want to modulate.
modulatorOscillator.connect(modulationGain.gain);

// Step 4: Connect everything together
carrierOscillator.connect(modulationGain); // Connect carrier oscillator through the gain node
modulationGain.connect(audioCtx.destination); // Connect gain node to the audio context's destination

// Start oscillators
carrierOscillator.start();
modulatorOscillator.start();

// Optionally, stop oscillators after a certain time
setTimeout(() => {
    carrierOscillator.stop();
    modulatorOscillator.stop();
}, 5000); // Stops both oscillators after 5 seconds
