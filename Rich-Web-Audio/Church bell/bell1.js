function playChurchBell() {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Define base frequency for the bell
    const baseFrequency = 110; // Starting frequency in Hz

    // Create a gain node for managing volume decay
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    
    // Gradually decrease the volume to simulate bell decay
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 5);

    // Use a for loop to layer multiple oscillators for a richer bell sound
    for (let i = 0; i < 3; i++) {
        let oscillator = audioData.context.createOscillator();
        oscillator.type = 'sine'; // Sine wave for smooth bell sound

        // Slightly randomize the frequency for each oscillator to simulate a realistic bell
        const frequencyVariance = Math.random() * 4 - 2; // +/- 2 Hz variance
        oscillator.frequency.setValueAtTime(baseFrequency + frequencyVariance, audioContext.currentTime);

        oscillator.connect(gainNode);
        oscillator.start();
        
        // Stop the oscillator after 5 seconds to match gain decay
        oscillator.stop(audioContext.currentTime + 5);
    }
}

// Play the bell sound
playChurchBell();
