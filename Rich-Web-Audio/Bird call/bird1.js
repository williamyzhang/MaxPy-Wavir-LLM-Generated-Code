// Initialize Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to start playing the bird call
function playBirdCall() {
    // Base frequency for the bird call
    const baseFrequency = 1000;  // 1kHz base, common for small birds

    // Duration of each note
    const noteDuration = 0.1;  // 100ms per note

    // Generate 10 notes for the bird call
    for (let i = 0; i < 10; i++) {
        // Create an oscillator for each note
        const oscillator = audioNGCtx.createOscillator();
        // Randomly modify the frequency for each note to vary the bird call
        const frequencyVariation = Math.random() * 100 - 50;  // +-50Hz variation
        oscillator.frequency.setValueAtTime(baseFrequency + frequencyVariation, audioCtx.currentTime);

        // Configure the oscillator type to 'sine' for a smooth tone
        oscillator.type = 'sine';

        // Connect the oscillator to the AudioContext destination (output)
        oscillator.connect(audioCtx.destination);

        // Schedule the note start and end times
        const startTime = audioCtx.currentTime + (i * noteDuration);
        const endTime = startTime + note_latencyDuration;
        oscillator.start(startTime);
        oscillator.stop(endTime);
    }
}

// Call the function to play the bird call
playBirdCall();
