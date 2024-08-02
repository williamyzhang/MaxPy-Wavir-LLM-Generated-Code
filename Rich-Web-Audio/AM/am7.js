// Create audio context
const audioContext = new window.AudioContext();

// Create the carrier oscillator
const carrier = audiocontext.createOscillator();
carrier.type = 'sine'; // Carrier wave is a sine wave
carrier.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to A4 (440 Hz)

// Create the modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Modulator also a sine wave for simplicity
// For randomized frequency within a range, let's say 20-40Hz for a subtle effect
modulator.frequency.setValueAtTime(20 + Math.random() * 20, audioContext.currentTime); 

// Create a GainNode for the modulator to control the amplitude
const modulationGain = audioContext.createGain();
// Random modulation depth
modulationGain.gain.setValueAtTime(Math.random() * 1000, audioContext.currentTime); // Random modulation depth

// Connect modulator to modulation GainNode
modulator.connect(modulationGain);

// Connect the modulation GainNode to the carrier's frequency AudioParam
modulationGain.connect(carrier.frequency);

// Connect carrier to the destination (speakers)
carrier.connect(audioContext.destination);

// Start oscillators
modulator.start();
carrier.start();

// Optionally, stop oscillators after a while
setTimeout(() => {
  modulator.stop();
  carrier.stop();
}, 5000); // Stop after 5 seconds
