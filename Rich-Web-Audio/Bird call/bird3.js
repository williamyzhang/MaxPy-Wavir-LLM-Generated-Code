// First, create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a single bird chirp
function createChirp(frequency) {
    // Create an oscillator node
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // Sine wave for a smooth tone

    // Create a gain node to control the volume
    const gainNode = audioCtx.createGain();
    
    // Connect the oscillator to the gain node and then to the audio context's destination
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Start the oscillator at a random frequency around a base value to add variation
    oscillator.frequency.setValueAtTime(frequency + Math.random() * 100 - 50, audioCtx.currentTime);
    
    // Modulate the frequency to mimic a chirp sound: start high and drop down
    oscillator.frequency.exponentialRampToValueAtTime(frequency / 2, audioCtx.currentTime + 0.2);

    // Fade out the sound smoothly
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Start volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2); // End volume

    // Start the sound and stop it after a short period to keep it chirp-like
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
}

// Function to play a sequence of chirps
function playBirdCall(frequency, numberOfChirps) {
    for(let i = 0; i < numberOfChirps; i++) {
        // Delay each chirp by a random amount to make the pattern less uniform
        const chirpDelay = Math.random() * 0.5; // up to 0.5 seconds between chirps
        setTimeout(() => {
            createChirp(frequency);
        }, chirpDelay * 1000 * i);
    }
}

// Example usage: play a bird call with base frequency 1500 Hz, consisting of 5 chirps
playBirdCall(1500, 5);
