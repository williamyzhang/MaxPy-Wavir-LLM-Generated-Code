// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise(context) {
  const bufferSize = 2 * context.sampleRate,
        noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate),
        output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1; // Generate white noise
  }
  const whiteNoise = context.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;
  return whiteNoise;
}

// Function to modulate the amplitude of the noise to simulate waves
function simulateWaves(context) {
  const whiteNoiseSource = createWhiteNoise(context);
  const gainNode = context.createGain(); // Create a gain node for amplitude modulation
  
  // Create an oscillator for LFO
  const lfo = context.createOscillator();
  lfo.frequency.setValueAtTime(0.2, context.currentTime); // Low frequency for wave-like effect
  
  // Use the LFO to modulate the gain of the white noise
  lfo.connect(gainNode.gain);
  gainNode.gain.setValueAtTime(0.5, context.currentTime); // Set initial gain
  gainNode.gain.minValue = 0.001;  // Ensure gain never goes to 0
  gainNode.gain.maxValue = 1;  // Maximum gain
  
  // Connect the white noise through the gain node (where it gets modulated) and then to the destination
  whiteNoiseSource.connect(gainNode);
  gainNode.connect(context.destination);
  
  // Start the noise and LFO
  whiteNoiseSource.start();
  lfo.start();
  
  // Optionally, stop the sound after a period of time
  // whiteNoiseSource.stop(context.currentTime + 60); // Stop after 60 seconds
  // lfo.stop(context.currentTime + 60); // Stop the LFO as well
}

// Call the function to simulate ocean waves
simulateWaves(audioContext);
