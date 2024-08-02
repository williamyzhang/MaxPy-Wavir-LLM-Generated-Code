// Step 1: Create an audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create the carrier oscillator (sine wave)
var carrier = audioCtx.createOscillator();
carrier.frequency.value = 440; // Carrier frequency in Hz (A4 note)
carrier.type = 'sine';

// Step 3: Create the modulator oscillator
var modulator = audioCtx.createOscillator();
modulator.frequency.value = 10; // Modulation frequency in Hz
modulator.type = 'sine';

// Step 4: Create a gain node for modulator to control the amplitude
var modulatorGain = audioCtx.createGain();
modulatorGain.gain.value = 0.5; // Initial modulation depth

// Step 5: Connect the modulator to the modulatorGain
modulator.connect(modulatorGain);

// Step 6: Connect the modulatorGain to the carrier frequency
// This will modulate the amplitude of the carrier
modulatorGain.connect(carrier.frequency);

// Step 7: Connect the carrier to the destination (speakers)
carrier.connect(audioCtx.destination);

// Step 8: Start the oscillators
carrier.start();
modulator.start();

// Optional: To stop the oscillators after a certain time
// carrier.stop(audioCtx.currentTime + 2); // stops after 2 seconds
// modulator.stop(audioCtx.currentTime + 2); // stops after 2 seconds
