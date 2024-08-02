// Initialize audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a basic oscillator
function createOscillator(freq) {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    return oscillator;
}

// Function to create LFO and apply vibrato effect
function applyVibrato(freq, depth, rate) {
    const oscillator = createOscillator(freq);
    const lfo = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Configure LFO
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(rate, audioCtx.currentTime); // LFO rate in Hz

    // Use the gain node to control the depth of the vibrato effect
    gainNode.gain.setValueAtTime(depth, audioCtx.currentTime); // Depth of modulation

    // Connect LFO through the gain node to oscillator's frequency
    lfo.connect(gainNode);
    gainNode.connect(oscillator.frequency);

    // Connect oscillator to context's destination
    oscillator.connect(audioCtx.destination);

    // Start oscillators
    oscillator.start();
    lfo.start();

    // Optionally, stop oscillators after a duration
    oscillator.stop(audioCtx.currentTime + 5); // stop after 5 seconds
    lfo.stop(audioCtx.currentTime + 5); // ensure LFO stops as well
}

// Apply vibrato to a sine wave, using random values for demonstration
for (let i = 0; i < 3; i++) {
    // Randomize frequency between 220 Hz and 440 Hz, depth between 20 and 100, and rate between 1 and 5 Hz
    const freq = Math.random() * (440 - 220) + 220;
    const depth = Math.random() * (100 - 20) + 20;
    const rate = Math.random() * (5 - 1) + 1;

    applyVibrato(freq, depth, rate);
}
