// Function to create a bird call sound
function createBirdCall(audioContext) {
  const gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = 0.1; // Reduce the volume to avoid harsh sounds

  // Function to play a single chirp
  const playChirp = (frequency) => {
    const osc = audioContext.createOscillator();
    osc.frequency.value = frequency;
    osc.type = 'sine'; // Sine wave for a more natural bird-like sound
    osc.connect(gainNode);
    osc.start();
    osc.stop(audioContext.currentTime + 0.1); // Short chirp duration
  };

  // Generate a series of chirps with random frequencies and intervals
  for (let i = 0; i < 10; i++) {
    const frequency = Math.random() * 1000 + 500; // Frequency between 500 and 1500 Hz
    const startTime = Math.random() * 0.5; // Start times between now and the next 0.5 seconds
    setTimeout(() => {
      playChirp(frequency);
    }, startTime * 1000);
  }
}

// Example usage:
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
createBirdCall(audioContext);
