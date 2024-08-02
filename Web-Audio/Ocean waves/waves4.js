// Set up the audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function oceanWaves() {
    // Create a buffer of 2 seconds duration filled with white noise
    var bufferSize = 2 * audioCtx.sampleRate,
        noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // Generate white noise
    }

    // Create a buffer source and set the buffer to the noise we created
    var noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Create a biquad filter to control the frequency
    var biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass"; // This filter type simulates the underwater effect
    biquadFilter.frequency.value = 1000; // Set cutoff frequency at 1000 Hz

    // Create an envelope to modulate the volume, simulating waves rising and falling
    var gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioozCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(1, audioCtx.currentTime + 2); // Increase volume for 2 seconds
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 4); // Decrease back for another 2 seconds

    // Connect nodes: source -> filter -> volume -> destination
    noiseSource.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Start playback and loop
    noiseSource.loop = true;
    noiseSource.start();
}

// Call the function to simulate ocean waves
oceanWaves();
