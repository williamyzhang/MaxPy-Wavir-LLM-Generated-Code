// Create a new audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create filtered noise resembling water flowing
function createWaterFlow() {
    const bufferSize = 4096;
    let node = audioCtx.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
        let output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            // Generate white noise
            output[i] = Math.random() * 2 - 1;
        }
    };

    // Create a biquad filter to simulate water flow effect
    let biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
    biquadFilter.Q.setValueAtTime(1, audioCtx.currentTime); // Adjust Q to taste
    
    node.connect(biquadFilter);
    biquadFilter.connect(audioCtx.destination);
    return biquadFilter;
}

// Function to create bubbling sounds
function createBubble() {
    let oscillator = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(Math.random() * 300 + 100, audioCtx.currentTime); // Random frequency for variation
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); // Initial volume
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5); // Fade out
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.5);
}

// Start the water flow sound
createWaterFlow();

// Occasionally generate bubbles
setInterval(function() {
    if (Math.random() > 0.7) { // Adjust probability to control bubble frequency
        createBubble();
    }
}, 500); // Check every 500 milliseconds
