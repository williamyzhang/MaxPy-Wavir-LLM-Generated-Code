// Start Web Audio API context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const brookNodes = []; // To keep track of all our nodes for potential future use

function createWaterDrop() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Configure the oscillator for a water drop sound
    oscillator.type = 'sine'; // A sine wave gives a more liquid sound
    oscillator.frequency.setValueAtTime(Math.random() * 500 + 200, audioCtx.currentTime); // Random frequency for variation

    // Configure the gain for fading effect
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime); // Start full volume
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1 + Math.random() * 2); // Fade out

    // Connect the oscillator to the gain node and the gain node to the context's destination (speaker)
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Remove node from array when finished
    oscillator.onended = () => {
        const index = brookNodes.indexOf(oscillator);
        if (index > -1) {
            brookNodes.splice(index, 1);
        }
    };

    brookNodes.push(oscillator); // Add to our nodes array

    return oscillator;
}

function playBrook() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const drop = createWaterDrop();
            drop.start(); // Start immediately
            drop.stop(audioCtx.currentTime + 1 + Math.random() * 2); // Stops after a random time
        }, i * 250 + Math.random() * 250); // Stagger their starts slightly for a more natural sound
    }
}

// Play the brook sound, repeating every so often for continuous effect
playBrook();
setInterval(playBrook, 5000); // Every 5 seconds start a new set of drops
