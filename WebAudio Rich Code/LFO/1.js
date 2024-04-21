// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create the main oscillator
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Set to 440 Hz, A note

// Create the LFO
const lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // Low frequency for vibrato effect

// Use Math.random() to set a random depth for the vibrato in a reasonable range
const vibratoDepth = audioCtx.createGain();
vibratoDepth.gain.setValueAtTime(Math.random() * 50 + 50, audioCtx.currentTime); // Random depth between 50 and 100

// Connect the LFO to the main oscillator's frequency
lfo.connect(vibratoDepth);
vibratoDepth.connect(oscillator.frequency);

// Start the oscillators
oscillator.start();
lfo.start();

// Optionally, connect the main oscillator to the context's destination
// to hear the output
oscillator.connect(audioCtx.destination);

// Example: Stop the oscillator after 5 seconds
setTimeout(() => {
	oscillator.stop();
	lfo.stop();
}, 5000);
