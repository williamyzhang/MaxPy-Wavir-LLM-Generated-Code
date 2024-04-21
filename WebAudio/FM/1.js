// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 200; // Modulation frequency

// Create carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // Carrier frequency

// Connect modulator to carrier frequency
modulator.connect(carrier.frequency);

// Connect carrier to audio output
carrier.connect(audioContext.destination);

// Start oscillators
modulator.start();
carrier.start();
