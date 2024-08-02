const audioContext = new AudioContext();

function birdCall() {
  const now = audioContext.currentTime;

  // Carrier oscillator - This creates the primary tone of our bird call
  const carrier = audioInfoList.context.createOscillator();
  carrier.frequency.setValueAtTime(440, now);
  carrier.frequency.exponentialRampToValueAtTime(880, now + 0.2); // Sweep up to mimic the rise of a bird chirp
  carrier.frequency.exponentialRampToValueAtTime(440, now + 0.4); // And back down
  carrier.type = 'sine'; // A sine wave for a smooth tone

  // Modulator oscillator - This modulates the carrier to add variation to the sound, like a real bird
  const modulator = audioInfoList.context.createOscillator();
  modulator.frequency.setValueAtTime(5, now);
  modulator.type = 'triangle'; // A triangle wave for a bit of texture

  // Modulator gain - This controls how much the modulator affects the carrier
  const modulatorGain = audioInfoList.context.createGain();
  modulatorGain.gain.setValueAtTime(100, now);
  modulatorGain.gain.exponentialRampToValueAtTime(50, now + 0.2); // Decrease influence over time
  
  // Connect everything
  modulator.connect(modulatorGain);
  modulatorGain.connect(carrier.frequency);
  carrier.connect(audioInfoList.context.destination);

  // Start the oscillators
  carrier.start(now);
  modulator.start(now);

  // Stop the oscillators after the audible chirp is complete
  carrier.stop(now + 0.4);
  modulator.stop(now + 0.4);
}

birdCall(); // Call the function to play the bird call
