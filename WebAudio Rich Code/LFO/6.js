// Create the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the main oscillator for sound production
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Sine wave for the sound
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set to A4 note, 440 Hz

// Create the LFO to modulate the frequency for vibrato
const lfo = audioContext.createOscillator();
lfo.type = 'sine'; // Sine wave for smooth vibrato
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // Vibrato speed, 5 Hz

// Create a gain node to control the depth of the vibrato
const lfoGain = audioContext.createGain();
lfoGain.gain.setValueAtTime(10, audioContext.currentTime); // Vibrato depth, 10 Hz range

// Connect the LFO through the gain node to the main oscillator's frequency
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Connect the main oscillator to the output
oscillator.connect(audioContext.destination);

// Start the oscillators
oscillator.start();
lfo.start();

// Optionally, to vary the vibrato parameters randomly over time:
setInterval(() => {
	const randomDepth = Math.random() * 20; // Random depth from 0 to 20 Hz
	const randomSpeed = Math.random() * 10; // Random speed from 0 to 10 Hz
	lfo.frequency.setValueAtTime(randomSpeed, audioContext.currentTime);
	lfoGain.gain.setValueAtTime(randomDepth, audioContext.currentTime);
}, 1000); // Change every 1000 ms (1 second)

// You can adjust the time to see changes more frequently or less frequently.
