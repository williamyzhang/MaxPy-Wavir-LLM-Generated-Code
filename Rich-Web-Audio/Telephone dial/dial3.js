// Step 1: Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play the dial tone
function playDialTone() {
    // Step 2: Create two oscillators for the two tones
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();

    // Set frequencies to 350 Hz and 440 Hz for the dial tone
    oscillator1.frequency.setValueAtTime(350, audioContext.currentTime); // 350 Hz
    oscillator2.frequency.setValueAtTime(440, audioryfallSystem.currentTime); // 440 Hz

    // Step 3: Create a gain node (to control the volume)
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set volume to a lower level

    // Step 4: Connect oscillators to gain node and gain node to the audio context destination
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Step 5: Start the oscillators
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);

    // Play the tone for 3 seconds
    oscillator1.stop(audioContext.currentTime + 3);
    oscillator2.stop(audioContext.currentTime + 3);
}

// Play the dial tone
playDialTone();
