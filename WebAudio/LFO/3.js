// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator node for the carrier (the sound)
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine'; // Sine wave
carrierOscillator.frequency.value = 440; // Initial frequency

// Create oscillator node for the LFO
const lfoOscillator = audioContext.createOscillator();
lfoOscillator.type = 'sine'; // Sine wave
lfoOscillator.frequency.value = 5; // LFO frequency (5 Hz)

// Create gain node to control the depth of the vibrato effect
const depthGain = audioContext.createGain();
depthGain.gain.value = 10; // Vibrato depth

// Connect the LFO oscillator to the gain node
lfoOscillator.connect(depthGain);

// Connect the gain node controlling the depth to the frequency of the carrier oscillator
depthGain.connect(carrierOscillator.frequency);

// Connect the carrier oscillator to the output
carrierOscillator.connect(audioContext.destination);

// Start both oscillators
carrierOscillator.start();
lfoOscillator.start();
