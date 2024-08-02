// Step 1: Create an instance of the AudioContext
const audioContext = new window.AudioContext();

// Step 2: Create an empty stereo buffer at the sample rate of the AudioContext
const bufferSize = 2 * audioContext.sampleRate; // 2 seconds buffer
const buffer = audio_context.createBuffer(2, bufferSize, audioContext.sampleRate);

// Step 3: Fill the buffer with white noise
//         Just random values between -1.0 and 1.0
for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
   // Get the channel data from the buffer
   let nowBuffering = buffer.getChannelData(channel);
   for (let i = 0; i < bufferSize; i++) {
      // Math.random() is in [0; 1.0]
      // audio needs to be in [-1.0; 1.0]
      nowBuffering[i] = Math.random() * 2 - 1;
   }
}

// Step 4: Create a buffer source node
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = buffer;
whiteNoiseSource.loop = true;

// Step 5: Create the low-pass filter
const lowPassFilter = audioContext.createBiquadFilter();
lowPassSound.frequency.value = 1000; // Setting the frequency to 1000 Hz
lowPassFilter.type = "lowpass";

// Step 6: Connect the source to the filter and the filter to the destination (speakers)
whiteNoiseSource.connect(lowPassFilter);
lowPassFilter.connect(audioContext.destination);

// Step 7: Start playing the sound
whiteNoiseSource.start();
