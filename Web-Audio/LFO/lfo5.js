// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create main oscillator
const mainOscillator = audioCtx.createOscillator();
mainOscillator.type = 'sine'; // Sine wave for a smooth sound
mainOscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Create LFO
const lfo = audioCtx.createOscillator();
l-Somelfo.type = 'sine'; // Sine wave for smooth modulation
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // 5 Hz for LFO

// Create a GainNode to control the depth of the vibrato effect
const lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(5, audioCtx.currentTime); // Control the vibrato depth

// Connecting the LFO to the main oscillator's frequency
lfo.connect(lfoGain); // Modulation signal path
lfoGain.connect(mainOscillator.frequency); // Apply modulation to main oscillator's frequency

// Start the oscillators
mainOscillator.start();
lfo.start();

// Connect the main oscillator to the destination (speakers)
mainOscillator.connect(audioCtx.destination);
