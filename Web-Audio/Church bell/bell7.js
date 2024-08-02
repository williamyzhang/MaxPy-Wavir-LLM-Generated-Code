window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function playBell() {
    // Bell fundamental frequency
    const fundamental = 130.81; // Example: C3
    const harmonics = [2, 3, 4.2, 5.4, 6]; // Harmonic multipliers for a rich bell sound
    
    // GainNode for controlling the fade out
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 4); // 4 seconds to fade out

    // Create an oscillator for each harmonic
    harmonics.forEach((multiplier) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine'; // Sine wave for a smooth tone
        oscillator.frequency.setValueAtTime(fundamental * multiplier, audioContext.currentTime); // Setting harmonic frequency
        oscillator.connect(gainNode);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 4); // Stop oscillator after 4 seconds
    });
}

// Call playBell function to simulate the church bell sound
playBell();
