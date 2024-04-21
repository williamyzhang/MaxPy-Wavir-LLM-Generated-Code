// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator for carrier wave
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine'; // You can change the waveform here
carrierOscillator.frequency.value = 440; // Set the frequency of the carrier wave (in Hz)
carrierOscillator.start();

// Create oscillator for modulating wave
const modulatorOscillator = audioContext.createOscillator();
modulatorOscillator.type = 'sine'; // You can change the waveform here
modulatorOscillator.frequency.value = 2; // Set the frequency of the modulating wave (in Hz)
modulatorOscillator.start();

// Create gain nodes for controlling the amplitude of carrier and modulator
const carrierGain = audioContext.createGain();
const modulatorGain = audioContext.createGain();

// Connect modulator oscillator to its gain node
modulatorOscillator.connect(modulatorGain);

// Connect carrier oscillator to its gain node
carrierOscillator.connect(carrierGain);

// Set the modulation depth (amplitude of modulation)
const modulationDepth = 0.5;

// Connect modulator to control the gain of carrier
modulatorGain.connect(carrierGain.gain);

// Connect the carrier gain to the destination (speakers)
carrierGain.connect(audioContext.destination);

// Set the modulation depth (amplitude of modulation)
const modulationDepth = 0.5;

// Function to update modulation depth
function updateModulationDepth(depth) {
	modulatorGain.gain.setValueAtTime(depth, audioContext.currentTime);
}

// Function to update the frequency of the modulating wave
function updateModulatorFrequency(freq) {
	modulatorOscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
}

// Function to update the frequency of the carrier wave
function updateCarrierFrequency(freq) {
	carrierOscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
}

// Example usage:
// Update modulation depth to 0.5
updateModulationDepth(modulationDepth);
// Update modulator frequency to 4 Hz
updateModulatorFrequency(4);
// Update carrier frequency to 880 Hz
updateCarrierFrequency(880);
