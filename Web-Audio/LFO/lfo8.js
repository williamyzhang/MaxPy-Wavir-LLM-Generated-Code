// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the main oscillator that will produce the sound
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Use a sine wave
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to 440 Hz (A4)

// Create the LFO that will modulate the main oscillator's frequency (for the vibrato effect)
const lfo = audioContext.createOscillator();
lfo.type = 'sine'; // Sine wave for smooth vibrato
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // Set LFO frequency for the vibrato speed, e.g., 5 Hz

// Create a gain node to control the depth of the vibrato
const vibratoDepth = audioContext.createGain();
vibratoDepth.gain.setValueAtTime(10, audioContext.currentTime); // Vibrato depth: 10 Hz

// Connect the LFO to the gain node (to control the depth of the modulation)
lfo.connect(vibratoDepth);

// Connect the gain node to the oscillator's frequency (to apply the vibrato effect)
vibratoDepth.connect(oscillator.frequency);

// Start the oscillators
oscillator.start();
lfo.start();

// Connect the main oscillator to the context's destination (to hear the sound)
oscillator.connect(audioContext.destination);

// To stop the sound after a duration
setTimeout(() => {
    oscillator.stop(); // Stops the main oscillator
    lfo.stop(); // Stops the LFO
    oscillator.disconnect(); // Disconnect the oscillator
    lfo.disconnect(); // Disconnect the LFO
}, 5000); // Stop after 5000 milliseconds (5 seconds)
