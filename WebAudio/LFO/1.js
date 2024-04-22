// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Sine wave
oscillator.frequency.value = 440; // Initial frequency in Hz

// Create LFO (Low Frequency Oscillator)
const lfo = audioContext.createOscillator();
lfo.type = 'sine'; // Sine wave
lfo.frequency.value = 5; // Set LFO frequency (adjust to change vibrato rate)

// Create GainNode to control LFO depth
const lfoGain = audioContext.createGain();
lfoGain.gain.value = 20; // Set LFO depth (adjust to change vibrato intensity)

// Connect LFO to GainNode and connect GainNode to oscillator frequency
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);

// Connect oscillator to AudioContext destination (speakers)
oscillator.connect(audioContext.destination);

// Start oscillators
oscillator.start();
lfo.start();
