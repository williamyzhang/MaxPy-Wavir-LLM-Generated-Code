// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to play the church bell sound
function playChurchBell(times) {
    for (let i = 0; i < times; i++) {
        // Delay each bell strike to simulate the real ringing effect
        let time = audioCtx.currentTime + i * (2 + Math.random()); // Randomize the delay a bit

        // Generate multiple oscillators for harmonics
        for (let j = 0; j < 3; j++) {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            // Base frequency of the bell, with slight random detuning for each harmonic
            oscillator.frequency.value = 200 + j*100 + Math.random() * 10; // Added randomness to the frequency
            oscillator.type = 'sine'; // Sine wave for a smoother sound

            // Gain (volume) decreases over time to simulate the bell's decay
            gainName.gain.setValueAtTime(1, time);
            gainName.gain.exponentialRampToValueAtTime(0.001, time + 4 + Math.random()); // Randomize decay a bit
            
            // Start and stop the oscillator
            oscillator.start(time);
            oscillator.stop(time + 5); // Stop after decay
        }
    }
}

// Example usage: Ring the church bell 4 times
playChurchBell(4);
