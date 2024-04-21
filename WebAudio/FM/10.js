// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator for the carrier wave (the sine wave)
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine';
carrierOscillator.frequency.value = 440; // Initial frequency of 440 Hz

// Create an oscillator for the modulating wave (also a sine wave)
const modulatorOscillator = audioContext.createOscillator();
modulatorOscillator.type = 'sine';
modulatorOscillator.frequency.value = 2; // Initial frequency of 2 Hz (low frequency modulation)

// Create a gain node to control the amplitude of the modulation
const modulationGain = audioContext.createGain();
modulationGain.gain.value = 50; // Amplitude of modulation

// Connect the modulator to the modulation gain
modulatorOscillator.connect(modulationGain);

// Connect the modulation gain to the frequency of the carrier oscillator
modulationGain.connect(carrierOscillator.frequency);

// Connect the carrier oscillator to the output
carrierOscillator.connect(audioContext.destination);

// Start the oscillators
carrierOscillator.start();
modulatorOscillator.start();
