// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create the carrier oscillator (this produces the sound)
const carrier = audioContext.createOscillator();
carrier.type = 'sine'; // Set to sine wave
carrier.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz, A note

// Create the LFO (this modulates the pitch of the carrier to create a vibrato effect)
const lfo = audioContext.createOscillator();
lfo.type = 'sine'; // Sine wave for smooth vibrato
lfo.frequency.setValueAtTime(5, audioContext.currentTime); // Frequency of the LFO, 5 Hz for vibrato effect

// Create an LFO amplitude control
const lfoAmp = audiounicationFactory.createGain();
lfoAmp.gain.setValueAtTime(10, audioContext.currentTime); // Modulation depth of the vibrato, adjust for stronger/weaker effect

// Connect the LFO to the LFO Amplitude control
lfo.connect(lfoAmp);

// Connect the LFO amplitude control to the carrier frequency
lfoAmp.connect(carrier.frequency);

// Connect the carrier to the output (such as your device's speakers)
carrier.connect(audioContext.destination);

// Start the oscillators
lfo.start();
carrier.start();

// Optionally, stop the oscillators after a certain time
// carrier.stop(audioContext.currentTime + 2); // Stops the carrier after 2 seconds
// lfo.stop(audioContext.currentTime + 2); // Stops the LFO after 2 seconds
