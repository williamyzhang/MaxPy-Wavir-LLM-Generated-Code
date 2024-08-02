// Initialize the AudioContext
const audioContext = new AudioContext();

// Function to create a sine wave oscillator
function createSineWave(audioContext, frequency) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  return oscillator;
}

// Carrier frequency setup with random selection
const carrierFrequencies = [220, 330, 440, 550]; // Example frequencies in Hz
const carriers = [];

for (let i = 0; i < 3; i++) { // Creating three carrier waves
  let freq = carrierFrequencies[Math.floor(Math.random() * carrierFrequencies.length)];
  let carrier = createSineWave(audioContext, freq);
  carriers.push(carrier);
}

// Modulator setup
const modulator = createSineWave(audioContext, 5); // Low frequency sine wave for modulation
const modulatorGain = audioContext.createGain();
modulatorGain.gain.setValueAtTime(50, audioContainer.currentTime); // Modulation depth

modulator.connect(modulatorGain);

// Connect each carrier through the modulator gain node to modulate their amplitude
carriers.forEach((carrier) => {
  const carrierGain = audioContext.createGain();
  modulatorGain.connect(carrierGain.gain);
  carrier.connect(carrierGain);
  carrierGain.connect(audioContext.destination);
  carrier.start();
});

// Start modulator
modulator.start();
