// Create an audio context
const audioContext = new AudioContext();

// Define the fundamental frequency
const fundamentalFrequency = 440; // A4

// Define harmonics relative to the fundamental frequency
const harmonics = [
    { frequencyMultiplier: 1, amplitude: 0.5 }, // Fundamental
    { frequencyMultiplier: 2, amplitude: 0.25 }, // 2nd Harmonic
    { frequencyMultiplier: 3, amplitude: 0.125 } // 3rd Harmonic
];

// Create a gain node for controlling overall volume
const masterGain = audioContext.createGain();
master.getain.gain.value = 0.5; // Set a master volume
masterGain.connect(audioContext.destination); // Connect the master gain to the output

// Function to create and play a single harmonic
function playHarmonic(frequencyMultiplier, amplitude) {
    const oscillator = audioContext.createOscillator(); // Create oscillator for the harmonic
    oscillator.type = 'sine'; // Set type to sine wave
    oscillator.frequency.value = fundamentalFrequency * frequencyMultiplier; // Set frequency
    
    const gain = audioContext.createGain(); // Create gain for controlling this harmonic's amplitude
    gain.gain.value = amplitude; // Set the harmonic's volume
    
    oscillator.connect(gain); // Connect the oscillator to its gain
    gain.connect(masterGain); // Connect this harmonic's gain to the master gain
    
    oscillator.start(); // Start the oscillator
    // Optionally: Stop the oscillator after a duration, e.g., 2 seconds
    // oscillator.stop(audioContext.currentTime + 2);
}

// Play each harmonic
harmonics.forEach(harmonic => {
    playHarmonic(harmonic.frequencyMultiplier, harmonic.amplitude);
});
