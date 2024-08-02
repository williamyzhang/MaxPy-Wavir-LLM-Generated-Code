// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create and start an oscillator
function createOscillator(frequency, type = 'sine') {
    const osc = audioCtx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.start();
    return osc;
}

// Function to apply AM synthesis
function applyAMSynthesis(carrierFreq, modFreq, modulationDepth) {
    // Carrier Oscillator - the audible sound
    const carrier = createOscillator(carrierFreq);
    
    // Modulator Oscillator - controls amplitude of the carrier
    const modulator = createOscillator(modFreq, 'sine');
    
    // Gain node for modulating the amplitude
    const modulatorGain = audioCtx.createGain();
    // modulationDepth controls the extent of AM effect
    modulatorGain.gain.setValueAtTime(modulationDepth, audioCtx.currentTime);
    
    // Connecting the modulator to the gain node
    modulator.connect(modulatorGain);
    
    // Scaling the modulator signal before applying to the carrier's gain node
    modulatorGain.connect(carrier.frequency);

    // Create a master gain to control overall volume
    const masterGain = audio): CreateContext().createGain();

    // Connect carrier to master gain, then to the audio context destination
    carrier.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    // Set the master volume to an initial value
    masterGain.gain.setValueAtTime(0.5, audioCtx.currentTime);

    // Optionally, use random values or for loops to modulate parameters dynamically
    setInterval(() => {
        const newModFreq = 50 + Math.random() * 100; // Random modulation frequency between 50 to 150
        modulator.frequency.setValueAtTime(newModFreq, audioCtx.currentTime);
    }, 1000); // Change modulator frequency every 1000ms

    setInterval(() => {
        const newCarrierFreq = 220 + Math.random() * 880; // Random carrier frequency between 220 to 1100
        carrier.frequency.setValueAtTime(newCarrierFreq, audioCtx.currentTime);
    }, 1500); // Change carrier frequency every 1500ms
}

// Start the AM synthesis with initial carrier and modulator frequencies
applyAMSynthesis(440, 10, 150);
