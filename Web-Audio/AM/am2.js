// 1. Create the AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 2. Create the Oscillators
var carrier = audioCtx.createOscillator();
var modulator = audioCtx.createOscillator();

// 3. Create the GainNode for the modulator
var modulatorGain = audioCtx.createGain();

// Configure the carrier wave
carrier.frequency.value = 440; // A4 note
carrier.type = 'sine'; // Sine wave

// Configure the modulator
modulator.frequency.value = 5; // 5 Hz for the modulation frequency
modulator.type = 'sine'; // Sine wave for the modulator as well

// Control the amplitude of the modulator. Set initial volume to 0.5
// This affects the depth of modulation.
modulatorGain.gain.value = 0.5;

// 4. Connect everything
modulator.connect(modulatorGain); // Connect modulator to its gain node
modulatorGain.connect(carrier.frequency); // Connect modulator's gain node to modulate the carrier's frequency
carrier.connect(audioCtx.destination); // Connect the carrier to the output

// 5. Start the oscillators
carrier.start();
modulator.start();
