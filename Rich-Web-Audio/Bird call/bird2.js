// Create the Web Audio API context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a single bird chirp
function playChirp(frequency) {
    const currentTime = audioCtx.currentTime;

    // Create an oscillator node
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // Sine wave for a soft chirp sound
    oscillator.frequency.setValueAtTime(frequency, currentTime); // Set start frequency
    
    // Randomize frequency to simulate natural variations in chirp
    const endFrequency = frequency + (Math.random() * 1000 - 500);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, currentTime + 0.1);

    // Create a gain node to control the volume and create a fade-out effect
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(1, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.2);

    // Connect nodes together and to the destination (speakers)
    oscillator.connect(gainNode).connect(audioCtx.destination);

    // Start the oscillator immediately
    oscillator.start(currentTime);

    // Stop the oscillator after 0.2 seconds to end the chirp
    oscillator.stop(currentTime + 0.2);
}

// Function to play a series of chirps, simulating a bird call
function birdCall() {
    const numberOfChirps = 5 + Math.floor(Math.random() * 5); // Randomize the number of chirps
    for (let i = 0; i < numberOfChirps; i++) {
        // Calculate a random start time for each chirp within the next 2 seconds
        const startTime = Math.random() * 2;
        // Randomize the base frequency for each chirp between 1000Hz and 3000Hz
        const baseFrequency = 1000 + Math.random() * 2000;

        // Use setTimeout to play each chirp at its start time
        setTimeout(() => playChirp(baseFrequency), startTime * 1000);
    }
}

// Trigger the bird call
birdCall();
