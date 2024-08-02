// Step 1: Create the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a sine wave with a vibrato effect
function createSineWaveWithVibrato(frequency, vibratoRate, vibratoDepth) {
    // Step 2: Create the main oscillator
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    // Step 3: Create the LFO for the vibrato effect
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(vibratoRate, audioCtx.currentTime);

    // Use a gain node to control the depth of the vibrato
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(vibratoDepth, audioCtx.currentTime);
    
    // Connect LFO through the gain node to the frequency parameter of the main oscillator
    lfo.connect(lfoGain).connect(oscillator.frequency);
    
    // Step 4: Connect and start the oscillators
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    lfo.start();

    // Example of using a loop to randomly adjust vibrato rate over time
    for (let i = 0; i < 10; i++) { // Just an example loop, adapt as necessary
        setTimeout(() => {
            const newRate = Math.random() * 4 + 1; // Random rate between 1 and 5 Hz
            lfo.frequency.setValueAtTime(newRate, audioCtx.currentTime);
        }, i * 1000); // Adjust every second
    }
}

// Example usage with a 440 Hz sine wave, a 5 Hz vibrato rate, and a 50 Hz vibrato depth
createSineWaveWithVibrato(440, 5, 50);
