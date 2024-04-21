// Create AudioContext
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the oscillator for the carrier wave
var carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Sine wave

// Create the oscillator for the modulating wave
var modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Sine wave

// Create a gain node to control the modulation depth
var modGain = audioContext.createGain();

// Connect the modulator to the gain node, and connect the gain node to the frequency of the carrier
modulator.connect(modGain);
modGain.connect(carrier.frequency);

// Set modulation parameters
var modFreq = 10; // Modulation frequency (Hz)
var modDepth = 100; // Modulation depth (Hz)
modulator.frequency.value = modFreq;
modGain.gain.value = modDepth;

// Connect the carrier to the destination (speakers)
carrier.connect(audioContext.destination);

// Start the oscillators
carrier.start();
modulator.start();
