// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator node for the carrier (sine wave)
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Sine wave

// Create a gain node for controlling the depth of modulation
const depthGain = audioContext.createGain();
depthGain.gain.value = 10; // Adjust depth here

// Create an oscillator node for the LFO
const lfo = audioContext.createOscillator();
lfo.frequency.value = 5; // Adjust LFO frequency here

// Connect the LFO to the gain node
lfo.connect(depthGain.gain);

// Connect the depthGain to the frequency of the oscillator
depthGain.connect(oscillator.frequency);

// Start oscillators
oscillator.start();
lfo.start();

// Connect oscillator to output
oscillator.connect(audioContext.destination);
