// Create an audio context
const audioContext = new AudioContext();

// Create the carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Carrier waveform type
carrier.frequency.value = 440; // Frequency in Hz (A4)

// Create the modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Modulator waveform type
modulator.frequency.value = 220; // Frequency in Hz

// Create a gain node for the modulator. This controls modulation depth.
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 100; // Modulation depth

// Connect the modulator to the modulatorGain
modulator.connect(modulatorGain);

// Then connect the modulatorGain to the frequency parameter of the carrier
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the destination (speakers)
carrier.connect(audioContext.destination);

// Start the oscillators
modulator.start();
carrier.start();

// Optionally, stop after a certain time
setTimeout(() => {
  carrier.stop();
  modulator.stop();
}, 2000); // Stops after 2000 milliseconds = 2 seconds
