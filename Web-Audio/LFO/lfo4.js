// Step 1: Create an AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create the main OscillatorNode (sine wave)
var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Set to A4 note

// Step 3: Create the LFO OscillatorNode
var lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // Low frequency for vibrato effect

// Step 4: Create the GainNode for the LFO
var lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(50, audioCtx.currentTime); // Control the depth of vibrato

// Step 5: Connect everything together
lfo.connect(lfoGain); // Connect LFO to Gain
lfoGain.connect(oscillator.frequency); // Connect GainNode to oscillator frequency for modulation 
oscillator.connect(audioCtx.destination); // Connect oscillator to output

// Step 6: Start the oscillators
lfo.start();
oscillator.start();
