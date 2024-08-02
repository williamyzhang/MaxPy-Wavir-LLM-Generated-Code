// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a sine wave oscillator for the main sound
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 pitch

// Create an LFO to modulate the oscillator's frequency for the vibrato effect
const lfo = audioCtx.createOscillator();
lfo.type = 'sine'; // Using a sine wave for smooth, periodic modulation
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // Configurable LFO frequency for vibrato speed

// Use a GainNode as an amplitude modulator for the LFO to control the vibrato depth
const lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(5, audioCtx.currentTime); // Configurable depth of the vibrato

// Connect nodes
lfo.connect(lfoGain); // Connect LFO to the GainNode
lfoGain.connect(oscillator.frequency); // Modulate the main oscillator's frequency with the LfoGain
oscillator.connect(audioCtx.destination); // Connect the main oscillator to the output

// Start the oscillators
oscillator.start();
lfo.start();

// Optionally use loops or random numbers to dynamically adjust LFO parameters
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        // Randomize LFO frequency for varied vibrato speed
        const randomLfoFrequency = Math.random() * 5 + 5; // Random frequency between 5Hz and 10Hz
        lfo.frequency.setValueAtTime(randomLfoFrequency, audioCtx.currentTime + i);

        // Randomize LFO gain for varied vibrato depth
        const randomLfoGain = Math.random() * 5; // Random gain between 0 and 5
        lfoGain.gain.setValueAtTime(randomLfoGain, audioCtx.currentTime + i);
    }, i * 1000); // Change every second
}
