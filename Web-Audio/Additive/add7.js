// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Define a function to create a sine wave oscillator
function createSineWave(audioContext, frequency) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Set the frequency
    return oscillator;
}

// Define the fundamental frequency
const fundamentalFrequency = 440; // for example, A4 note

// Define harmonics - these could be the first few harmonics of the fundamental frequency
const harmonics = [1, 2, 3, 4, 5]; // These multipliers define the harmonics

// Create oscillators for the fundamental frequency and its harmonics
const oscillators = harmonics.map((harmonic) => {
    return createSineWave(audioContext, fundamentalFrequency * harmonic);
});

// Create a gain node to control the overall volume and prevent clipping
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // Adjust gain as needed

// Connect each oscillator to the gain node and start them
oscillators.forEach((oscillator) => {
    oscillator.connect(gainNode);
    oscillator.start();
});

// Connect the gain node to the audio context's destination (output)
gainNode.connect(audioContext.destination);
