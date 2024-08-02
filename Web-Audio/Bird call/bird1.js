// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function birdCall() {
    // Create two oscillators: one for the fundamental tone and one for modulation
    const primaryOscillator = audioContext.createOscillator();
    const modulatorOscillator = audioContext.createOscillator();

    // Create a gain node for controlling the modulation depth
    const modulationGain = audioContext.createGain();

    // Configure oscillators
    primaryOscillator.type = 'sine'; // You can experiment with 'sine', 'triangle', 'sawtooth', 'square'
    primaryOscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Bird call base frequency in Hz

    modulatorOscillator.type = 'sine';
    modulatorOscillator.frequency.setValueAtTime(10, audioContext.currentTime); // Speed of the vibrato effect in Hz

    modulationGain.gain.setValueAtTime(100, audioContext.currentTime); // Vibrato depth

    // Connect the modulator to the gain node
    modulatorOscillator.connect(modulationGain);

    // Connect the gain node to the primary oscillator frequency
    modulationGain.connect(primaryOscillator.frequency);

    // Create a gain node to control the overall volume
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Start at low volume
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1); // Rise
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1); // Fade out

    // Connect the primary oscillator to the gain node
    primaryOscillator.connect(gainNode);

    // Connect the gain node to the context destination
    gainNode.connect(audioContext.destination);

    // Start the oscillators
    primaryOscillator.start(audioContext.currentTime);
    modulatorOscillator.start(audioContext.currentTime);

    // Stop the oscillators after 2 seconds
    primaryOscillator.stop(audioContext.currentTime + 2);
    modulatorOscillator.stop(audioContext.currentTime + 2);
}

// Call the function to play the bird call
birdCall();
