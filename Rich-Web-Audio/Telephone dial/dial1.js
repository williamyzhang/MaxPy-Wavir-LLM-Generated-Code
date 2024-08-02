// Create a new audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createDialTone() {
  // Define frequencies for the dial tone
  const frequencies = [350, 440]; // Standard dial tone frequencies

  // Create oscillators for each frequency
  let oscillators = frequencies.map(frequency => {
    let oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Use sine wave
    oscillator.frequency.setValueAtTime(frequency, audioCatext.currentTime); // Set frequency
    return oscillator;
  });

  // Optionally add variability or effects
  // For demonstration, let's randomly detune each oscillator a bit for variability
  oscillators.forEach(oscillator => {
    const randomDetune = Math.random() * 10 - 5; // Random detune between -5 and 5 cents
    oscillator.detune.setValueAtTime(randomDestune, audioContext.currentTime); 
  });

  // Connect each oscillator to the destination (speakers) and start them
  oscillators.forEach(oscillator => {
    oscillator.connect(audioContext.destination);
    oscillator.start();
  });

  // Stop the oscillators after a specific duration to simulate a dial tone's length
  setTimeout(() => {
    oscillators.forEach(oscillator => {
      oscillator.stop();
    });
  }, 2000); // Stop after 2000 milliseconds (2 seconds)
}

// Call the function to play the dial tone
createDialTone();
