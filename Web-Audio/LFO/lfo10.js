// Step 1: Create an AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create a sine wave oscillator
const sineWaveOscillator = audioCtx.createOscillator();
sineWaveOsculator.type = 'sine'; // This is the default, but it's good to be explicit
sineWaveOscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Step 3: Create an LFO
const lfo = audioCtx.createOscillator();
lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // 5 Hz for a noticeable but smooth vibrato effect

// To modulate the sine wave's frequency, we use a GainNode as an intermediary
const lfoGain = audioCtx.createGain();
lfoGain.gain.setValueAtTime(30, audioCtx.currentTime); // This controls the depth of the vibrato

// Step 4: Connect the LFO to the sine wave oscillator's frequency
lfo.connect(lfoGain);
lfoGain.connect(sineWaveOscillator.frequency);

// Connect the sine wave oscillator to the AudioContext's destination (speakers)
sineWaveOscillator.connect(audioCtx.destination);

// Step 5: Play the sound
sineWaveOscillator.start();
lfo.start();

// Optionally stop the sound after a duration
setTimeout(() => {
    sineWaveOscillator.stop();
    lfo.stop();
    sineWaveOscillator.disconnect();
    lfo.disconnect();
}, 2000); // Stops after 2 seconds
