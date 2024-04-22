// Step 1: Initialize the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create the main oscillator
const mainOscillator = audioContext.createOscillator();
mainOscillator.type = 'sine';
mainOscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set to A4 note

// Step 3: Create the LFO (Low Frequency Oscillator)
const lfo = audioContext.createOscillator();
lfo.type = 'sine';

// Using for loop to set a random frequency for the LFO within a range
for (let i = 0; i < 1; i++) {
	let randomFrequency = Math.random() * (7 - 1) + 1; // Random frequency between 1 Hz and 7 Hz
	lfo.frequency.setValueAtTime(randomFrequency, audioContext.currentTime);
}

// Step 4: Create a gain node to control the amplitude of the LFO modulation
const lfoGain = audioContext.createGain();
lfoGain.gain.setValueAtTime(5, audioContext.currentTime); // Modulation depth

// Connect the LFO to the gain node, and then to the main oscillator frequency
lfo.connect(lfoGain);
lfoGain.connect(mainOscillator.frequency);

// Step 5: Connect the main oscillator to the audio context's destination
mainOscillator.connect(audioContext.destination);

// Step 6: Start oscillators
mainOscillator.start();
lfo.start();

// Optionally stop the oscillators after some time
setTimeout(() => {
	mainOscillator.stop();
	lfo.stop();
	audioContext.close();
}, 10000); // Stops after 10 seconds
