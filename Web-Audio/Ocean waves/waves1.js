// Step 1: Create the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create white noise
function createWhiteNoise() {
    const bufferSize = 2 * audioContext.sampleRate,
          noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
          output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    return whiteNoise;
}

// Function to create and apply an ADSR envelope
function applyEnvelope(node, audioCtx) {
    const now = audioCtx.currentTime;
    const gainNode = audioCtx.createGain();
    node.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 2); // Attack: 2 seconds
    gainNode.gain.setValueAtTime(1, now + 2 + 2); // Decay: Sustain at full volume for 2 seconds
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2 + 2 + 2); // Release: 2 seconds
    
    return gainNode;
}

// Create the white noise source
const whiteNoise = createWhiteNoise();

// Apply the ADSR envelope to the white noise
const envelopedNoise = applyEnvelope(whiteNoise, audioContext);

// Play the sound
whiteNoise.start();

// To stop the sound, for example, after 10 seconds you can use:
// setTimeout(() => whiteNoise.stop(), 10000);
