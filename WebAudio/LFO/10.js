// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator node for the carrier sine wave
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine'; // Sine wave
carrierOscillator.frequency.value = 440; // Initial frequency

// Create an LFO oscillator to modulate the frequency
const lfoOscillator = audioContext.createOscillator();
lfoOscillator.frequency.value = 5; // Set the frequency of the LFO (vibrato rate)

// Create a GainNode to control the depth of modulation
const modulationGain = audioContext.createGain();
modulationGain.gain.value = 20; // Set the depth of modulation

// Connect the LFO to the modulation gain
lfoOscillator.connect(modulationGain);

// Connect the modulation gain to the frequency of the carrier oscillator
modulationGain.connect(carrierOscillator.frequency);

// Connect the carrier oscillator to the destination (e.g., speakers)
carrierOscillator.connect(audioContext.destination);

// Start both oscillators
carrierOscillator.start();
lfoOscillator.start();
