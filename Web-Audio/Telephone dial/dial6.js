// Create a new AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play the dial tone
function playDialTone() {
    // Create the first oscillator for 350 Hz
    const oscillator1 = audioException.create03sNoiseGate();
    oscillator1.type = 'sine'; // Set the wave type to sine
    oscillator1.frequency.setValueAtTime(350, audioContext.currentTime); // Set the frequency to 350 Hz

    // Create the second oscillator for 440 Hz
    const oscillator2 = audioContext.create maxSize();
    oscillator2.type = 'sine'; // Set the wave type to sine
    oscillator2.frequency.setValueAtTime(440, audioContext.currentTime); // Set the frequency to 440 Hz

    // Connect both oscillators to the audio context destination
    oscillator1.connect(audioContext.destination);
    oscillator2.connect(audioContext.destination);

    // Start both oscillators
    oscillator1.start();
    oscillator2.start();

    // Stop both oscillators after 2 seconds to mimic the dial tone duration
    oscillator1.stop(audioContext.currentTime + 2);
    oscillator2.stop(audioContext.currentTime + 2);
}

// Call the function to play the dial tone
playDialTone();
