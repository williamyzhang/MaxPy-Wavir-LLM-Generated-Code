// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function generateBirdCall() {
    // Number of chirps
    const numChirps = Math.floor(Math.random() * 5 + 3);

    for (let i = 0; i < numChirps; i++) {
        // Create oscillator for chirp
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';

        // Frequency range typical for small birds: 1000 - 8000 Hz
        oscillator.frequency.setValueAtTime(1000 + Math.random() * 7000, audioContext.currentTime);

        // Create gain for volume control
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01 + i * 0.1); // quick fade in
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2 + i * 0.1); // fade out

        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Start and stop oscillator
        let startTime = audioContext.currentTime + i * Math.random();
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
    }
}

// Example usage
generateBirdCall();
