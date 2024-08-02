// Function to create a telephone dial tone using Web Audio API
function createDialTone() {
  // Create a new audio context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Frequencies for the dial tone
  const frequencies = [350, 440];

  // Create oscillators for each frequency
  frequencies.forEach(function(frequency) {
    const oscillator = audioContext.createOscillator(); // Create oscillator for each frequency
    oscillator.type = 'sine'; // Set oscillator type to sine wave
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Set frequency

    const gainNode = audioContext.createGain(); // Create a gain node to manage the volume
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set gain (volume) to a reasonable level

    oscillator.connect(gainName); // Connect the oscillator to the gain node
    gainNode.connect(audioContext.destination); // Connect the gain node to the audio context destination

    oscillator.start(); // Start the oscillator

    // Optional: Stop the tone after a set duration (e.g., 2 seconds)
    setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
    }, 2000);
  });
}

// Call the function to play the dial tone
createDialTone();
