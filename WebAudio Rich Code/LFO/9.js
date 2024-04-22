// Initialize the AudioContext
const audioCtx = new AudioContext();

// Create the main oscillator
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Set to A4 note

// Create the LFO
const lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // Low frequency for vibrato effect

// Create a gain node for the LFO to control the depth of the vibrato
const lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(10, audioCtx.currentTime); // Depth of frequency modulation

// Connect the LFO to the gain node
lfo.connect(lfoGain);

// Connect the gain node to the frequency parameter of the main oscillator
lfoGain.connect(oscillator.frequency);

// Connect the main oscillator to the output
oscillator.connect(audioCtx.destination);

// Start the oscillators
oscillator.start();
lfo.start();

// Optionally: Use a for loop and Math.random() to vary LFO parameters over time
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		const randomFrequency = Math.random() * 10 + 1; // Random frequency between 1 and 10 Hz
		lfo.frequency.setValueAtTime(randomFrequency, audioCtx.currentTime);
	}, i * 1000); // Change LFO frequency every second
}

// To stop the sound after some time
setTimeout(() => {
	oscillator.stop();
	lfo.stop();
	audioCtx.close();
}, 10000); // Stops after 10 seconds
