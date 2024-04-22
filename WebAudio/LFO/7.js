// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator node for the carrier (sine wave)
const carrierOscillator = audioCtx.createOscillator();
carrierOscillator.type = 'sine'; // Sine wave
carrierOscillator.frequency.value = 440; // Starting frequency in Hz

// Create oscillator node for the LFO (low-frequency oscillator)
const lfoOscillator = audioCtx.createOscillator();
lfoOscillator.type = 'sine'; // Sine wave
lfoOscillator.frequency.value = 5; // LFO frequency in Hz
lfoOscillator.start();

// Create gain node for controlling the depth of the vibrato
const depthGain = audioCtx.createGain();
depthGain.gain.value = 20; // Vibrato depth

// Connect the LFO to the gain node
lfoOscillator.connect(depthGain);

// Connect the gain node to the frequency of the carrier oscillator
depthGain.connect(carrierOscillator.frequency);

// Connect the carrier oscillator to the destination (output)
carrierOscillator.connect(audioCtx.destination);

// Start the carrier oscillator
carrierOscillator.start();
