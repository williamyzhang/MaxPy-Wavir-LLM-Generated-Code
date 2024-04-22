// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create a low-pass filter to simulate the sound of flowing water
const filter = audioContext.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 500; // Adjust this value to change the intensity of the filtering

// Create an oscillator to generate the main sound
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // You can try other waveforms like 'triangle' or 'sawtooth'
oscillator.frequency.value = 200; // Adjust this value to change the pitch of the sound

// Connect the oscillator to the filter and the filter to the destination (speakers)
oscillator.connect(filter);
filter.connect(audioContext.destination);

// Start the oscillator
oscillator.start();

// Optionally, you can add modulation to the frequency or amplitude to create a more dynamic sound
// For example, you can use an LFO to modulate the frequency or amplitude slightly over time

// Create an LFO (Low-Frequency Oscillator) to modulate the filter frequency
const lfo = audioContext.createOscillator();
const lfoGain = audioContext.createGain();
lfo.type = 'sine'; // You can try other waveforms like 'triangle' or 'sawtooth'
lfo.frequency.value = 0.1; // Adjust this value to change the speed of modulation
lfoGain.gain.value = 50; // Adjust this value to change the depth of modulation

// Connect the LFO to the gain and the gain to the filter frequency
lfo.connect(lfoGain);
lfoGain.connect(filter.frequency);

// Start the LFO
lfo.start();
