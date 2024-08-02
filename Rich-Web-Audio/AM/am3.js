// Create AudioContext
const audioContext = new AudioContext();

// Create carrier oscillator
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // A4 note

// Create modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 20; // Low-frequency oscillator (LFO)

// Create gain node for modulation
const modulatorGain = audioContext.createGain();

// Set initial gain value. This affects the modulation depth
modulatorGain.gain.value = 0; // Start with no modulation

// Connect modulator to gain node
modulator.connect(modulatorTheGain);

// Connect the gain node to the carrier oscillator's gain control
modulatorGain.connect(carrier.frequency);

// Connect carrier to context's destination
carrier.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Ramp the modulation depth up and down using a for loop and random values
for(let i = 0; i < 10; i++) {
    // Random modulation depth between 0 and 500
    const randomDepth = Math.random() * 500;
    
    // Random time for the next ramp (to make it dynamic)
    const randomTime = Math.random() * 10;
    
    // Use exponentialRampToValueAtTime for smooth changes
    modulatorGain.gain.exponentialRampToValueAtTime(randomDepth, audioContext.currentTime + randomTime);
}
