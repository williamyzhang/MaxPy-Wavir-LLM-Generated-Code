// Initialize the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the main oscillator for the tone you want to modulate
const sineOscillator = audioContext.createOscillator();
sineOscillator.type = 'sine'; // The waveform type
sineOscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to 440 Hz

// Create an LFO (Low Frequency Oscillator) to modulate the frequency of the sineOscillator
const lfo = audioContext.createOscillator();
lfo.type = 'sine'; // The waveform type for the LFO
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // LFO frequency in Hz (5 Hz is a good start for vibrato)

// Create a GainNode to control the depth of the modulation
const lfoGain = audioContext.createGain();
lfoGain.gain.setValueAtTime(30, audioContext.currentTime); // Depth of the modulation

// Connect the LFO through the GainNode to the frequency of the sineOscillator
lfo.connect(lfoGain).connect(sineOscillator.frequency);

// Start the oscillators
sineOscillator.start(audioContext.currentTime);
lfo.start(audioContext.currentTime);

// Connect the sineOscillator to the destination (speakers)
sineOscillator.connect(audioContext.destination);

// Optionally, stop the oscillators after a certain time
// sineOscillator.stop(audioContext.currentTime + 5); // Stops after 5 seconds
// lfo.stop(audioContext.currentTime + 5); // Ensure LFO stops at the same time
