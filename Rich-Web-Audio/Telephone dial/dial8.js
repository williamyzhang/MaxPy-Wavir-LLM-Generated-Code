// Create an AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to start the telephone dial tone
function startDialTone() {
    // Create two oscillators for the two-tone dial tone
    for(let i = 0; i < 2; i++) {
        let oscillator = audioCtx.createOscillator();
        // Apply a random factor to the frequency to simulate analog variations
        let frequencyVariation = Math.random() * 2 - 1; // Random between -1 and 1

        if(i === 0) {
            // First tone at 350Hz, with slight random variation
            oscillator.frequency.setValueAtTime(350 + frequencyVariation, audioCtx.currentTime);
        } else {
            // Second tone at 440Hz, with slight random variation
            oscillator.frequency.setValueAtTime(440 + frequencyVariation, audioCtx.currentTime);
        }

        // Connect the oscillator to the context's destination (the speakers)
        oscillator.connect(audioCtx.destination);

        // Start the oscillator
        oscillator.start();

        // Stop the oscillator after 10 seconds to simulate the end of the dial tone
        oscillator.stop(audioCtx.currentTime + 10);
    }
}

// Call the function to start the dial tone
startDialTone();
