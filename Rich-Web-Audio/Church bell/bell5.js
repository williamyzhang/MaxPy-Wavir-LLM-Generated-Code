// Define the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to play the church bell sound
function playChurchBell(frequency = 260) { // 260 Hz as a starting point for our fundamental frequency
  const gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  
  // Envelope for the gain to model the strike and decay of a bell
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1); // Quick rise for the strike
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3); // Exponential decay
  
  // Using multiple oscillators for a richer bell sound
  for (let i = 1; i <= 5; i++) {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    
    // Create harmonic frequencies with some randomness
    oscillator.frequency.setValueAtTime(frequency * i * (1 + Math.random() * 0.02), audioCtx.currentTime); // Slight detune for realism
    
    oscillator.connect(gainNode);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 3); // Stop after 3 seconds, matching the gain envelope
  }
}

// Play the church bell
playChurchBell();
