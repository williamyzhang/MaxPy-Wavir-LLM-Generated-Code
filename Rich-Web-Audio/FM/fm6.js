// Create audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create carrier oscillator
var carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Sine wave as the carrier
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Create modulator oscillator
var modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Sine wave as the modulator

// Randomize the modulator frequency slightly each time
var baseModFrequency = 50; // Base frequency for modulator
for(let i = 0; i < 5; i++) {
    let randomFrequency = baseModFrequency + Math.random() * 10; // Add up to 10Hz randomly
    modulator.frequency.setValueAtTime(randomFrequency, audioCtx.currentTime + i * 0.2); // Change every 0.2 seconds
}

// Create gain node for modulation depth
var modIndex = audioCtx.createGain();
modIndex.gain.setValueAtTime(100, audioCtx.currentTime); // Modulation Index

// Connect the modulator to modIndex's gain
modulator.connect(modIndex.gain);

// Connect modIndex output to carrier frequency
modIndex.connect(carrier.frequency);

// Connect the carrier to the destination
carrier.connect(audioCtx.destination);

// Start oscillators
modulator.start();
carrier.start();

// Stop oscillators after 5 seconds
setTimeout(() => {
    modulator.stop();
    carrier.stop();
}, 5000);
