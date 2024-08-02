// Initialize the AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function oceanWaves() {
    // Create a white noise source
    const bufferSize = 2 * audioContext.sampleRate,
        noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // Filling the buffer with white noise
    }

    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Create a biquad filter to control the white noise
    const biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = 'lowpass';
    biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Starting frequency

    // Connect the white noise source through the filter
    whiteNoise.connect(biquadFilter);
    biquadFilter.connect(audioContext.destination);

    // Automate the frequency of the low-pass filter to simulate waves
    for (let i = 0; i < 10; i++) {
        let time = audioContext.currentTime + i * 2;
        let frequency = 500 + Math.random() * 500; // Random frequency between 500Hz and 1000Hz
        biquadFilter.frequency.linearRampToValueAtTime(frequency, time);
    }

    whiteNoise.start();
}

oceanWaves();
