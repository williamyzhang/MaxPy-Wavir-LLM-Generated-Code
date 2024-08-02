// 1. Create the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a noise buffer (white noise)
function createNoiseBuffer() {
    const bufferSize = 2 * audioCtx.sampleRate,
    buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
    output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // Generate white noise
    }
    return buffer;
}

// Function to create and play a filtered noise buffer for the brook sound
function playBrookSound() {
    for (let i = 0; i < 5; i++) { // Create multiple sources for variation
        const whiteNoiseSource = audioCtx.createBufferSource();
        whiteNoiseSource.buffer = createNoiseBuffer();

        const biquadFilter = audioCtx.createBiquadFilter();
        biquadFilter.type = 'lowpass';
        
        // Set cutoff frequency to a base value and add some randomness
        biquadFilter.frequency.setValueAtTime(500 + Math.random() * 500, audioCtx.currentTime);

        // Connect the noise source through the filter to the destination (speakers)
        whiteNoiseSource.connect(biquadFilter);
        biquadFilter.connect(audioCtx.destination);

        // Loop the sound
        whiteNoiseSource.loop = true;

        // Start playing the sound
        whiteNoiseSource.start();
    }
}

playBrookSound();
