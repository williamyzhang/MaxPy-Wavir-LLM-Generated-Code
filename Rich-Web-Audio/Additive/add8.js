// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to start additive synthesis
function startAdditiveSynthesis(frequency = 440, numberOfHarmonics = 5) {
    let fundamentalFrequency = frequency; // Fundamental frequency in Hz
    let gainValues = []; // Gain values for harmonic oscillators

    // Populate gainValues with random amplitude values for each harmonic
    for (let i = 0; i <= numberOfHarmonics; i++) {
        gainValues.push(Math.random() * 0.5); // Amplitudes between 0.0 and 0.5
    }

    // Create a gain node for the master volume control
    const masterGain = audioContext.createGain();
    masterGain.gain.value = 0.5; // Overall volume
    masterGain.connect(audioContext.destination);

    for (let harmonic = 1; harmonic <= numberOfHarmonics; harmonic++) {
        // Create oscillator
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine'; // Sine wave
        oscillator.frequency.value = fundamentalFrequency * harmonic; // Harmonic frequency

        // Create gain for this oscillator
        const gain = audioContext.createGain();
        gain.gain.value = gainValues[harmonic - 1]; // Set gain from gainValues array

        // Connect this oscillator to its gain node and then to the master gain node
        oscillator.connect(gain);
        gain.connect(masterGain);

        // Start the oscillator
        oscillator.start();
    }
}

// Start the additive synthesis with a fundamental frequency of 440Hz and 5 harmonics
startAdditiveSynthesis(440, 5);
