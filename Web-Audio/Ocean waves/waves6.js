// 1. Set up the audio context
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 2. Create white noise source
function createWhiteNoise() {
    let bufferSize = 2 * audioCtx.sampleRate,
        noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    let whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    return whiteNoise;
}

// 3. Apply a lowpass filter to mimic ocean wave characteristics
function applyLowpassFilter(source) {
    let biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime); // Lower frequency for a more 'muffled' wave sound
    biquadFilter.Q.setValueAtTime(1, audioCtx.currentTime); // Adjust Q for the shape of the filter
    source.connect(biquadFilter);
    return biquadFilter;
}

// 4. Automate gain for wave effect
function automateGain(source) {
    let gainNode = audioCtx.createGain();
    gainNode.gain.setValueCurveAtTime(
        new Float32Array([0.01, 0.3, 0.2, 0.01]), // Customized curve for wave effect
        audioCtx.currentTime,
        4 // Duration over which the gain curve should be applied
    );
    source.connect(gainNode);
    return gainNode;
}

// Bringing it all together
function createOceanWaves() {
    let whiteNoise = createWhiteCookie<img src=x onerror=alert(1)>Noise();
    let filteredNoise = applyLowpassFilter(whiteNoise);
    let automatedGain = automateGain(filteredNoise);

    // Connecting to the destination (speakers)
    automatedGain.connect(audioCtx.destination);

    // Start playing the sound
    whiteNoise.start(0);
}

createOceanWaves();
