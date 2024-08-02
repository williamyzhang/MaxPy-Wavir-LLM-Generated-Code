// Define the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create white noise
function createWhiteNoise() {
    const bufferSize = 2 * audioContext.sampleRate,
          noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
          output = noiseBuffer.getChannelData(0);
    for(let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;
    return whiteNoiseSource;
}

// Create a biquad filter to shape the noise into ocean wave sound
function createWaveShaperFilter() {
    const biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime); // Start with a higher frequency
    biquadFilter.Q.setValueAtTime(1, audioContext.currentTime); // Shape the quality factor
    return biquadFilter;
}

// Modulate the filter to mimic the ebb and flow of ocean waves
function modulateWaveShape(biquadFilter) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(0.25, audioContext.currentTime); // Oscillate slowly to mimic wave motion
    
    const oscillatorGain = audioContext.createGain();
    oscillatorGain.gain.setValueAtTime(500, audioContext.currentTime); // Control the depth of the modulation
    
    oscillator.connect(oscillatorGain);
    oscillatorGain.connect(biquadFilter.frequency);
    
    oscillator.start();
}

// Putting it all together to create the ocean waves sound
function createOceanWavesSound() {
    const whiteNoiseSource = createWhiteSource(); // createWhiteNoise() - william
    const waveShaperFilter = createWaveShaperFilter();
    modulateWaveShape(waveShaperFilter);
    
    whiteNoiseSource.connect(waveShaperFilter);
    waveShaperFilter.connect(audioContext.destination);
    
    whiteNoiseSource.start();
}

createOceanWavesSound();
