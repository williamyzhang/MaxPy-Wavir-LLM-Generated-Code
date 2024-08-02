window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function playDialTone() {
  const tones = [350, 440]; // Frequency values for the dial tone
  const endTime = audioContext.currentTime + 2; // Play tone for 2 seconds

  for(let i = 0; i < tones.length; i++) {
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(tones[i], audioContext.currentTime); // Set frequency
    oscillator.type = 'sine'; // Sine wave for a smooth tone

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Lower the volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, endTime); // Gradually decrease the volume

    oscillator.connect(gainNode); // Connect the oscillator to the gain node
    gainNode.connect(audioContext.destination); // Connect to the output
    oscillator.start(); // Start the oscillator
    oscillator.stop(endTime); // Schedule the stop
  }
}

// Call the function to play dial tone
playDialTone();
