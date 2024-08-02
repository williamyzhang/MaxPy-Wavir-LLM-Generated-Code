// Set up the AudioContext
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create an oscillator
function createSineWave(audioCtx, frequency) {
    let oscillator = audioCtx.createOscillator(); // Create oscillator node
    oscillator.type = 'sine'; // Set type to sine
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Set its frequency
    oscillator.connect(audioCtx.destination); // Connect oscillator to destination
    return oscillator;
}

// Create two sine waves at different frequencies
let sineWave1 = createSineWave(audioCtx, 440); // A4 note, 440 Hz
let sineWave2 = createSineWave(audioCtx, 660); // Adding a sine wave at 660 Hz for example

// Start the oscillators
sineWave1.start();
sineWave2.start();

// Optionally, stop them after a certain time
sineWave1.stop(audioCtx.currentTime + 2); // Stops after 2 seconds
sineWave2.stop(audioCtx.currentTime + 2); // Stops after 2 seconds
