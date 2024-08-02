// Initialize the Web Audio API context
const audioContext = new AudioContext();

// Function to create a modulated sine wave using FM synthesis
function createFMSynthesis(frequency, numModulators = 3) {
  // Create the carrier oscillator
  const carrier = audioContext.createOscillator();
  carrier.type = 'sine';
  carrier.frequency.value = frequency; // Carrier frequency in Hz

  // Connect the carrier to the destination (speakers)
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.5; // Reduce the volume to avoid distortion
  carrier.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Create modulators and connect them to modulate the carrier frequency
  for (let i = 0; i < numModulators; i++) {
    // Modulator oscillator
    const modulator = audioContext.createOscillator();
    modulator.type = 'sine';
    modulator.frequency.value = Math.random() * 100 + 50; // Random modulator frequency between 50 and 150 Hz

    // Gain node to control the modulation depth
    const modulatorGain = audioContext.createGain();
    modulatorGain.gain.value = Math.random() * 100; // Random modulation depth

    // Connect the modulator to the gain node, then to the carrier frequency
    modulator.connect(modulatorGain);
    modulatorGain.connect(carrier.frequency);

    // Start the modulator
    modulator.start();
  }

  // Start the carrier oscillator
  carrier.start();

  // Stop the carrier oscillator after 5 seconds
  setTimeout(() => {
    carrier.stop();
    // Also stop all modulators
    for (let i = 0; i < numModulators; i++) {
      modulator.stop();
    }
  }, 5000);
}

// Example usage: Create an FM synthesized sound with a base frequency of 440 Hz and 3 modulators
createFMSynthesis(440, 3);
