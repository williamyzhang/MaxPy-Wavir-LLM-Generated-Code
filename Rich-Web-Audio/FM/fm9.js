// Set up the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate FM synthesis sound
function generateFMSound() {
    // Create carrier and modulator oscillators
    const carrier = audioCtx.createOscillator();
    const modulator = audioCtx.createOscillator();

    // Create gain node for the modulator to control modulation depth
    const modulatorGain = audioCtx.createGain();

    // Configure oscillators
    carrier.type = 'sine'; // Carrier waveform
    modulator.type = 'sine'; // Modulator waveform

    // Set random frequencies within a range for both oscillators
    carrier.frequency.value = Math.random() * 1000 + 200; // Carrier frequency between 200Hz and 1200Hz
    modulator.frequency.value = Math.random() * 10 + 5; // Modulation frequency between 5Hz and 15Hz

    // Modulation depth control
    modulatorGain.gain.value = Math.random() * 100 + 50; // Modulation depth between 50 and 150

    // FM synthesis setup: connect modulator to modulatorGain, and then to the frequency parameter of the carrier
    modulator.connect(modulatorGain);
    modulatorGain.connect(carrier.frequency);

    // Connect the carrier to the audio context destination
    carrier.connect(audioCtx.destination);

    // Start the oscillators
    carrier.start();
    modulator.start();

    // Stop the oscillators after 2 seconds to prevent continuous play
    setTimeout(() => {
        carrier.stop();
        modulator.stop();
    }, 2000);
}

// Generate multiple FM synthesis sounds in a loop with random parameters
for (let i = 0; i < 5; i++) {
    generateFMSound();
}
