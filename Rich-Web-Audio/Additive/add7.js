// Create a new audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Base frequency of the sine wave
const baseFrequency = 440; // A natural tuning

// Number of harmonics to add
const numberOfHarmonics = 5;

// Gain for the base frequency oscillator
let baseGain = audioCtx.createGain();
baseGain.gain.value = 0.2; // Setting a lower gain for the base tone

// Create oscillator for base frequency
let baseOscillator = audioCtx.createOscillator();
baseOscillator.type = 'sine';
baseOscillator.frequency.value = baseFrequency;
baseOscillator.connect(baseGain);
baseGain.connect(audioCtx.destination);
baseOscillator.start();

// Function to add harmonics
function addHarmonics(frequency, numHarmonics) {
    for (let i = 1; i <= numHarmonics; i++) {
        let harmonicFrequency = frequency * i;
        let harmonicGainValue = Math.random() * 0.5; // Random gain for each harmonic

        // Create gain for the harmonic
        let harmonicGain = audioCtx.createGain();
        harmonicGain.gain.value = harmonicGainValue;

        // Create oscillator for the harmonic
        let harmonicOscillator = audioCtx.createOscillator();
        harmonicOscillator.type = 'sine';
        harmonicOscillator.frequency.value = harmonicFrequency;
        
        // Connect and play the harmonic
        harmonicOscillator.connect(harmonicGain);
        harmonicGain.connect(audioCtx.destination);
        harmonicOscillator.start();
        harmonicOscillator.stop(audioCtx.currentTime + 2); // Stop after 2 seconds
    }
}

// Add harmonics to the base frequency
addHarmonics(baseFrequency, numberOfHarmonics);

// Stop the base oscillator after 2 seconds
baseOscillator.stop(audioCtx.currentTime + 2);
