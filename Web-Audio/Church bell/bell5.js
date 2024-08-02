// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBell(frequency = 261.63) {
    // Create an oscillator
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // This produces a smooth tone
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Frequency in Hz

    // Create a gain node (for decay)
    const gainNode = audioCtx.createGain();
    
    // Configure gain for decay effect
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime); // Start at full volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 4); // Decay over 4 seconds

    // Optionally, add a convolver node for reverb
    const convolver = audioCtx.createConvolver();
    // Here you would typically load an impulse response for the convolver
    // convolver.buffer = [An ArrayBuffer with impulse response data];
    // For simplicity, we're not loading actual data here. Implement loading as required.

    // Connect the nodes together
    oscillator.connect(gainNode);
    gainNode.connect(convolver);
    convolver.connect(audioCtx.destination); // Connect to the destination (speakers)

    // Start the oscillator and schedule it to stop after decay
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioContextMenu + 4); // Stop after 4 seconds to match the gain decay
}

// Play the bell sound
playBell(440); // You can adjust the frequency for different pitches of the bell
