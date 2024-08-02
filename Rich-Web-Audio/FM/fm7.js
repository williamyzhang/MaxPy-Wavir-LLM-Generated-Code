// Initialize the AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate FM synthesis sound
function generateFMSynthesis() {
    // Create the carrier oscillator
    const carrier = audioCtx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = 440; // Use A4 note as the base frequency

    // Create the modulator oscillator
    const modulator = audioCtx.createOscillator();
    modulator.type = 'sine';
    // Generate a random frequency for the modulator within a given range
    modulator.frequency.value = 100 + Math.random() * 400; // Randomly between 100 and 500Hz

    // Create a gain node to control the modulation depth
    const modulationIndex = audioCtx.createGain();
    // Set modulation depth to a random value
    modulationIndex.gain.value = 50 + Math.random() * 150; // Randomly between 50 and 200

    // Connect the modulator to control the carrier's frequency
    modulator.connect(modulationIndex);
    modulationIndex.connect(carrier.frequency);

    // Connect the carrier to the destination (speakers)
    carrier.connect(audioCtx.destination);

    // Start the oscillators
    carrier.start();
    modulator.start();

    // Stop the oscillators after 2 seconds to avoid continuous play
    setTimeout(() => {
        carrier.stop();
        modulator.stop();
    }, 2000);
}

// Call the function to play the sound
generateFMSynthesis();
