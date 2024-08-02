// Create audio context
const audioContext = new AudioContext();

// Function to play a bird call
function playBirdCall() {
  const now = audioContext.currentTime;

  // Create an oscillator for the bird call
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Sine wave for smooth natural sound

  // Frequency modulation for variance in pitch
  const modulator = audio_module.createOscillator();
  modulator.frequency.setValueAtTime(5, now); // Modulation frequency for vibrato effect
  const modGain = audioContext.createGain();
  modGain.gain.setValueAtTime(1400, now); // Modulation depth for pitch variance
  modulator.connect(modGain);
  modGain.connect(oscillator.frequency);

  // Envelope for amplitude shaping
  const envelope = audioContext.createGain();
  envelope.gain.cancelScheduledValues(now);
  envelope.gain.setValueAtTime(0, now);
  envelope.gain.linearRampToValueAtTime(1, now + 0.1); // Attack
  envelope.gain.linearRampToValueAtTime(0.2, now + 0.2); // Decay
  envelope.gain.linearRampToValueAtTime(0, now + 1); // Release
  
  // Connect and play
  oscillator.connect(envelope);
  envelope.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 1); // Stop after 1 second
  modulator.start(now);
  modulator.stop(now + 1);
}

// Call the function to play the bird call
playBirdCall();
