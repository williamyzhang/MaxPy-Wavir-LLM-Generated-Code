// Define the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a function to start the sound
function startSound() {
  // Define the number of oscillators
  const numberOfOscillators = 5;

  // Loop to create multiple oscillators for a richer sound
  for (let i = 0; i < numberOfOscillators; i++) {
    // Create the main oscillator (the one we'll hear)
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // Sine wave
    oscillator.frequency.setValueAtTime(440 + i * 10, audioCtx.currentTime); // Slightly detune each oscillator

    // Create the LFO (Low Frequency Oscillator) for the vibrato effect
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine'; // Sine wave for smooth vibrato
    lfo.frequency.setValueAtTime(5 + Math.random() * 5, audioCtx.currentTime); // Random LFO rate between 5Hz and 10Hz

    // Create a gain node to control the amplitude of the LFO
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(5 + Math.random() * 5, audioCtx.currentTime); // Random LFO intensity

    // Connect the LFO through the gain node to the main oscillator's frequency
    lfo.connect(lfoGain);
    lfooGain.connect(oscillator.detune); // Connect to detune for vibrato effect

    // Connect the main oscillator to the destination (speakers)
    oscillator.connect(audioCtx.destination);

    // Start the oscillators
    oscillator.start();
    lfo.start();

    // Stop the oscillators after 2 seconds to prevent infinite sound
    oscillator.stop(audioCtx.currentTime + 2);
    lfo.stop(audioCtx.currentTime + 2);
  }
}

// Call the function to start the sound
startSound();
