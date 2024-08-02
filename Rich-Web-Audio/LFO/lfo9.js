// Create audio context
const audioContext = new AudioContext();

// Create the primary oscillator that will produce the sound we hear
const primaryOscillator = audioContext.createOscillator();
primaryOscillator.type = 'sine';
primaryOscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set to A4 note as base frequency

// Create the LFO oscillator which modulates the primary oscillator's frequency
const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(Math.random() * 5 + 5, audioContext.currentTime); // LFO rate between 5Hz and 10Hz

// Create a gain node for controlling the depth of the vibrato effect
const vibratoDepth = audioContext.createGain();
vibratoDepth.gain.setValueAtTime(Math.random() * 50, audioContext.currentTime); // Depth of vibrato

// Connect the LFO to the vibrato depth control
lfo.connect(vibratoDepth);

// Connect the vibrato depth control to the frequency modulation of the primary oscillator
vibratoDepth.connect(primaryOscillator.frequency);

// Connect the primary oscillator to the audio context destination
primaryOscillator.connect(audioContext.destination);

// Start the oscillators
lfo.start();
primaryOscillator.start();

// Schedule them to stop after a while
setTimeout(() => {
    primaryOscillator.stop();
    lfo.stop();
}, 5000); // Stops after 5 seconds
