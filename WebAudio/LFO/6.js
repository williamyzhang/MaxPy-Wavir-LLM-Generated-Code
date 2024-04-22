// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator for the carrier (sine wave)
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine'; // Set oscillator type to sine wave

// Create an LFO oscillator (also a sine wave) for modulating the frequency
const lfoOscillator = audioContext.createOscillator();
lfoOscillator.type = 'sine'; // Set oscillator type to sine wave

// Create a gain node to control the depth of modulation
const lfoGain = audioContext.createGain();
lfoGain.gain.value = 50; // Set the depth of modulation (in Hz)

// Connect the LFO oscillator to the gain node
lfoOscillator.connect(lfoGain);

// Connect the gain node to the frequency parameter of the carrier oscillator
lfoGain.connect(carrierOscillator.frequency);

// Start both oscillators
carrierOscillator.start();
lfoOscillator.start();

// Connect the carrier oscillator to the audio context's destination (i.e., speakers)
carrierOscillator.connect(audioContext.destination);

// You can change the frequency and depth of the LFO to adjust the vibrato effect
// For example:
// lfoOscillator.frequency.value = 5; // Set LFO frequency to 5 Hz
// lfoGain.gain.value = 100; // Set depth of modulation to 100 Hz
