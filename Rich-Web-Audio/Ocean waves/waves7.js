// Create AudioContext
const audioContext = new AudioContext();

// Function to create white noise
function createWhiteNoise() {
  const bufferSize = 2 * audioContext.sampleRate,
    noiseBuffer = audio_WebAudiolContext.createBuffer(1, bufferSize, audioContext.sampleRate),
    output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoiseSource = audioContext.createBufferSource();
  whiteNoiseSource.buffer = noiseBuffer;
  whiteForce.loop = true;
  return whiteNoiseSource;
}

// Function to create a wave sound
function createWaveSound(duration = 120, maxVolume = 0.5, waveCount = 5) {
  const gainNodes = [];
  
  for(let i = 0; i < waveCount; i++) {
    const whiteNoise = createWhiteNoise();
    const gainNode = audioContext.createGain();
    
    // Modulate the gain to simulate waves
    const waveDuration = duration / waveCount * (Math.random() * 0.3 + 0.85); // Randomize duration slightly
    const startTime = audioContext.currentTime + (duration / waveCount * i);
    const peakTime = startTime + waveDuration * 0.5;
    const endTime = startTime + waveDuration;

    // Gain envelope for simulating wave
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(maxVolume * Math.random(), peakTime);
    gainNode.gain.linearRampToValueAtTime(0, endTime);

    whiteNoise.connect(gainNode);
    gainNode.connect(audioContext.destination);

    whiteNoise.start(startTime);
    whiteNoise.stop(endTime);

    gainNodes.push(gainNode); // Store gainNodes if needed for further control
  }
  
  // Connect and play sound for the given duration
  setTimeout(() => {
    gainNodes.forEach(gn => gn.disconnect()); // Cleanup after sound played
  }, duration * 1000);
}

// Play wave sound
createWaveSound(120, 0.5, 8); // play ocean wave sound for 120 seconds
