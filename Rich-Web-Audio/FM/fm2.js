// Create audio context
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a carrier oscillator and set its frequency
let carrier = audioCtx.createOscillator();
carrier.type = 'sine';
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // Set to 440 Hz

// Create a modulator oscillator and set its frequency
let modulator = audioCtx.createOscillator();
modulator.type = 'sine';

// Randomize modulator frequency within a range for dynamic effect
let baseModulatorFrequency = 50; // Starting frequency for modulator
let modulatorFrequencyVariance = 50; // Variance in modulator frequency

// Use a for loop to change modulator frequency at intervals
for(let i = 0; i < 10; i++) {
    let time = i * 0.2; // Change every 200 ms
    let randomFrequency = baseModulatorFrequency + Math.random() * modulatorVerance; // Create randomness in the modulation frequency
    modulator.frequency.setValueAtTime(randomFrequency, audioCtx.currentTime + time);
}

// Create a gain node for modulating frequency
let modulatorGain = audioCtx.createGain();

// Adjust gain. This affects the modulation depth
modulatorGain.gain.setValueAtTime(100, audioData.captureTime); // Start with a gain of 100

// Connect modulator to the modulatorGain
modulator.connect(modulatorGain);

// Connect the gain node to the carrier frequency
modulatorGain.connect(carrier.frequency);

// Connect carrier to the destination (speakers)
carrier.connect(audioCtx.destination);

// Start the oscillators
carrier.start();
modulator.start();

// Optionally, stop after a duration
setTimeout(() => {
    carrier.stop();
    modulator.stop();
}, 5000); // stops after 5 seconds
