// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a sine wave oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // Frequency of the carrier wave (440 Hz)

// Create a gain node for modulating the amplitude
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 50; // Amplitude modulation depth

// Create a low-frequency oscillator (LFO) for modulation
const modulator = audioContext.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 2; // Frequency of the modulating wave (2 Hz)

// Connect the modulator to the gain node
modulator.connect(modulatorGain.gain);

// Connect the carrier oscillator to the destination
carrier.connect(audioContext.destination);

// Connect the modulatorGain to the carrier's amplitude
modulatorGain.connect(carrier.gain);

// Start the oscillators
carrier.start();
modulator.start();
