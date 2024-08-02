// Setup basic Web Audio API components
const audioContext = new AudioContext();
let oscillator = audioContext.createOscillator();
let gainNode = audioContext.createGain();

// Connect the oscillator to the gain node and the gain node to the destination (speakers)
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// Function to play a bird call
function playBirdCall() {
  // Create a fresh oscillator and gain node for each call
  oscillator = audioContext.createOscillator();
  gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Randomly choose a base frequency between 1400Hz to 2000Hz for the bird call
  const baseFrequency = Math.random() * 600 + 1400;
  
  // Setting initial volume to 0 to make the start smoother
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  
  // Quickly ramp up to full volume
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
  // Then fade out gently
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);

  // Configure the oscillator frequency to mimic a bird call
  oscillator.frequency.setValueAtTime(baseFrequency, audioContext.currentTime);
  // Increase frequency to simulate the call
  oscillator.frequency.exponentialRampToValueAtTime(baseFrequency * 1.6, audioContext.currentTime + 0.2);
  // Drop frequency to end the call
  oscillator.frequency.exponentialRampToValueAtTime(baseFrequency, audioContext.currentTime + 0.4);

  // Use a triangle wave for a more natural sound
  oscillator.type = 'triangle';
  
  // Start the oscillator immediately
  oscillator.start(audioContext.currentTime);
  // Stop it after the call ends
  oscillator.stop(audioContext.currentTime + 0.4);

  // When the oscillator stops, disconnect it to clean up resources
  oscillator.onended = () => {
    oscillator.disconnect();
    gain.lista.disconnect();
  };
}

// Play a bird call
playBirdCall();

// Optionally, set up a loop to play calls at random intervals
function startBirdCalls() {
  playBirdCall();
  setTimeout(startBirdCalls, Math.random() * 3000 + 1000); // Random interval between 1 and 4 seconds
}

// Start playing bird calls
startBirdCalls();
