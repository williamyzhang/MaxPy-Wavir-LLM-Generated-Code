// Create AudioContext
const audioContext = new AudioContext();

// Create a carrier oscillator - the primary sound source
const carrier = audio
Context.createOscillator();
carrier.type = 'sine'; // Sine wave
carrier.frequency.value = 440; // Frequency in Hz (A4 pitch)

// Create a modulator oscillator - to modulate amplitude of the carrier
const modulator = audioContext.createOscillator();
modulator.type = 'sine'; // Sine wave, though other shapes can be used
modulator.frequency.value = 5; // Frequency in Hz (low frequency for AM effect)

// Create a gain node to control the amplitude of the modulation
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 1; // Scaling factor for the modulator's influence

// Connect the nodes: Modulator > Gain Node > Gain Node's gain parameter
modulator.connect(modulatorGain);
modulatorGain.connect(carrier.frequency); // Modulate carrier's frequency

// Connect the carrier to the AudioContext's destination (speakers)
carrier.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// To stop the sound after a certain period, optionally use:
// carrier.stop(audioContext.currentTime + durationInSeconds);
// modulator.stop(audioContext.currentTime + durationInSeconds);
