// Create an audio context
const audioContext = new AudioContext();

// Function to create a single water droplet sound
const createWaterDroplet = () => {
  const bufferSize = 2 * audioContext.sampleRate,
        noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1; // Generate white noise
  }

  const whiteNoiseSource = audioContext.createBufferSource();
  whiteNoiseSource.buffer = noiseBuffer;

  // Create a biquad filter to modulate the white noise into a more natural sound
  const biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.value = Math.random() * 1500 + 500; // Random frequency to vary sound
  biquadFilter.Q.value = 1; // Quality factor

  // Connect the white noise source through the filter to the audio context destination
  whiteNoiseSource.connect(biquadFilter);
  biquadFilter.connect(audioContext.destination);
  
  // Random start time for droplets
  const startTime = audioContext.currentTime + Math.random() * 2;
  // Random duration time
  const duration = Math.random() * 0.5 + 0.5;
  
  whiteNoiseSource.start(startTime);
  whiteNoiseSource.stop(startTime + duration);
};

// Create multiple droplets to simulate a babbling brook
const NUM_DROPLETS = 30; // Number of droplets to generate
for (let i = 0; i < NUM_DROPLETS; i++) {
  createWaterDroplet();
}

// Note: This implementation directly starts playing the sounds. 
// Adjust `NUM_DROPLETS` for more or less dense sound texture.
// You might also want to implement a way to stop or regulate the stream of droplets after some time, 
// or to synchronize their creation within an animation loop for a more interactive approach.
