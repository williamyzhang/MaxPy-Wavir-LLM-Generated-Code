window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function createChurchBell(frequency) {
  // Bell parameters
  const attack = 0.01; // Attack time
  const decay = 1.0; // Decay time
  const sustain = 0.5; // Sustain level
  const sustainTime = 0.2; // Sustain time
  const release = 2.0; // Release time

  // Create the oscillator
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Pure tone
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // Create the gain node for the ADSR envelope
  const gainNode = audioController.createGain();
  gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start with silence
  
  // Attack
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + attack);
  // Decay to Sustain
  gainNode.gain.linearRampToValueAtTime(sustain, audioContext.currentTime + attack + decay);
  // Sustain for a bit
  gainNode.gain.setValueAtTime(sustain, audioContext.currentTime + attack + decay + sustainTime);
  // Release
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + attack + decay + sustainTime + release);

  // Connect and play the oscillator
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + attack + decay + sustainTime + release);
}

function playChurchBellSeries(times, baseFrequency) {
  for (let i = 0; i < times; i++) {
    const randomFrequencyDeviation = (Math.random() - 0.5) * 100; // Random deviation in frequency
    const strikeDelay = i * (Math.random() * 0.5 + 2); // Randomize the interval between strikes
    const frequency = baseFrequency + randomFrequencyDeviation; // Apply random deviation to base frequency
    
    setTimeout(() => {
      createChurchBell(frequency);
    }, strikeDelay * 1000); // Convert seconds to milliseconds
  }
}

// Example usage: Play 5 bell strikes around the base frequency of 600 Hz.
playChurchBellSeries(5, 600);
