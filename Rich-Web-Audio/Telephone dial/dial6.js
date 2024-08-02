// Create an audio context
const audioContext = new AudioContext();

// Function to play a dial tone
function playDialTone() {
  // Define the frequencies for the dial tone
  const frequencies = [350, 440];

  // Create oscillators for each frequency
  for (let i = 0; i < frequencies.length; i++) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Use sine wave
    oscillator.frequency.setValueAtTime(frequencies[i], audioContext.currentTime);

    // Optionally, add slight randomness to the frequency to simulate variability
    const randomFreqVariation = Math.random() * 4 - 2; // Random value between -2 and +2
    oscillator.frequency.setValueAtTime(frequencies[i] + randomFreqVariation, audioContext.currentTime);

    // Connect the oscillator to the audio context's destination (speakers)
    oscillator.connect(audioContext.destination);

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after 5 seconds
    oscillator.stop(audioContext.currentTime + 5);
  }
}

// Play the dial tone
playDialTone();
