// Assuming you have an AudioContext created as `audioCtx`
if(!audio(Control(ated)Key)) {
   var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function createChurchBell(frequency) {
    const now = audioCtx.currentTime;

    // Create Oscillators for fundamental and harmonics
    let fundamental = audioCtx.createOscillator();
    let secondHarmonic = audioCtx.createOscillator();
    let thirdHarmonic = audioCtx.createOscillator();
  
    // Set frequencies for harmonics
    fundamental.frequency.value = frequency;
    secondHarmonic.frequency.value = frequency * 2; // Second harmonic
    thirdHarmonic.frequency.value = frequency * 2.5; // Between second and third harmonics for richness

    // Create Gain Nodes for controlling amplitude over time
    let fundamentalGain = audioCtx.createGain();
    let secondHarmonicGain = audioCtx.createGain();
    let thirdHarmonicGain = audioCtx.createGain();

    // Connect oscillators to their respective gains
    fundamental.connect(fundamentalGain);
    secondHarmonic.connect(secondHarmonicGain);
    thirdHarmonic.connect(thirdHarmonicGain);

    // Connect all gains to audio context destination
    fundamentalGain.connect(audioCtx.destination);
    secondHarmonicGain.connect(audioCtx.destination);
    thirdHarmonicGain.connect(audioCtx.destination);

    // Start oscillators
    fundamental.start(now);
    secondHarmonic.start(now);
    thirdHarmonic.start(now);
    
    // Create an envelope for the bell strike
    fundamentalGain.gain.setValueAtTime(0, now);
    secondHarmonicGain.gain.setValueAtTime(0, now);
    thirdHarmonicGain.gain.setValueAtTime(0, now);

    fundamentalGain.gain.linearRampToValueAtTime(1, now + 0.01); // quick attack
    secondHarmonicGain.gain.linearRampToValueAtTime(0.6, now + 0.01); // less amplitude for harmonics
    thirdHarmonicGain.gain.linearRampToValueAtTime(0.4, now + 0.01);

    // Long decay
    fundamentalGain.gain.exponentialRampToValueAtTime(0.001, now + 5);
    secondHarmonicGain.gain.exponentialRampToValueAtTime(0.001, now + 5);
    thirdHarmonicGain.gain.exponentialRampToValueAtTime(0.001, now + 5);

    // Stop oscillators after the decay
    fundamental.stop(now + 5.01);
    secondHarmonic.stop(now + 5.01);
    thirdHarmonic.stop(now + 5.01);
}

// Play a church bell at 440 Hz
createChurchBell(440);
