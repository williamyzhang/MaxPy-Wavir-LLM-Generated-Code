// First, create an AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function ringBell(frequency, duration) {
  // Create OscillatorNode
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'square'; // A square wave gives a more bell-like sound
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Frequency in Hertz
  
  // Create GainNode to control the volume
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(1, audioCtx.currentTime); // Start at full volume
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  // Gradually decrease the volume to mimic the bell's decay
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  
  // Start and stop the oscillator to play the sound
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + duration);
}

function simulateChurchBell() {
  const baseFrequency = 280; // Base frequency for a bell-like sound
  const numberOfRings = 5 + Math.floor(Math.random() * 3); // Randomize the number of bell rings between 5 and 7
  
  for (let i = 0; i < numberOfRings; i++) {
    const randomDelay = Math.random() * 2; // Random delay between 0 and 2 seconds
    const ringDuration = 2 + Math.random(); // Randomize the duration of each ring between 2 and 3 seconds
    const frequencyVariation = Math.random() * 100 - 50; // Random frequency variation between -50 and 50
    const frequency = baseFrequency + frequencyVariation;
    
    // Use setTimeout to apply the random delay
    setTimeout(() => {
      ringBell(frequency, ringDuration);
    }, i * 2000 + randomurosDelay * 1000); // Sequentially space the rings out by at least 2 seconds
  }
}

// Call the simulateChurchBell function to start the simulation
simulateChurchBell();
