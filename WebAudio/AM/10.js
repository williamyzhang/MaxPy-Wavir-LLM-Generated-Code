// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create Oscillators for Carrier and Modulator
const carrier = audioContext.createOscillator();
const modulator = audioContext.createOscillator();

// Set frequencies for Carrier and Modulator
const carrierFrequency = 440; // Hz
const modulatorFrequency = 5; // Hz
carrier.frequency.value = carrierFrequency;
modulator.frequency.value = modulatorFrequency;

// Create Gain Nodes for Carrier and Modulator
const carrierGain = audioContext.createGain();
const modulatorGain = audioContext.createGain();

// Set the modulation depth (modulation index)
const modulationDepth = 0.5;

// Connect the Modulator to its Gain Node
modulator.connect(modulatorGain);

// Set the modulation depth using the gain of the modulator
modulatorGain.gain.value = modulationDepth;

// Connect the Carrier to its Gain Node
carrier.connect(carrierGain);

// Connect the Modulator Gain Node to the Carrier Gain Node
modulatorGain.connect(carrierGain.gain);

// Connect the Carrier Gain Node to the AudioContext destination
carrierGain.connect(audioContext.destination);

// Start both Oscillators
carrier.start();
modulator.start();
