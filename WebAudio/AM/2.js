// Create Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create Oscillator Nodes for Carrier and Modulator
const carrierOscillator = audioContext.createOscillator();
const modulatorOscillator = audioContext.createOscillator();

// Set frequencies for Carrier and Modulator
const carrierFrequency = 440; // Hz
const modulatorFrequency = 5; // Hz

carrierOscillator.frequency.value = carrierFrequency;
modulatorOscillator.frequency.value = modulatorFrequency;

// Create Gain Nodes for Carrier and Modulator
const carrierGain = audioContext.createGain();
const modulatorGain = audioContext.createGain();

// Connect the Modulator to its Gain Node
modulatorOscillator.connect(modulatorGain);

// Connect the Carrier to its Gain Node
carrierOscillator.connect(carrierGain);

// Set up modulation depth (amount of modulation)
const modulationDepth = 0.5;

// Connect Modulator Gain to Carrier Gain
modulatorGain.connect(carrierGain.gain);

// Connect Carrier Gain to Audio Destination
carrierGain.connect(audioContext.destination);

// Start both oscillators
carrierOscillator.start();
modulatorOscillator.start();
