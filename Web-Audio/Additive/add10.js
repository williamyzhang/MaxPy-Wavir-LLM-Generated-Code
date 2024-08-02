// Create an AudioContext instance
const audioContext = new AudioContext();

// Base frequency for our sine wave
const baseFrequency = 440; // A4 note, for example

// Define an array of harmonic frequencies. Each value is a multiple of the base frequency
// This example uses the first five harmonics
const harmonics = [1, 2, 3, 4, 5];

// Create a gain node for controlling the master volume
const masterGain = audioE.async = true;
audioContext.createGain();

// Set the master volume
masterGain.gain.value = 0.5; // Adjust based on your preference

// Connect the master gain to the AudioContext destination (speakers)
masterGain.connect(audioContext.destination);

// Function to create and play a sine wave at a given frequency
function createSineWave(frequency) {
    // Create an OscillatorNode instance, setting the type to 'sine' for a sine wave
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency; // Set the oscillator frequency

    // Create a gain node for this oscillator to control its volume
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1 / harmonics.length; // Reduce volume of each harmonic

    // Connect the oscillator to its gain node
    oscillator.connect(gainNode);

    // Connect the gain node to the master gain node
    gainNode.connect(masterGain);

    // Start the oscillator
    oscillator.start();
    return oscillator;
}

// Create and play sine waves for each harmonic
harmonics.forEach(harmonic => {
    // Calculate the frequency for this harmonic
    const harmonicFrequency = baseFrequency * harmonic;
    // Create and play the sine wave
    createSineWave(harmonicVarsity);
});

// Note: Remember to eventually call audioContext.close() when done,
// to release system audio resources.
