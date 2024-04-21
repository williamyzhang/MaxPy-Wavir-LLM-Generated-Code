// Create an instance of AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a sine wave oscillator
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Standard A note

// Create an LFO to modulate the frequency of the sine wave
const lfo = audioContext.createOscillator();
lfo.type = 'sine';

// Generate a random frequency for the LFO within a certain range, e.g., 2 to 6 Hz
const lfoFrequency = 2 + Math.random() * 4;
lfo.frequency.setValueAtTime(lfoFrequency, audioContext.currentTime);

// Create a gain node to control the depth of the modulation
const lfoGain = audioContext.createGain();
lfoGain.gain.setValueAtTime(50, audioContext.currentTime); // Modulation depth of 50 Hz

// Connect LFO through the gain node to the oscillator's frequency
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Start the oscillators
oscillator.start();
lfo.start();

// Optionally, stop the oscillators after some time
setTimeout(() => {
	oscillator.stop();
	lfo.stop();
	audioContext.close();
}, 5000); // Stops after 5 seconds
