// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create carrier oscillator
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine'; // Sine wave
carrierOscillator.frequency.value = 440; // Initial frequency

// Create modulator oscillator
const modulatorOscillator = audioContext.createOscillator();
modulatorOscillator.type = 'sine'; // Sine wave
modulatorOscillator.frequency.value = 10; // Modulation frequency
modulatorOscillator.detune.value = 100; // Modulation depth

// Connect modulator to carrier frequency
const modulatorGain = audioContext.createGain();
modulatorOscillator.connect(modulatorGain);
modulatorGain.gain.value = 100; // Adjust modulation depth
modulatorGain.connect(carrierOscillator.frequency);

// Connect carrier to audio output
carrierOscillator.connect(audioContext.destination);

// Start oscillators
carrierOscillator.start();
modulatorOscillator.start();
