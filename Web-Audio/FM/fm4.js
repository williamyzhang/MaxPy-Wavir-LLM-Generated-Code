// Start by creating an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Using a sine wave
carrier.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note

// Create the modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Using a sine wave for modulation as well
modulator.frequency.setValueAtTime(20, audioContext.currentTime); // Modulation frequency, this is what you'll tweak to get different FM sounds

// Create a gain node for the modulator to control the depth of the modulation
const modulatorGain = audioContext.createGain();
modulatorGain.gain.setValueAtTime(100, audioContext.currentTime); // Modulation depth

// Connect the modulator to the modulatorGain
modulator.connect(modulatorGain);

// Connect the modulatorGain to the frequency modulation input of the carrier oscillator
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the destination (speakers)
carrier.connect(audioContext.destination);

// Start the oscillators
carrier.start();
modulator.start();
