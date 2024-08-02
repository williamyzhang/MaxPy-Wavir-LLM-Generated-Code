// Create a new audio context
const audioContext = new AudioContext();

// Define the fundamental frequency
const fundamentalFrequency = 220; // A3

// Number of harmonics to add
const numHarmonics = 5;

// Create a gain node for the master volume control
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.2; // Set master volume to a safe level
masterGain.connect(audioContext.destination);

// Function to create a sine wave oscillator and its gain node
function createSineWave(audioContext, frequency, gainValue) {
    // Create an oscillator node
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Sine wave
    oscillator.frequency.value = frequency; // Frequency in Hz

    // Create a gain node
    const gainNode = audioContext.createGain();
    gainNode.gain.value = gainValue;

    // Connect the oscillator to the gain node and the gain node to the destination
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);

    return oscillator;
}

// Loop to add harmonics
for (let n = 1; n <= numHarmonics; n++) {
    // Calculate harmonic frequency based on fundamental frequency
    const harmonicFrequency = fundamentalFrequency * n;

    // Randomize gain for each harmonic to add variation
    const harmonicGain = Math.random() * 0.5;

    // Create and start the harmonic oscillator
    const harmonicOscillator = createSineWave(audioContext, harmonicFrequency, harmonicGain);
    harmonicOscillator.start();
}

// Start the playback
masterGain.connect(audioContext.destination);
