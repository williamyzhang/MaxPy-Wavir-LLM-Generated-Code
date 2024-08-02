// 1. Set up the Audio Context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a single bell strike
function playBellStrike() {
    // 2. Create the Oscillator and Gain Nodes
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    // Connect oscillator to gain node and gain node to the destination
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // 3. Customize the Oscillator for a bell sound
    oscillator.type = 'sine'; // A sine wave for a smooth bell sound
    var initialFrequency = 300 + Math.random() * 100; // Randomize the starting frequency to simulate different bells
    oscillator.frequency.setValueAtTime(initialFrequency, audioCtx.currentTime);
    
    // Frequency drop to simulate bell decay
    oscillator.frequency.exponentialRampToValueAtTime(initialFrequency * 0.5, audioCtx.currentTime + 1.5);
    
    // 4. Customize the Gain for a decay effect
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime); // Start loud
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5); // Fade out
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 1.5); // Stop after the fade
}

// 5. Use a for Loop to Simulate Multiple Strikes
for (let i = 0; i < 5; i++) {
    setTimeout(playBellStrike, i * 1500); // Wait 1500ms between each strike
}
