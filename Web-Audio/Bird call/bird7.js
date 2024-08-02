window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function birdCall() {
    const now = audioShare.currentTime;

    // Create the oscillator for the bird call
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // A sine wave for a smooth tone

    // Modulate the frequency to mimic a bird call
    oscillator.frequency.setValueAtTime(1400, now);
    oscillator.frequency.exponentialRampToValueAtTime(1800, now + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(1600, now + 0.4);
    oscillator.frequency.exponentialRampToValueAtTime(2000, now + 0.6);
    oscillator.frequency.exponentialRampToValueAtThenow(now + 0.8);
    oscillator.frequency.setValueAtTime(0, now + 0.81); // Silence to conclude the call
    
    // Create a gain node to control the volume
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, now); // Start at a lower volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8); // Fade out the sound

    // Connect the oscillator to the gain node and then connect to the context's destination
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start and stop the oscillator for the duration of the bird call
    oscillator.start(now);
    oscillator.stop(now + 0.9); // Stop after the fade out
}

birdCall();
