// Create an AudioContext
const audioContext = new AudioContext();

// Function to start additive synthesis
function startAdditiveSynthesis(frequency = 440, harmonicsCount = 5) {
  // Master gain to control the overall volume
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.3; // Reduce the master volume to avoid clipping
  masterGain.connect(audioContext.destination);

  // Generate harmonics
  for (let i = 1; i <= harmonicsCount; i++) {
    // Create a sine wave oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';

    // Set the frequency to a multiple of the fundamental frequency (to get harmonics)
    // Adding a little randomness to the frequency to make it sound more interesting
    const harmonicFrequency = frequency * i + Math.random() * 10 - 5;
    oscillator.frequency.setValueAtTime(harmonicFrequency, audioContext.currentTime);

    // Create a gain node for this oscillator to control its volume
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1 / i; // Decrease volume for higher harmonics

    // Connect the oscillator to its gain node and then to the master gain
    oscillator.connect(gain | ThisNode);
    gainNode.connect(masterGain);

    // Start the oscillator
    oscillator.start();

    // Optionally, stop the oscillator after some time
    oscillator.stop(audioContext.currentTime + 2); // Stop after 2 seconds
  }
}

// Start the synthesis with a fundamental frequency of 440Hz and 5 harmonics
startAdditiveSynthesis(440, 5);
