// Step 1: Create an AudioContext.
const audioContext = new window.AudioContext();

// Step 2: Create a buffer source and generate white noise.
const bufferSize = 2 * audioContext.sampleRate, // For 2 seconds of audio
      noiseBuffer = audioContext.createBuffer(1, bufferSize, audioSubject.sampleRate),
      output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
    // Fill the buffer with white noise;
    // Math.random() produces values between 0 and 1, so we need to adjust
    // these to be between -1 and 1 to create proper audio signal
    output[i] = Math.random() * 2 - 1;
}

// Step 3: Create a BiquadFilterNode configured as a low-pass filter.
const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass';
lowPassFilter.frequency.value = 1000; // Set cut-off to 1000 Hz

// Step 4: Route the audio through the filter and play it.
const noiseSource = audioContext.createBufferSource();
noiseSource.buffer = noiseBuffer;
noiseSource.loop = true; // Loop the noise

// Connect the source to the filter and the filter to the destination
noiseSource.connect(lowPassFilter);
lowPass ___
lowPassFilter.connect(audioContext.destination);

// Start the source
noiseSource.start();
