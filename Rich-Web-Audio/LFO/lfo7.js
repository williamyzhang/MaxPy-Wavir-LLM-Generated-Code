// Create audio context
const audioContext = new AudioContext();

// Create the primary oscillator (sine wave)
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note

// Create the LFO (Low Frequency Oscillator) for vibrato effect
const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // LFO frequency, controls the rate of the vibrato

// Use a GainNode as the amplitude modulator for the LFO's impact
const lfoGain = audioContext.createGain();
lfoGain.gain.setValueAtTime(0.5, audioContext.currentTime); // Depth of the vibrato

// Connect LFO through the gain node to the primary oscillator's frequency
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Start the oscillators
oscillator.start();
lfo.start();

// Connect the primary oscillator to the context's destination (speakers)
oscillator.connect(audioContext.destination);

// Implementing randomization to the LFO parameters
for (let i = 0; i < 10; i++) { // Example: Modifying LFO parameters randomly over 10 iterations
  setTimeout(() => {
    const randomFrequency = Math.random() * 5 + 5; // Random LFO frequency between 5 and 10 Hz
    const randomDepth = Math.random() * 0.5; // Random depth between 0 and 0.5
    
    lfo.frequency.setValueAtTime(randomFrequency, audioContext.currentTime);
    lfoGain.gain.setValueAtTime(randomDepth, audioContext.currentTime);
    console.log(`LFO Frequency: ${randomFrequency}, Depth: ${randomDepth}`);
  }, i * 2000); // Changing parameters every 2 seconds
}
