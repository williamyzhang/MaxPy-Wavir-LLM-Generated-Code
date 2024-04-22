// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create Oscillator node
const oscillator = audioContext.createOscillator();

// Set type to custom waveform
oscillator.type = 'custom';

// Define custom waveform (for a basic wave sound)
const real = new Float32Array([0, 0.5, 0.7, 1, 0.7, 0.5, 0]);
const imag = new Float32Array(real.length).fill(0);
const wave = audioContext.createPeriodicWave(real, imag);
oscillator.setPeriodicWave(wave);

// Connect oscillator to output
oscillator.connect(audioContext.destination);

// Start oscillator
oscillator.start();