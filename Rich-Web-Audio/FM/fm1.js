// Initialize audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function createFMSynthesis(frequency, modulationIndex) {
    // Carrier Oscillator - the primary sound source
    let carrier = audioCtx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    // Modulator Oscillator - modulates the frequency of the carrier
    let modulator = audioCtx.createOscillator();
    modulator.type = 'sine';
    
    // Set modulator frequency to a value that will vary the sound interestingly
    let modulatorFrequency = frequency * Math.random(); // Dynamic frequency using random
    modulator.frequency.setValueAtTime(modulatorFrequency, audioCtx.currentTime);

    // Modulation index determines the intensity of the modulation
    let modulatorGain = audioCtx.createGain();
    modulatorGain.gain.setValueAtTime(modulationIndex, audioCtx.currentTime);

    // Connect the modulator to the modulatorGain
    modulator.connect(modulatorGain);

    // Connect the modulatorGain to the carrier frequency
    modulatorGain.connect(carrier.frequency);

    // Connect the carrier to the destination (usually speakers)
    carrier.connect(audioCtx.destination);
    // masterGain = audioCtx.createGain();
    // masterGain.gain.setValueAtTime(0.1, audioCtx.currentTime); // Set master gain to 0.1
    // carrier.connect(masterGain);
    // masterGain.connect(audioCtx.destination); // makes it easier on the ears - william

    // Start oscillators
    carrier.start();
    modulator.start();

    // Stop oscillators after a short duration to make it a brief sound
    setTimeout(function() {
        carrier.stop();
        modulator.stop();
    }, 500); // Stop after 500 milliseconds
}

// Create FM synthesis sounds with varying parameters
for (let i = 0; i < 5; i++) {
    let frequency = 220 + (Math.random() * 880); // Frequency between 220Hz and 1100Hz
    let modulationIndex = 1 + Math.random() * 99; // Modulation index between 1 and 100
    createFMSynthesis(frequency, modulationIndex);
}
