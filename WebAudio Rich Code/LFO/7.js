// Create an audio context
const audioContext = new AudioContext();

// Create the main oscillator (sine wave)
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz, A note

// Create the LFO (Low Frequency Oscillator)
const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // 5 Hz, for vibrato effect

// Create a gain node for controlling the amplitude of the LFO modulation
const lfoGain = audioContext.createGain();
lfoGain.gain.setValueAtTime(10, audioContext.currentTime); // depth of vibrato

// Connect the LFO through the gain node to the frequency of the main oscillator
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Start the oscillators
oscillator.start();
lfo.start();

// Randomize LFO parameters using for loops and Math.random()
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		const newFrequency = Math.random() * 10 + 1; // Random LFO frequency between 1 Hz and 10 Hz
		const newDepth = Math.random() * 20; // Random depth between 0 and 20
		lfo.frequency.setValueAtTime(newFrequency, audioContext.currentTime);
		lfoGain.gain.setValueAtTime(newDepth, audioContext.currentTime);
		console.log(`LFO frequency set to ${newFrequency} Hz and depth to ${newDepth}`);
	}, i * 1000); // Change every second
}

// Disconnect after some time
setTimeout(() => {
	oscillator.stop();
	lfo.stop();
	oscillator.disconnect();
	lfo.disconnect();
}, 10000); // Stops after 10 seconds
