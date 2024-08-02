// Function to create a church bell sound
function playChurchBell(audioContext) {
  const now = audioContext.currentTime;

  // Create oscillators for harmonic content
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const oscillator3 = audioContext.createOscillator();
  
  // Frequencies for a rich bell sound - fundamental and harmonics
  oscillator1.frequency.value = 520; // Fundamental frequency
  oscillator2.frequency.value = 520 * 2; // Second harmonic
  oscillator3.frequency.value = 520 * 3; // Third harmonic

  // Set the type of the oscillator
  oscillator1.type = 'sine';
  oscillator2.type = 'sine';
  oscillator3.type = 'sine';

  // Create a gain node to control the volume
  const gainNode = audioContext.createGain();

  // Initial gain (volume) is zero
  gainNode.gain.value = 0;

  // Connect oscillators to gain node
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  oscillator3.connect(gainNode);

  // Connect gain node to the audio context's destination (speakers)
  gainNode.connect(audioContext.destination);

  // Envelope for the bell sound
  // Attack
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(1, now + 0.1); // Quick rise to full volume
  // Decay
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 3); // Slow decay

  // Start the oscillators
  oscillator1.start(now);
  oscillator2.start(now);
  oscillator3.start(now);

  // Stop the oscillators after the sound has decayed
  oscillator1.stop(now + 3.1);
  oscillator2.stop(now + 3.1);
  oscillator3.stop(now + 3.1);
}

// Usage
// Assuming you have an instance of AudioContext named 'audioContext'
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
playChurchBell(audioContext);
