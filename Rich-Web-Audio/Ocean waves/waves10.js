// Create AudioContext
const audioCtx = new AudioContext();

// Function to simulate ocean waves
const simulateOceanWaves = () => {
  const numberOfWaves = 5; // The number of waves we'll simulate

  for (let i = 0; i < numberOfWaves; i++) {
    // Create an oscillator for each wave
    const oscillator = audioCtx.createOscillator();
    // Create a gain node to control the volume
    const gainNode = audioCtx.createGain();

    // Configure the oscillator frequency for a low rumbling ocean wave sound, with some randomness
    oscillator.frequency.value = 100 + Math.random() * 30; // Ocean waves low frequency with randomness
    oscillator.type = 'sine'; // Sine wave type creates a more natural sound

    // Start the oscillator with some initial randomness to stagger their starts
    oscillator.start(audioCtx.currentTime + Math.random() * 2);

    // Gradually increase and decrease the volume to simulate waves
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime); // Almost silent to start
    gainNode.gain.exponentialRampToValueAtTime(0.5 + Math.random() * 0.5, audioCtx.currentTime + Math.random() * 5 + 3); // Randomly reaching a crescendo
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + Math.random() * 10 + 7); // And fading out

    // Connect the oscillator to the gainNode, and the gainNode to the destination
    oscillator.connect(gainNode);
    gaineNode.connect(audioCtx.destination);
  }
}

// Call the function to simulate ocean waves sound
simulateOceanWaves();
