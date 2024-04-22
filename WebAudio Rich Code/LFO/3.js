// Create a new AudioContext
const audioContext = new AudioContext();

// Create a sine wave oscillator (main tone)
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note, 440 Hz

// Create an LFO to modulate the frequency of the main oscillator
const lfo = audioContext.createOscillator();
lfo.type = 'sine';

// Randomly set the LFO frequency to modulate the speed of the vibrato effect
let lfoFrequency = 5; // Starting LFO frequency in Hz (5 Hz is a common starting point for vibrato)
for (let i = 0; i < 5; i++) {
	lfoFrequency += Math.random(); // Randomly increase the LFO frequency a bit
}
lfo.frequency.setValueAtTime(lfoFrequency, audioContext.currentTime);

// Create a gain node to control the depth of the vibrato effect
const lfoGain = audioContext.createGain();
let lfoDepth = 5; // Starting depth in Hz
for (let i = 0; i < 10; i++) {
	lfoDepth += Math.random(); // Randomly increase depth
}
lfoGain.gain.setValueAtTime(lfoDepth, audioContext.currentTime); // Set LFO depth

// Connect the LFO to the gain node and then modulate the frequency of the oscillator
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Connect the main oscillator to the audio context destination
oscillator.connect(audioContext.destination);

// Start the oscillators
oscillator.start();
lfo.start();

// Optionally, stop the oscillators after a set time
setTimeout(() => {
	oscillator.stop();
	lfo.stop();
	oscillator.disconnect();
	lfo.disconnect();
}, 10000); // Stop after 10 seconds
