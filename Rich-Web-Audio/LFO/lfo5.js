// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a vibrato effect
function createVibratoSine(frequency, vibratoRate, vibratoDepth){
    // Main oscillator for the tone
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Frequency of the sine wave

    // LFO for the vibrato effect
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(vibratoRate, audioCtx.currentTime); // Rate of the vibrato

    // Gain node to control the depth of the vibrato
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(vibratoDepth, audioCtx.currentTime); // Depth of the vibrato

    // Connecting the LFO through the gain node to the main oscillator's frequency
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);

    // Output the sound
    oscillator.connect(audioCtx.destination);

    // Start the oscillators
    oscillator.start();
    lfo.start();

    // Stop the oscillators after some time
    oscillator.stop(audioCtx.currentTime + 3); // Sustain for 3 seconds
    lfo.stop(audioCtx.currentTime + 3);

    console.log(`Created a vibrato sine wave at ${frequency}Hz with a vibrato rate of ${vibratoRate}Hz and depth of ${vibratoDepth}.`);
}

// Example usage: Create 5 oscillators with random vibrato rates and depths
for (let i = 0; i < 5; i++) {
    const baseFrequency = 440; // A4
    const vibratoRate = Math.random() * 5 + 5; // Random vibrato rate between 5Hz and 10Hz
    const vibratioDepth = Math.random() * 50 + 50; // Random vibrato depth between 50 and 100

    createVibratoSine(baseFrequency, vibratoRate, vibratioDepth);
}
