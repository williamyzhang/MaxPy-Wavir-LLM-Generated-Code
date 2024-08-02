// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the primary oscillator (the sine wave you will hear)
const primaryOscillator = audioContext.createOscillator();
primaryOscillator.type = 'sine';
primaryOscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to A4 (440 Hz)

// Create an LFO (Low Frequency Oscillator) for the vibrato effect
const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // Vibrato speed in Hz

// Create a gain node to control the depth of the vibrato effect
const lfoDepth = audioContext.createGain();
lfoDepth.gain.setValueAtTime(10, audioContext.currentTime); // Vibrato depth

// Connect LFO through the gain node to the primary oscillator's frequency
lfo.connect(lfoDepth);
lfoDepth.connect(primaryOscillator.frequency);

// Start both oscillators
primaryOscillator.start();
lfo.start();

// Connect the primary oscillator to the destination (speakers)
primaryOscillator.connect(audioContext.destination);

// Set random starting points for both oscillators using for loop and random
for (let i = 0; i < 2; i++) {
    let randomPhase = Math.random() * 2 * Math.PI; // Random phase between 0 and 2π
    if (i === 0) {
        primaryOscillator.setPeriodicWave(audioContext.createPeriodicWave(new Float32Array([0, Math.cos(randomPhase)]), new Float32Array([0, Math.sin(randomPhase)])));
    } else {
        lfo.setPeriodicWave(audioContext.createPeriodicWave(new Float32Array([0, Math.cos(randomPhase)]), new Float32Array([0, Math.sin(randomPhase)])));
    }
}

// Optionally, you can set a duration for the sound and stop both oscillators after that duration
setTimeout(() => {
    primaryOscillator.stop();
    lfo.stop();
}, 2000); // Stops playing after 2 seconds
