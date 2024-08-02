// Initialize the AudioContext
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the main oscillator for sound generation
let sineOscillator = audioContext.createOscillator();
sineOscillator.type = 'sine'; // Set the waveform to sine
sineOscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note

// Create the LFO to modulate the frequency of the sineOscillator
let lfo = audioContext.createOscillator();
lfo.type = 'sine'; // Sine wave for smooth vibrato
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // 5Hz for the LFO rate

// Create a gain node to control the depth of the vibrato
let lfoGain = audioContext.createGain();
lfoGain.gain.setValueAtTime(10, audioContext.currentTime); // Adjust this for deeper/shallower vibrato

// Connect the LFO through the gain node to the frequency parameter of the sineOscillator
lfo.connect(lfoGain);
lfoGain.connect(sineOscillator.frequency);

// Start the oscillators
sineOscillator.start();
lfo.start();

// Connect the sineOscillator to the audio output
sineOscillator.connect(audioContext.destination);

// Optional: Setup to stop both oscillators after some time
setTimeout(() => {
    sineOscillator.stop();
    lfo.stop();
    sineOscillator.disconnect();
    lfo.disconnect();
}, 5000); // Stops after 5 seconds
