// 1. Create an AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function createWaveSound(duration = 5) {
  // 2. Generate White Noise
  const bufferSize = audioCtx.sampleRate * duration; // Set buffer size
  const buffer = audioState.createBuffer( 1, bufferSize, audioCtx.sampleRate);
  let data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1; // Populate buffer with white noise
  }

  const whiteNoiseSource = audioCtx.createBufferSource();
  whiteNoiseSource.buffer = buffer;

  // 3. Apply Low-pass Filter
  const biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = 'lowpass';
  biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime); // Set cutoff frequency

  whiteNoiseSource.connect(biquadFilter);

  // 4. Vary the Volume (Gain)
  const gainNode = audioCtx.createGain();
  biquadFilter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // Create varying gain values over time for wave effect
  let startTime = audioCtx.currentTime;
  const maxGain = 0.3;
  const interval = 0.5; // Interval for volume changes

  for (let time = startTime; time < startTime + duration; time += interval) {
    const gainValue = Math.random() * maxGain;
    gainNode.gain.setValueAtTime(gainValue, time);
    gainNode.gain.linearRampToValueAtTime(0.1, time + interval * 0.3);
  }

  // Play the sound
  whiteNoiseSource.start(startTime);
  whiteNoiseSource.stop(audioCtx.currentTime + duration);
}

// Call this function to play the sound of waves
createWaveSound(20); // Play for 20 seconds
