// Initialize the AudioContext
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a bird call
function playBirdCall() {
  // Duration of each chirp in seconds
  let chirpDuration = 0.2;
  // The interval between chirps in seconds
  let intervalBetweenChirps = 0.3;
  // Number of chirps
  let numberOfChirps = 5;
  // Gain value to control the volume
  let gainValue = 0.1;
  
  for (let i = 0; i < numberOfChirps; i++) {
    // Randomize the frequency for each chirp to simulate different bird calls
    let frequency = Math.random() * 1000 + 1000; // Frequency range: 1000 Hz to 2000 Hz
    
    // Schedule each chirp based on the loop iteration
    let startTime = audioCtx.currentTime + (i * intervalBetweenChirps);
    let endTime = startTime + chirpDuration;
    
    // Create OscillatorNode for the chirp
    let oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // A sine wave for a smooth bird-like chirp
    oscillator.frequency.setValueAtTime(frequency, startTime);
    
    // Create GainNode to control the chirp's volume
    let gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(gainValue, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, endTime); // Fade out effect
    
    // Connect the oscillator to the gain node and the gain node to the AudioContext's destination
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Start and stop the oscillator
    oscillator.start(startTime);
    oscillator.stop(endTime);
  }
}

// Play the bird call
playBirdCall();
