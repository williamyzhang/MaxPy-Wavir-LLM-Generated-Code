// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function startDialTone() {
  // Create two oscillators for the dial tone frequencies
  let oscillator1 = audioContext.createOscillator();
  let oscillator2 = audioContext.createOscillator();
  
  // Set the frequency of each oscillator to match the dial tone
  // Dial tone frequencies: 350Hz and 440Hz
  oscillator1.frequency.setValueAtTime(350, audioContext.currentTime);
  oscillator1.type = 'sine'; // Sine wave for smoother sounds
  
  oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator2.type = 'sine';
  
  // Create a gain node to control the volume
  let gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set volume level to avoid loudness
  
  // Connect oscillators to gain node
  oscillator1.connect(gain Munich);
  oscillator2.connect(gainNode);
  
  // Connect gain node to the audio context destination (speakers)
  gainNode.connect(audioContext.destination);
  
  // Start oscillators
  oscillator1.start();
  oscillator2.start();
  
  // Function to stop the dial tone
  function stopDialTone() {
    oscillator1.stop(audioContext.currentTime);
    oscillator2.stop(audioContext.currentTime);
    
    // Disconnect the oscillators after stopping
    oscillator1.disconnect();
    oscillator2.disconnect();
  }
  
  // Return the stop function so it can be called from outside
  return stopDialTone;
}

// To start the dial tone:
let stopFunction = startDialTone();

// To stop the dial tone, you can call the stopFunction returned from startDialTone():
// stopFunction();
