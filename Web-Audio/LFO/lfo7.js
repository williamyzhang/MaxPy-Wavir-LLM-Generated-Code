// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator node for the sine wave
const sineOscillator = audioContext.createOscillator();
sineOscillator.type = 'sine'; // Sine wave
sineOscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frequency in Hz

// Create another oscillator for the LFO
const lfo = audioContext.createOscillator();
lfo.type = 'sine'; // LFO shape can be sine for a more natural vibrato
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // LFO frequency, 5Hz for vibrato

// Create a Gain node to control the depth of the vibrato
const lfoGain = audioContext.createGain();
lfoGain.gain.setValueAtTime(10, audioContext.currentTime); // Depth of the vibrato, modulating around ±10Hz of the carrier frequency

// Connect LFO through the Gain node to the frequency parameter of the sineOscillator
lfo.connect(lfoGain);
lfoGain.connect(sineOscillator.frequency);

// Start the oscillators
sineOscillator.start();
lfo.start();

// Connect the sine oscillator to the context's destination to hear it
sineOscillator.connect(audioContext.destination);

// To stop after a duration, you can use:
// setTimeout(() => {
//   sineOscillator.stop();
//   lfo.stop();
//   sineOscillator.disconnect();
//   lfo.disconnect();
// }, 10000); // Stops after 10 seconds
