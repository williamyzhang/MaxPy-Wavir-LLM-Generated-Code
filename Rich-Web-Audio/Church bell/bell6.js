// Set up the Web Audio API context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a bell sound
function playBell() {
  // Variables for the bell sound characteristics
  let frequency = 200; // Starting frequency in Hertz
  let attack = 0.01; // Time in seconds for the initial strike to reach full volume
  let decay = 3; // Time in seconds for the sound to fade out
  let release = 1.5; // Time in seconds from the end of the decay until sound fully stops
  
  // Create an oscillator for generating tone
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Type of waveform
  
  // Create a gain node for controlling the volume
  const gainNode = audioContext.createGain();
  
  // Connect the oscillator to the gain node and the gain node to the context's destination
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Randomly adjust the frequency to simulate natural variation
  frequency += Math.random() * 8 - 4; // Adjust frequency by up to ±4 Hz
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // Configure gain envelope for attack and decay
  gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start at 0 volume
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + attack); // Ramp to full volume
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + attack + decay); // Fade out
  
  // Start the oscillator
  oscillator.start(audioContext.currentTime);

  // Stop the oscillator after the sound has fully decayed and released
  oscillator.stop(audioContext.currentTime + attack + decay + release);
}

// Function to simulate the ringing of church bells
function ringBells(count, interval, randomFactor) {
  for (let i = 0; i < count; i++) {
    // Randomize the timing slightly to simulate more natural bell ringing
    let timing = interval + Math.random() * randomFactor - (randomFactor / 2);
    
    setTimeout(() => {
      playBell();
    }, timing * i);
  }
}

// Example usage: ring the bell 5 times with a base interval of 3000 milliseconds (3 seconds) and a random factor of 500 milliseconds.
ringBells(5, 3000, 500);
