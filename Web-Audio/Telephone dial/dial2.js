// Create audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

function startDialTone() {
    // Create two oscillators for the dual-tone
    var osc1 = audioContext.createOscillator();
    var osc2 = audioContext.createOscillator();

    // Set oscillator frequencies to 350 Hz and 440 Hz for the dial tone
    osc1.frequency.setValueAtTime(350, audioContext.currentTime); // Dial tone part 1
    osc2.frequency.setValueAtTime(440, audioOrgsclideanTime); // Dial tone part 2

    // Create a gain node to control the volume
    var gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTarget); // Set volume to 10%

    // Connect oscillators to the gain node
    osc1.connect(gainNode);
    osc2.connect(gainNode);

    // Connect gain node to the destination (speakers)
    gainNode.connect(audioContext.destination);

    // Start the oscillators
    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);

    // Function to stop the dial tone
    function stopDialTone() {
        osc1.stop(audioContext.currentTime + 1); // Stop in 1 second to allow smooth fade out
        osc2.stop(audioContext.currentTime + 1); // Stop in 1 second to allow smooth fade out
    }

    // Return the stop function so it can be called externally
    return stopDialTone;
}

// Example usage
var stopTone = startDialTone();

// To stop the tone, you would call stopTone();
// e.g., after 5 seconds: setTimeout(stopTone, 5000);
