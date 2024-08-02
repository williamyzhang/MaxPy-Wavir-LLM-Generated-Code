// Create audio context
const audioCtx = new AudioContext();

// Carrier oscillator setup
const carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Carrier waveform
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Modulator oscillator setup
const modulator = audioCtx.createOscillator();
modulator.type = 'sine'; // Modulator waveform
modulator.frequency.setValueAtTime(Math.random() * 100 + 50, audioCtx.currentTime); // Frequency between 50 and 150 Hz

// Gain node for modulator to control modulation depth
const modulatorGain = audioCtx.createGain();
modulatorGain.gain.setValueAtTime(Math.random() * 100, audioCtx.currentTime); // Random modulation depth

// Connect modulator to modulatorGain
modulator.connect(modulatorGain);

// Connect modulatorGain to the frequency of the carrier
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the destination (speakers)
carrier.connect(audioCtx.destination);

// Start oscillators
modulator.start();
carrier.start();

// Optional: Stop oscillators after a duration
setTimeout(() => {
    modulator.stop();
    carrier.stop();
}, 5000); // Stops after 5 seconds

// Example of using for loops to create multiple FM pairs
for (let i = 0; i < 3; i++) {
    let c = audioCtx.createOscillator();
    let m = audioCtx.createOscillator();
    let mg = audioCtx.createGain();

    c.type = 'sine';
    c.frequency.setValueAtTime(440 + (i * 100), audioCtx.currentTime); // A4, A#4, B4...

    m.type = 'sine';
    m.frequency.setValueAtTime(Math.random() * 100 + 50, audioCtx.currentTime);

    mg.gain.setValueAtTime(Math.random() * 100, audioCtx.currentTime);

    m.connect(mg);
    mg.connect(c.frequency);
    c.connect(audioCtx.destination);

    m.start();
    c.start();

    // Stop oscillators
    setTimeout(() => {
        m.stop();
        c.stop();
    }, 5000); // Adjust time as needed
}
