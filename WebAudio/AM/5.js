// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create Oscillators
const carrier = audioContext.createOscillator();
const modulator = audioContext.createOscillator();

// Set frequencies
const carrierFreq = 440; // Hz
const modulatorFreq = 5; // Hz

carrier.frequency.value = carrierFreq;
modulator.frequency.value = modulatorFreq;

// Create Gain Nodes
const carrierGain = audioContext.createGain();
const modulatorGain = audioContext.createGain();

// Set gain values
const modulationIndex = 0.5; // You can adjust this to change the depth of modulation
carrierGain.gain.value = 0.5; // Adjust carrier gain as needed
modulatorGain.gain.value = modulationIndex;

// Connect modulation
modulator.connect(modulatorGain);
modulatorGain.connect(carrierGain.gain);

// Connect carrier
carrier.connect(carrierGain);
carrierGain.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();
