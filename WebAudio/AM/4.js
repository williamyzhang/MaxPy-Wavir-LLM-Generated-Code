// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create Oscillator Node for the carrier wave (sine wave)
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine'; // Sine wave
carrierOscillator.frequency.value = 440; // Initial frequency

// Create Oscillator Node for the modulating wave (also a sine wave)
const modulatorOscillator = audioContext.createOscillator();
modulatorOscillator.type = 'sine'; // Sine wave
modulatorOscillator.frequency.value = 2; // Modulation frequency (2 Hz)

// Create Gain Node for controlling the modulation depth
const modulationGain = audioContext.createGain();
modulationGain.gain.value = 0.5; // Modulation depth

// Connect the modulator to the modulationGain
modulatorOscillator.connect(modulationGain);

// Connect the carrier and modulator through the modulationGain
modulationGain.connect(carrierOscillator.frequency);

// Connect the carrier oscillator to the destination (speaker)
carrierOscillator.connect(audioContext.destination);

// Start the oscillators
carrierOscillator.start();
modulatorOscillator.start();
