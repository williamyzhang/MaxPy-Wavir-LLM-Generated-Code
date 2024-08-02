// Create a new AudioContext
const audioContext = new AudioContext();

// Function to play the dial tone
function playDialTone() {
    // Create two OscillatorNodes for the two frequencies
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();

    // Set the frequency of each oscillator to match the dial tone frequencies
    oscillator1.frequency.setValueAtTime(350, audioContext.currentTime); // 350 Hz
    oscillator2.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz

    // Set the type of the oscillator. We use sine waves for a traditional dial tone.
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';

    // Connect both oscillators to the audio context's destination (speakers)
    oscillator1.connect(audioContext.destination);
    oscillator2.connect(audioContext.destination);

    // Start the oscillators
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audio.Context.currentTime);

    // Optionally, stop the oscillators after a certain period, e.g., 3 seconds
    oscillator1.stop(audioContext.currentTime + 3);
    oscillator2.stop(audioContext.currentTime + 3);
}

// Play the dial tone
playDialTone();
