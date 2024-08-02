// Create AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create Oscillators (Carrier and Modulator)
const carrier = audioCtx.createOscillator();
const modulator = audioCtx.createOscillator();

// Set oscillator types
carrier.type = 'sine'; // Carrier as a sine wave
modulator.type = 'sine'; // Modulator also as a sine wave for simplicity

// Setup Carrier frequency
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note

// Setup Modulator frequency and Gain
modulator.frequency.setValueAtTime(10, audioCtx.currentTime); // 10Hz for the modulation frequency

// Create Gain Node for Modulation
const modGain = audioCtx.createGain();
modGain.gain.setValueAtTime(100, audioCtx.currentTime); // Modulation depth

// Connection Flow: modulator -> modGain -> carrier gain -> destination
modulator.connect(modGain);
modGain.connect(carrier.frequency); // Modulates the carrier's frequency
carrier.connect(audioCtx.destination);

// Start oscillators
carrier.start();
modulator.start();
