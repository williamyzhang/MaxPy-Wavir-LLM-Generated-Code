// Set up the AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a sine wave oscillator
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Set frequency to 440 Hz (A4)

// Create an LFO to modulate the frequency
const lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // Frequency of LFO (5 Hz for vibrato)

// Create a gain node to control the depth of the modulation
const lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(5, audioCtx.currentTime); // Depth of modulation

// Connect the LFO to the gain node
lfo.connect(lfoGain);

// Then connect the gain node to the frequency of the oscillator
lfoGain.connect(oscillator.frequency);

// Connect the main oscillator to the audio context's destination
oscillator.connect(audioCtx.destination);

// Start the oscillators
oscillator.start();
lfo.start();

// Optionally stop the oscillators after some time
setTimeout(() => {
	oscillator.stop();
	lfo.stop();
	oscillator.disconnect();
	lfo.disconnect();
}, 10000); // Stop after 10 seconds
