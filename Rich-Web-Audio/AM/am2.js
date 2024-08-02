// Define the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a carrier oscillator (sine wave)
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // A4 note, adjust as needed
carrier.start(0); // Start immediately

// Function to add AM modulation
function addModulation(frequency, depth) {
    // Create modulator
    const modulator = audioCtx.createOscillator();
    modulator.type = 'sine';
    modulator.frequency.value = frequency; // Modulation frequency

    // Create gain node for modulation depth
    const modulationDepth = audioCtx.createGain();
    modulationDepth.gain.value = depth; // Depth of modulation

    // Connect modulator to modulation depth gain node
    modulator.connect(modulationDepth);

    // Connect modulation depth gain node to carrier frequency
    modulationDepth.connect(carrier.frequency);

    // Start modulator
    modulator.start(0);
}

// Example usage with for loop and random values
for(let i = 0; i < 5; i++) {
    // Random frequency between 0.5 to 5 Hz for modulation
    const randomFrequency = 0.5 + Math.random() * 4.5;

    // Random depth between 0.2 to 1.0
    const randomDepth = 0.2 + Math.random() * 0.8;

    // Add modulation with random parameters
    addModulation(randomFrequency, randomDepth);
}

// Connect carrier to the destination (speakers)
carrier.connect(audioCtx.destination);
