// Create AudioContext
const audioCtx = new AudioContext();

// Create primary sine wave oscillator
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.value = 440; // Frequency in Hz (A4)

// Create LFO for vibrato effect
const lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.value = 5 + Math.random() * 5; // Random LFO rate between 5 and 10 Hz for variation

// Create gain node for LFO to control the depth of vibrato effect
const lfoGain = audioCtx.createGain();
lfoGain.gain.value = 30 + Math.random() * 20; // Random depth between 30 and 50

// Connect nodes
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency); // Modulate frequency of oscillator for vibrato effect

// Start the oscillators
oscillator.start();
lfo.start();

// Connect primary oscillator to destination
oscillator.connect(audioCtx.destination);

// Optionally, control the effect over time
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    // Randomize LFO frequency and gain at each interval for dynamic vibrato effect
    lfo.frequency.value = 5 + Math.random() * 5; // Adjust LFO rate
    lfoGain.gain.value = 30 + Math.random() * 20; // Adjust vibrato depth
    console.log(`Updated LFO frequency: ${lfo.frequency.value}, gain: ${lfoGain.gain.value}`);
  }, 1000 * i); // Update every second
}

// Note: To stop the oscillators, you can call oscillator.stop() and lfo.stop() with a delay or at any desired moment.
