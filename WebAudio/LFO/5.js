// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator for the carrier (sine wave)
const carrierOscillator = audioContext.createOscillator();
carrierOscillator.type = 'sine';
carrierOscillator.frequency.value = 440; // Initial frequency
carrierOscillator.start();

// Create oscillator for the LFO
const lfoOscillator = audioContext.createOscillator();
lfoOscillator.type = 'sine';
lfoOscillator.frequency.value = 5; // LFO frequency in Hz
lfoOscillator.start();

// Gain node to control the depth of modulation
const depthGain = audioContext.createGain();
depthGain.gain.value = 10; // Modulation depth, adjust as needed

// Connect LFO to depthGain
lfoOscillator.connect(depthGain);

// Connect depthGain to the frequency of the carrier oscillator
depthGain.connect(carrierOscillator.frequency);

// Connect carrier oscillator to the destination (speakers)
carrierOscillator.connect(audioContext.destination);

// To stop the oscillators after some time
setTimeout(() => {
	carrierOscillator.stop();
	lfoOscillator.stop();
}, 5000); // Stops after 5 seconds
