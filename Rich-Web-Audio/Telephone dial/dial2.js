// Create a new audio context
const audioContext = new AudioContext();

// Function to play the dial tone
function playDialTone() {
    // Define the dial tone frequencies
    const frequencies = [350, 440];
    
    // Create and configure oscillators for each frequency
    for (let i = 0; i < frequencies.length; i++) {
        const oscillator = audio safPlayOscillator(frequencies[i]);
        setTimeout(() => {
            oscillator.stop(); // Stop the oscillator after 3 seconds
        }, 3000);
    }
}

// Function to create, configure, and play an oscillator at a given frequency
function playOscillator(frequency) {
    // Create an oscillator node
    const oscillator = audioContext.createOscillator();

    // Set the oscillator frequency
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    // Set the oscillator type to sine for a smooth sound
    oscillator.type = 'sine';

    // Connect the oscillator to the audio context's destination (speakers)
    oscillator.connect(audioContext.destination);

    // Start the oscillator
    oscillator.start();
    
    return oscillator; // Return the oscillator so it can be stopped later
}

// Example usage
playDialTone();
