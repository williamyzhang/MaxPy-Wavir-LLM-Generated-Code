// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a gain node for modulating the amplitude
const modulator = audioContext.createOscillator();
const modGain = audioContext.createGain();

// Set modulator frequency and gain
modulator.frequency.value = 4; // Set modulator frequency to 4 Hz
modGain.gain.value = 0.5; // Set modulator gain (amplitude)

// Create a sine wave oscillator
const carrier = audioContext.createOscillator();

// Connect the modulator and modulator gain to the carrier
modulator.connect(modGain);
modGain.connect(carrier.gain);

// Set carrier frequency
carrier.frequency.value = 440; // Set carrier frequency to 440 Hz

// Connect the carrier to the audio context destination
carrier.connect(audioContext.destination);

// Start the oscillators
modulator.start();
carrier.start();
