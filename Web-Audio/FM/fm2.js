// Create a new AudioContext
const audioContext = new AudioContext();

// Create the carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Carrier waveform type: 'sine' wave
carrier.frequency.value = 440; // Frequency in Hz (A4 note)

// Create the modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Modulator waveform type: 'sine' wave
modulator.frequency.value = 100; // Modulation frequency in Hz

// Create a gain node for the modulator to control modulation depth
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 50; // Modulation depth

// Connect the modulator to the gain node
modulator.connect(modulatorGain);

// Connect the gain node to the frequency parameter of the carrier oscillator
modulatorGain.connect(carrier.frequency);

// Connect the carrier oscillator to the destination (speakers)
carrier.connect(audioContext.destination);

// Start the oscillators
modulator.start();
carrier.start();

// Optionally, stop the oscillators after a duration
setTimeout(() => {
  carrier.stop();
  modulator.stop();
}, 2000); // stops after 2 seconds
