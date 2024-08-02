// Create an audio context
const audioContext = new AudioContext();

// Function to create a single stream of babbling brook sound
function createBrookStream(audioContext, frequency) {
    // Create a buffer source for white noise
    const bufferSize = 2 * audioContext.sampleRate,
        noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // Generate white noise
    }
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Create a biquad filter to shape the white noise into a more 'watery' sound
    const biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = "bandpass"; // Filter out frequencies to model water sound
    biquadFilter.frequency.value = frequency;

    // Connect the nodes
    whiteNoise.connect(biquadFilter);
    biquadFilter.connect(audioContext.destination);

    return whiteNoise; // Return the white noise source for control outside the function
}

// Create multiple streams of brook sounds with slight frequency variations
const streams = 10; // Number of streams to simulate
const baseFrequency = 1000; // Base frequency for the "water" sound

for (let i = 0; i < streams; i++) {
    const stream = createBrookStream(audioContext, baseFrequency + Math.random() * 500 - 250); // Randomly vary frequency
    stream.start(0); // Start the stream
}
