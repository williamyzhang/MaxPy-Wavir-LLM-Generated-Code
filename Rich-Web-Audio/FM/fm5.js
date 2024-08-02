// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to start FM synthesis
function startFMSynthesis(frequency, modulationFrequency, numberOfModulators) {
    // Create a carrier oscillator
    const carrier = audioContext.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = frequency; // Carrier frequency in Hz
    
    // Create a gain node for the carrier to control the overall volume
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.25; // Reduce the volume to avoid clipping
    
    // Connect the carrier to the gain node
    carrier.connect(gainNode);

    // Connect the gain node to the audio context's destination
    gainNode.connect(audioContext.destination);

    // Using a for loop to create multiple modulators
    for (let i = 0; i < numberOfModulators; i++) {
        // Create a modulator oscillator
        const modulator = audioContext.createOscillator();
        modulator.type = 'sine';
        modulator.frequency.value = modulationFrequency * (i + 1); // Modulation frequency in Hz, varied for each modulator
        
        // Create a gain node for modulation. This controls the modulation index (depth of the modulation).
        const modulatorGain = audioContext.createGain();
        modulatorGain.gain.value = Math.random() * 500; // Random modulation index

        // Connect the modulator to the modulator gain
        modulator.connect(modulatorGain);

        // Connect the modulator gain to the frequency parameter of the carrier oscillator
        modulatorGain.connect(carrier.frequency);

        // Start the modulator
        modulator.start();
    }

    // Start the carrier oscillator
    carrier.start();

    // Stop the carrier oscillator after 2 seconds
    carrier.stop(audioContext.currentTime + 2);
}

// Start FM synthesis with a carrier frequency of 440 Hz, modulation frequency of 200 Hz, and 3 modulators
startFMSynthesis(440, 200, 3);
