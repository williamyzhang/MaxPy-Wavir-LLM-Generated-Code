// Create a new audio context
const audioContext = new AudioContext();

// Function to start the AM synthesis
function startAMSynthesis(frequency = 440, modulationFrequency = 10, duration = 2000) {
    // Create a carrier oscillator
    const carrierOscillator = audioContext.createOscillator();
    carrierOscillator.type = 'sine';
    carrierOscillator.frequency.value = frequency; // frequency in Hz
    
    // Create a gain node for modulation
    const modulationGain = audioContext.createGain();
    // The modulationGain's gain value will be updated to achieve AM synthesis.
    // Start with a baseline of 0.5 to ensure the signal doesn't invert.
    modulationGain.gain.value = 0.5;
    
    // Create a modulator oscillator
    const modulatorOscillator = audioContext.createOscillator();
    modulatorOscillator.type = 'sine';
    modulatorOscillator.frequency.value = modulationFrequency; // frequency in Hz
    
    // Connect the modulator to the modulation gain's gain parameter
    modulatorOscillator.connect(modulationGain.gain);
    
    // Create a for loop to slightly randomize the modulation frequency over time
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            // Randomly adjust the modulation frequency a bit every 200ms
            modulatorOscillator.frequency.value += (Math.random() - 0.5) * 2;
        }, i * 200);
    }
    
    // Connect the carrier oscillator through the modulation gain node
    carrierOscillator.connect(modulationGain);
    
    // Then connect to the audio context's destination (the speakers)
    modulationGain.connect(audioContext.destination);
    
    // Start the oscillators
    carrierOscillator.start(audioContext.currentTime);
    modulatorOscillator.start(audioContext.currentTime);
    
    // Stop the oscillators after a certain 'duration'
    setTimeout(() => {
        carrierOscillator.stop();
        modulatorOscillator.stop();
    }, duration);
}

// Example usage
startAMSynthesis(440, 10, 5000); // Play an AM synthesis tone at 440Hz for 5 seconds
