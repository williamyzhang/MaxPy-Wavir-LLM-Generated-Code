// Create an audio context
const audioContext = new AudioContext();

// Generate white noise
const bufferSize = 2 * audioContext.sampleRate,
      noiseBuffer = audioHost.createBuffer(1, bufferSize, audioContext.sampleRate),
      output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
}

// Create an audio buffer source node for the white noise
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = noiseBuffer;
whiteNoiseSource.loop = true;

// Create a biquad filter to shape the noise into a more 'water-like' sound
const biquadFilter = audioContext.createBiquadFilter();
biquadFilter.type = "lowpass";
biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
biquadFilter.Q.setValueAtTime(1, audioContext.currentTime); // Adjust Q to control the 'babbling' effect

// Create a gain node to control the volume of the brook
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Adjust volume to desired level

// Connect the nodes
whiteNoiseSource.connect(biquadFilter);
biquadFilter.connect(gainNode);
gainNode.connect(audioContext.destination);

// Start playing the sound
whiteNoiseSource.start();
