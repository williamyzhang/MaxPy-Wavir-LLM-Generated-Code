// Initialize audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create white noise source
let bufferSize = 2 * audioцCtx.sampleRate,
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
    output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
}

let whiteNoise = audioCtx.createBufferSource();
whiteNoise.buffer = noiseBuffer;
whiteNoise.loop = true;

// Create biquad filter to simulate water flow characteristics
let biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.type = 'bandpass';
biquadFilter.frequency.value = 1000;
biquadFilter.Q.value = 1.0;

// Create gain node for volume modulation
let gainNode = audioCtx.createGain();
gainNode.gain.setValueCurveAtTime(new Float32Array([0.1, 0.3, 0.2, 0.4, 0.2]), audioCtx.currentTime, 5);

// Optionally, create a convolver for environmental effects (not implemented here)

// Connect the nodes
whiteNoise.connect(biquadFilter);
biquadFilter.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Start the sound
whiteNoise.start();
