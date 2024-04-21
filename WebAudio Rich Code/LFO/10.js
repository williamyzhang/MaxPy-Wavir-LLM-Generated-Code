// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a sine wave oscillator
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // 440 Hz - A note

// Create an LFO for the vibrato effect
const lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // 5 Hz - Frequency of vibrato

// Create a GainNode for LFO to control the depth of vibrato
const lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(10, audioCtx.currentTime); // Depth of frequency modulation

// Connect LFO through GainNode to the frequency of the main oscillator
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Connect the main oscillator to the output
oscillator.connect(audioCtx.destination);

// Start both oscillators
oscillator.start();
lfo.start();

// Optional: Use a for loop and Math.random() to vary the LFO frequency
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		const newFreq = Math.random() * 10; // Random frequency between 0 and 10 Hz
		lfo.frequency.setValueAtTime(newFreq, audioCtx.currentTime);
		console.log(`LFO frequency set to ${newFreq} Hz`);
	}, i * 1000); // Change frequency every second
}

// To stop the oscillators later
// setTimeout(() => {
//   oscillator.stop();
//   lfo.stop();
// }, 10000); // Stop after 10 seconds
