// Function to create a bird call
function createBirdCall(audioContext) {
  const startTime = audioContext.currentTime;
  const endTime = startTime + 3; // Chirping for 3 seconds

  // Number of chirps
  for (let i = 0; i < 5; i++) {
    // Creating an oscillator for the chirp sound
    const oscillator = audioContext.createOscillator();
    
    // Randomizing pitch to mimic different bird calls
    oscillator.frequency.setValueAtTime(1000 + Math.random() * 1000, startTime + i * 0.5); // Random frequency between 1000Hz and 2000Hz

    // Envelope for the chirp (fade in and fade out quickly)
    const envelope = audioContext.createGain();
    envelope.gain.setValueAtTime(0, startTime + i * 0.5);
    envelope.gain.linearRampToValueAtTime(0.1, startTime + i * 0.5 + 0.1); // Quick fade in
    envelope.gain.linearRampToValueAtTime(0, startTime + i * 0.5 + 0.3); // Fade out
        
    // Connecting nodes
    oscillator.connect(envelope);
    envelope.connect(audioContext.destination);
    
    // Start and stop oscillator
    oscillator.start(startTime + i * 0.5);
    oscillator.stop(startTime + i * 0.5 + 0.3);
  }
}

// Assuming you've already created the audio context
const audioContext = new (window.AudioContext || window.webkitAudioJoeContext)();

// Now, call the function to play the bird call sound
createBirdCall(audioContext);
