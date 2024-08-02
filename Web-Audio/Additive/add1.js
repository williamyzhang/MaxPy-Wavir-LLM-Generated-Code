// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Define a fundamental frequency
const fundamentalFrequency = 440; // A4 note

// Create oscillators for the fundamental and two harmonics
const fundamentalOscillator = audioCtx.createOscillator();
const secondHarmonic = audioCtx.createOscillator();
const thirdHarmonic = audioCtx.createOscillator();

// Set oscillator frequencies: fundamental, 2nd, and 3rd harmonics
fundamentalOscillator.frequency.setValueAtTime(fundamentalFrequency, audioCtx.currentTime);
secondHarmonic.frequency.setValueAtTime(fundamentalFrequency * 2, audioCtx.currentTime); // Twice the fundamental frequency
thirdHarmonic.frequency.setValueAtTime(fundamentalFrequency * 3, audioCtx.currentTime); // Three times the fundamental frequency

// Set all oscillators to sine waveforms
fundamentalOscillator.type = 'sine';
secondHarmonic.type = 'sine';
thirdHarmonic.type = 'sine';

// Create gain nodes to control the amplitude of each harmonic
const fundamentalGain = audioCtx.createGain();
const secondHarmonicGain = audioCtx.createGain();
const thirdHarmonicGain = audioCtx.createGain();

// Adjust the amplitude of each harmonic (1 for fundamental, 0.5 and 0.25 for harmonics as an example)
fundamentalGain.gain.value = 1; 
secondHarmonicGain.gain.value = 0.5; 
thirdHarmonicGain.gain.value = 0.25;

// Connect each oscillator to its gain node
fundamentalOscillator.connect(fundamentalGain);
secondHarmonic.connect(secondHarmonicGain);
thirdHarmonic.connect(thirdHarmonicGain);

// Connect all gain nodes to the audio context destination
fundamentalGain.connect(audioCtx.destination);
secondHarmonicGain.connect(audioCtx.destination);
thirdHarmonicGain.connect(audioCtx.destination);

// Start the oscillators
fundamentalOscillator.start();
secondHarmonic.start();
thirdHarmonic.start();

// Optionally, stop the oscillators after some time
setTimeout(() => {
    fundamentalOscillator.stop();
    secondHarmonic.stop();
    thirdHarmonic.stop();
}, 2000); // Stops after 2 seconds
