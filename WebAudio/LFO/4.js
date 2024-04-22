// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator node for the sine wave
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Set the oscillator type to sine wave

// Create a GainNode for controlling the depth of the vibrato effect
const depthGain = audioContext.createGain();
depthGain.gain.value = 10; // Adjust this value to control the depth of the vibrato

// Connect the oscillator to the depthGain
oscillator.connect(depthGain);

// Connect the depthGain to the destination (speakers)
depthGain.connect(audioContext.destination);

// Set up the LFO (Low-Frequency Oscillator) to modulate the frequency of the oscillator
const lfo = audioContext.createOscillator();
lfo.frequency.value = 5; // Adjust this value to control the speed of the vibrato
const lfoGain = audioContext.createGain();
lfoGain.gain.value = 10; // Adjust this value to control the intensity of the vibrato

// Connect the LFO to the gain node controlling the depth of vibrato
lfo.connect(lfoGain);

// Connect the LFO gain node to the frequency parameter of the oscillator
lfoGain.connect(oscillator.frequency);

// Start the oscillators
oscillator.start();
lfo.start();
