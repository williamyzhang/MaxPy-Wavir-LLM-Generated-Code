// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator node for the sine wave
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Sine wave

// Create a gain node for controlling the vibrato depth
const depthGain = audioContext.createGain();
depthGain.gain.value = 10; // Adjust this value to control the depth of the vibrato

// Connect the oscillator to the gain node
oscillator.connect(depthGain);

// Connect the gain node to the output (speakers)
depthGain.connect(audioContext.destination);

// Set up the LFO (Low-Frequency Oscillator) to modulate the frequency
const lfo = audioContext.createOscillator();
lfo.frequency.value = 5; // Adjust this value to control the speed of the vibrato

// Create a gain node for controlling the depth of the modulation
const lfoDepthGain = audioContext.createGain();
lfoDepthGain.gain.value = 10; // Adjust this value to control the depth of the modulation

// Connect the LFO to the gain node controlling the depth
lfo.connect(lfoDepthGain);

// Connect the gain node controlling the depth to the frequency of the oscillator
lfoDepthGain.connect(oscillator.frequency);

// Start the oscillators
oscillator.start();
lfo.start();
