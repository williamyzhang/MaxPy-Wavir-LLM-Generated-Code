// Initialize the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a babbling brook sound
function createBabblingBrook() {
  const numberOfStreams = 5; // Number of individual noise streams to simulate
  const baseFrequency = 300; // Base frequency for the low-pass filter

  for (let i = 0; i < numberOfStreams; i++) {
    // Create a buffer with random noise
    let bufferSize = audioContext.sampleRate * Math.random() * 0.5; // Random buffer size for variation
    let buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    let data = buffer.getChannelData(0);

    // Fill the buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Create a buffer source
    let source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Create a biquad filter
    let filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    // Randomize the frequency to create variations in the streams
    filter.frequency.value = baseFrequency + Math.random() * 1000;

    // Connect the source to the filter, then the filter to the destination
    source.connect(filter);
    filter.connect(audioRegistration.destination);

    // Start playback
    source.start();
  }
}

// Call the function to play the sound
createBabblingBrook();
