// Create a new audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create carrier oscillator (sine wave)
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Carrier wave type
carrier.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to A4 (440Hz)

// Create modulator oscillator (sine wave)
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Modulator wave type
modulator.frequency.setValueAtTime(220, audioContext.currentTime); // Frequency of modulation

// Create a gain node for modulating the amplitude of the modulator
const modulatorGain = audioContext.createGain();
modulatorGain.gain.setValueAtTime(100, audioContext.currentTime); // Modulation depth

// Connect the modulator through the gain node to the frequency of the carrier
modulator.connect(modulatorGain);
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the destination (e.g., speakers)
carrier.connect(audioContext.destination);

// Start the oscillators
carrier.start();
modulator.start();

// Optionally, stop the oscillators after a duration
setTimeout(() => {
    carrier.stop();
    modulator.stop();
    carrier.disconnect();
    modulator.disconnect();
}, 2000); // Stops after 2 seconds
