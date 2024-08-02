// Step 1: Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create sine wave oscillator
const sineOscillator = audioCtx.createOscillator();
sineOscillator.type = 'sine';
sineOscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Set to A4 pitch

// Step 3: Create LFO
const lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // Low frequency for vibrato effect, 5 Hz

// Step 4: Use LFO to modulate the frequency of the sine wave oscillator
const lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(5, audioCtx.currentTime); // Control the depth of the vibrato effect

lfo.connect(lfoGain); // Connect LFO to the gain node
lfoGain.connect(sineOscillator.frequency); // Connect gain node to the sine oscillator's frequency

// Start oscillators
sineOscillator.start();
lfo.start();

// Step 5: Connect to the destination
sineOscillator.connect(audioCtx.destination);
