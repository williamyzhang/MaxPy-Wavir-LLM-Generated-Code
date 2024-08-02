// Create an instance of an AudioContext
const audioContext = new AudioContext();

// Carrier oscillator setup
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // A4 note

// Modulator oscillator setup
const modulator = audioContext.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 20 + Math.random() * 10; // Modulation frequency between 20Hz and 30Hz

// Gain node for the modulation
const modulationGain = audioContext.createGain();
modulationGain.gain.value = 100 + Math.random() * 200; // Modulation depth between 100 and 300

// Connect modulator to the modulation gain's gain parameter
modulator.connect(modulationGain.gain);

// Connect the modulation gain to the carrier frequency
modulationGain.connect(carrier.frequency);

// Connect carrier to the destination (speakers)
carrier.connect(audioContext.destination);

// Start the oscillators
carrier.start(audioContext.currentTime);
modulator.start(audioContext.currentTime);

// Stop the oscillators after 2 seconds
carrier.stop(audioContext.currentTime + 2);
modulator.stop(audioContext.currentTime + 2);
