// Create a new audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create the main oscillator
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Create the LFO
const lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // 5 Hz for the LFO

// Create a gain node to control the amplitude of the LFO effect
const lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(10, audioCtx.currentTime); // Range of frequency modulation

// Connect the LFO through the gain node to the frequency of the main oscillator
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Connect the main oscillator to the output
oscillator.connect(audioCtx.destination);

// Start both oscillators
oscillator.start();
lfo.start();

// Stop the oscillators after 10 seconds
setTimeout(() => {
	oscillator.stop();
	lfo.stop();
	oscillator.disconnect();
	lfo.disconnect();
}, 10000);
