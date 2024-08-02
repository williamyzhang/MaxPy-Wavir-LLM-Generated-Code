// Step 1: Create the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create a buffer source for white noise
const bufferSize = 2 * audioContext.sampleRate,
      noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
      output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
    // Populate buffer with white noise; Math.random() produces values between 0 and 1, so we need to adjust
    // these to be between -1 and 1 to represent the full amplitude range of the audio.
    output[i] = Math.random() * 2 - 1;
}

const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = noiseBuffer;
whiteNoiseSource.loop = true;

// Step 3: Create the low-pass filter
const filter = audioContext.createBiquadFilter();
filter.type = 'lowpass'; // Setting the filter type to low-pass
filter.frequency.value = 1000; // Setting the cutoff frequency to 1000 Hz

// Step 4: Connect everything together
whiteNoiseSource.connect(filter);
filter.connect(audioContext.destination);

// Start playing the white noise
whiteNoiseSource.start(0);
