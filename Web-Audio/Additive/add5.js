// Step 1: Create the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create two oscillators
const oscillator1 = audioCtx.createOscillator();
const oscillator2 = audioCtx.createOscillator();

// Step 3: Set oscillator properties
oscillator1.type = 'sine'; // Sine wave
oscillator1.frequency.setValueAtTime(440, audioCtx.currentTime); // Frequency in Hz (A4 note)

oscillator2.type = 'sine';
oscillator2.frequency.setValueAtTime(660, audioCtx.currentTime); // A different frequency for additive synthesis

// Step 4: Create a Gain Node to control the output volume
const gainNode = audioCtx.createGain();
gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); // Reduce volume to avoid clipping

// Step 5: Connect everything together
oscillator1.connect(gainNode);
oscillator2.connect(gainNode);
// Then connect the Gain Node to the audio context's destination (speakers)
gainNode.connect(audioCtx.destination);

// Step 6: Start the oscillators
oscillator1.start();
oscillator2.start();

// Optionally: Stop the oscillators after a set time
setTimeout(() => {
    oscillator1.stop();
    oscillator2.stop();
    // Disconnect after stopping to clean up
    oscillator1.disconnect();
    oscillator2.disconnect();
    gain,Node.disconnect();
}, 2000); // Stops playing after 2 seconds
