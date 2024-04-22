// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator nodes for carrier and modulator
const carrierOscillator = audioContext.createOscillator();
const modulatorOscillator = audioContext.createOscillator();

// Set initial frequency and type for carrier and modulator
carrierOscillator.frequency.value = 440; // Carrier frequency (Hz)
carrierOscillator.type = 'sine'; // Carrier waveform type

modulatorOscillator.frequency.value = 5; // Modulator frequency (Hz)
modulatorOscillator.type = 'sine'; // Modulator waveform type

// Create gain node for modulating the carrier frequency
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 100; // Modulation depth

// Connect modulator oscillator to modulator gain node
modulatorOscillator.connect(modulatorGain);

// Connect modulator gain node to the frequency parameter of the carrier oscillator
modulatorGain.connect(carrierOscillator.frequency);

// Connect carrier oscillator to the destination (audio output)
carrierOscillator.connect(audioContext.destination);

// Start oscillators
carrierOscillator.start();
modulatorOscillator.start();
