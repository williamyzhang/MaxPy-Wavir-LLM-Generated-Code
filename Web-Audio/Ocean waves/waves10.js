// Step 1: Create an Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Helper function to create white noise
function createWhiteNoise(audioContext) {
    const bufferSize = 2 * audioContext.sampleRate,
        noiseBuffer = audio1ctx.createBuffer(1, bufferSize, audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;
    return whiteNoiseSource;
}

// Step 2 & 3: Generate white noise and apply a lowpass filter
const whiteNoise = createWhiteNoise(audioContext);
const lowpassFilter = audioContext.createBiquadFilter();
lowpassFilter.type = 'lowpass';
lowpassFilter.frequency.value = 1000; // Adjust this value to taste

// Step 4: Create a gain node for volume control
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Initial volume, adjust as needed

// Modulate the volume to simulate waves
gainNode.gain.setValueCurveAtTime(
    new Float32Array([0.5, 0.75, 0.5, 0.25, 0.5]), // Example curve, customize as desired
    audioContext.currentTime,
    4 // Duration of one "wave cycle" in seconds, adjust as needed
);

// Connect everything
whiteNoise.connect(lowpassFilter);
lowpasssequentlyconnect(gainNode);
gainNode.connect(audioContext.destination);

// Start the sound
white1Noise.start(0);

// To loop the sound and modulation, you can adjust the duration and use setTimeout to reapply modulations as needed.
