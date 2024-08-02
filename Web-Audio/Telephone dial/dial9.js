// Create a new AudioContext
const audioContext = new AudioContext();

// Function to start the dial tone
function startDialTone() {
    // Create two OscillatorNodes for the two frequencies
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    
    // Set oscillator frequencies to 350 Hz and 440 Hz
    oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
    oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);
    
    // Create a GainNode to control the volume
    const gainNode = audioContext.createGain();
    // Set the gain (volume) lower to avoid too loud output
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    // Connect both oscillators to the gainNode
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    
    // Connect the gainNode to the audio context's destination (the speakers)
    gainNode.connect(audioContext.destination);
    
    // Start the oscillators
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
}

// Function to stop the dial tone
function stopDialTone() {
    // Stop the oscillators after a delay to simulate dial tone duration
    // You can adjust the delay time or control it externally
    setTimeout(() => {
        oscillator1.stop();
        oscillator2.stop();
    }, 2000); // Stops the tone after 2 seconds
}

// Example usage
startDialTone();
// To stop the tone, you would call stopDialTone() at the desired moment
