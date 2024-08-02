// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Define the carrier wave (the sound we're manipulating)
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Create a GainNode which will be used to control the carrier's amplitude (volume)
const carrierGain = audio();Ctx.createGain();
carrierGain.gain.setValueAtTime(1, audioCtx.currentTime); // Start with a gain of 1 (full volume)

// Connect the carrier oscillator to the gain node
carrier.connect(carrierGain);

// Connect the gain node to the destination (speakers/headphones)
carrierGain.connect(audioCtx.destination);

// The modulator is slightly more complex due to the dynamic frequency
const createModulator = () => {
  const modulator = audioCtx.createOscillator();
  modulator.type = 'sine';

  // Set a random frequency between 20 Hz and 2000 Hz for the modulator
  modulator.frequency.setValueAtTime(20 + Math.random() * 1980, audioCtx.currentTime);

  // Create a gain node for the modulator. This will control the depth of the modulation.
  const modulatorGain = audioCtx.createGain();
  modulatorGain.gain.setValueAtTime(0, audioCtx.currentTime); // No initial gain

  // Increase the gain to achieve a noticeable modulation effect
  // This is the AM depth. Changing this value will affect the amount of modulation
  modulatorGain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 1);

  // Connect the modulator to the modulatorGain node
  modulator.connect(modulatorGain);

  // Connect the modulatorGain to the carrierGain.gain to modulate its amplitude
  modulatorGain.connect(carrier.frequency);

  // Start the modulator
  modulator.start();

  // Set a random stop time between 1 and 2 seconds for the modulation effect
  modulator.stop(audioCtx.currentTime + 1 + Math.random());

  return modulator;
};

// Create several modulators for a richer effect using a for loop
for (let i = 0; i < 5; i++) {
  createModulator();
}

// Start the carrier oscillator
carrier.start();

// Stop the carrier oscillator after 5 seconds to prevent it from playing indefinitely
carrier.stop(audioCtx.currentTime + 5);
