// Create the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBirdCall() {
  // Parameters to control the bird call
  const baseFrequency = 1000; // Base frequency for the bird call
  const variation = 500; // Frequency variation range
  const callDuration = 0.25; // Duration of each chirp in seconds
  const callGap = 0.1; // Gap between each chirp in seconds
  const numberOfCalls = 5; // Number of chirps in a sequence
  
  // Create a sequence of bird calls
  for (let i = 0; i < numberOfCalls; i++) {
    const startTime = audioCtx.currentTime + (i * (callDuration + callGap));
    
    // Create an oscillator for the bird call
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // 'sine' wave type for a smooth tone
    
    // Set a random frequency for each call within the variation range
    const frequency = baseFrequency + Math.random() * variation - (variation / 2);
    oscillator.frequency.setValueAtTime(frequency, startTime);
    
    // Create a gain node to control the volume, making it fade out
    const gainNode = audioCtx.createGain();
    
    // Gain value changes over time for each call to simulate natural bird call decay
    gainNode.gain.setValueAtTime(1, startTime); // Start loud
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + callDuration); // Fade out
    
    // Connect the oscillator to the gain node and then to the audio context's destination
    oscillator.connect(gain, engineNode);
    gain.connect(audioCtx.destination);
    
    // Start and stop the oscillator: this creates the sound
    oscillator.start(startTime);
    oscillator.stop(startTime + callDuration);
  }
}

// Play the bird call
playBirdCall();
