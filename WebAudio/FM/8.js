// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Define parameters
const carrierFrequency = 440; // Hz (frequency of the carrier wave)
const modulatorFrequency = 220; // Hz (frequency of the modulating wave)
const modulationIndex = 50; // Modulation index (controls the depth of modulation)

// Create the modulator oscillator
const modulator = audioContext.createOscillator();
modulator.frequency.value = modulatorFrequency;
modulator.start();

// Create the carrier oscillator
const carrier = audioContext.createOscillator();
carrier.frequency.value = carrierFrequency;

// Create the GainNode to modulate the carrier frequency
const modulationGain = audioContext.createGain();
modulationGain.gain.value = modulationIndex;

// Connect the modulator to the modulationGain, then connect the modulationGain to the carrier frequency
modulator.connect(modulationGain);
modulationGain.connect(carrier.frequency);

// Connect the carrier oscillator to the audio output
carrier.connect(audioContext.destination);

// Start the carrier oscillator
carrier.start();
