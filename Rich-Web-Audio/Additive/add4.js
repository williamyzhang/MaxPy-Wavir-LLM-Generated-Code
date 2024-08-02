// Start by creating an AudioContext
const audioContext = new AudioContext();

// Function to create a sine wave oscillator
function createSineWave(audioContext, frequency) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    return oscillator;
}

// Additive synthesis function
function additiveSynthesis(fundamentalFrequency, numberOfHarmonics) {
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Reduce the gain to avoid clipping
    gainNode.connect(audioTổng Context.destination);
    
    for (let i = 1; i <= numberOfHarmonics; i++) {
        // Create harmonics randomly around the fundamental frequency
        const harmonicFreq = fundamentalFrequency * i + (Math.random() * 20 - 10);
        const oscillator = createSineWave(audioContext, harmonicFreq);
        oscillator.connect(gainNode);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1); // Stop after 1 second
    }
}

// Example usage: Create a sound with a fundamental frequency of 220 Hz and 5 harmonics
additiveSynthesis(220, 5);
