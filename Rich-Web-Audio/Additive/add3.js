function createAdditiveSynthesis(context, baseFrequency = 440, numberOfOscillators = 5) {
    // Gain node to control the overall volume
    let masterGain = context.createGain();
    masterGain.gain.value = 0.2; // Reduce the volume to avoid clipping
    masterGain.connect(context.destination);

    // Array to store oscillator nodes
    let oscillators = [];

    for (let i = 0; i < numberOfOscillators; i++) {
        // Create an oscillator
        let oscillator = context.createOscillator();

        // Use a sine wave
        oscillator.type = 'sine';

        // Set frequency to base frequency and add a random value between -10 and 10 Hz
        let frequencyVariation = (Math.random() * 20) - 10; // Random value between -10 and 10
        oscillator.frequency.value = baseFrequency + frequencyVariation;

        // Connect the oscillator to the master gain node
        oscillator.connect(masterGain);

        // Start the oscillator immediately
        oscillator.start();

        // Add the oscillator to the array
        oscillators.push(oscillator);
    }

    // Function to stop the oscillators after a given duration
    function stopOscillators(duration = 2000) {
        setTimeout(() => {
            oscillators.forEach(oscillator => {
                oscillator.stop();
            });
        }, duration);
    }

    // Automatically stop after 2 seconds
    stopOscillators();
}

// Create a new AudioContext
let audioContext = new AudioContext();

// Call the function to create additive synthesis
createAdditiveSynthesis(audioContext);
