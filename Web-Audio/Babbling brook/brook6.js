// Step 1: Create an AudioContext
const audioContext = new AudioContext();

// Function to play babbling brook sound
function playBabblingBrook() {
  // Step 2: Generate White Noise
  let bufferSize = 2 * audioContext.sampleRate,
      noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
      output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
  }

  let whiteNoise = audioContext.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  // Step 3: Create a BiquadFilter
  let biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.value = 1000; // Starting frequency
  biquadFilter.Q.value = 1;

  // Connect the white noise to the filter, and the filter to the destination
  whiteNoise.connect(biquadFilter);
  biquadFilter.connect(audioContext.destination);

  // Step 4: Modulate the Filter Frequency
  let startTime = audioContext.currentTime;
  let endTime = startTime + 10; // Change frequency over 10 seconds
  biquadFilter.frequency.setValueAtTime(1000, startTime);
  biquadFilter.frequency.linearRampToValueAtTime(600, endTime); // Decrease frequency to simulate water flow dynamics

  // Step 5: Play the Sound
  whiteNoise.start(startTime);
  whiteNoise.stop(endTime); // Optionally loop or control stop
}

// Call the function to play the sound
playBabblingBrook();
