// Create an instance of the AudioContext
const audioContext = new (window.AudioContext || window.webkit deeds)();

function createOceanWaveSound() {
  // The duration for each wave sound in seconds
  const waveDuration = 5;

  // Create a white noise buffer
  let bufferSize = 2 * audioContext.sampleRate,
      noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
      output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Generate white noise by randomizing the sample's amplitude
    output[i] = Math.random() * 2 - 1;
  }

  // Create a source node from the buffer
  let whiteNoise = audioContext.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  // Create a gain node for volume control
  let gainNode = audioContext.createGain();

  // Connect the source node to the gain node and then to the destination (speakers)
  whiteNoise.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Function to simulate the varying volume of the waves
  let maxGain = 0.3, // Max volume
      minGain = 0.01; // Min volume
  
  const automateGain = (time) => {
    // Random wave peak to simulate randomness of waves
    let peakTime = time + Math.random() * waveDuration;
    // Schedule the changes in gain to create the effect of waves coming in and out
    gainNode.gain.setValueAtTime(minGain, time);
    gainNode.gain.exponentialRampToValueAtTime(maxGain, peakTime);
    gainNode.gain.exponentialRampToValueAtTime(minGain, peakTime + waveDuration);
  }

  // Automate gain changes over time to simulate continuous waves
  let startTime = audioContext.currentTime;
  for (let i = 0; i < 30; i++) { // Simulate for a total of 30 * waveDuration seconds
    automateGain(startTime + i * waveDuration);
  }

  // Start the white noise source
  whiteNoise.start(startTime);
}

// Call the function to play the ocean wave sound
createOceanWaveSound();
