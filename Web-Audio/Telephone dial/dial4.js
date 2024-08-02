// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createOscillator(freq) {
    const osc = audioContext.createOscillator();
    osc.frequency.value = freq;
    osc.type = 'sine';
    return osc;
}

function createDialTone() {
    // Create two oscillators for the two frequencies
    const osc1 = createOscillator(350);
    const osc2 = createOscillator(440);

    // Create a gain node to control the volume
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1; // Reduce the volume to avoid being too loud

    // Connect both oscillators to the gain node
    osc1.connect(gainNode);
    osc2.connect(gainNode);

    // Connect the gain node to the destination (speakers)
    gainNode.connect(audioContext.destination);

    // Start the oscillators
    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);

    // Optionally, stop the tone after a certain duration
    const duration = 10; // seconds
    osc1.stop(audioContext.currentTime + duration);
    osc2.stop(audioContext.currentTime + duration);
}

// Call the function to play the dial tone
createDialTone();
