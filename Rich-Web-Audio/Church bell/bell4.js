// Create AudioContext
var audioContext = new AudioContext();

// Church bell sound generator function
function playChurchBell(frequency, duration) {
  const startTime = audioContext.currentTime;
  const endTime = startTime + duration;

  // Base oscillator for the fundamental frequency
  let oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Sine wave for a smooth fundamental tone
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // Gain node to control the envelope of the sound
  let gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Envelope for the bell sound (fade in and fade out)
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(1, startTime + 0.1); // quick fade in
  gainNode.gain.exponentialRampToValueAtTime(0.01, endTime); // longer fade out

  // Additional oscillators for harmonics
  let harmonics = [2, 3, 4.5]; // Harmonic frequencies as multiples of the fundamental
  let harmonicOscillators = harmonics.map((multiple) => {
    let osc = audioContext.createOscillator();
    osc.type = 'sine'; // Sine wave for smooth harmonic tones
    osc.frequency.setValueAtTime(frequency * multiple, audioContext.currentTime); // Set frequency based on harmonic multiple

    // Connect each harmonic oscillator to gainNode
    osc.connect(gainNode);

    return osc;
  });

  // Start oscillators
  oscillator.start(startTime);
  harmonicOscillators.forEach(osc => osc.start(startTime));

  // Stop oscillators after duration
  oscillator.stop(endTime);
  harmonicOscillators.forEach(osc => osc.stop(endTime));

  // Randomize parameters slightly to simulate variations
  const randomDetune = Math.random() * 20 - 10; // Random detune between -10 and +10 cents
  oscillator.detune.setValueAtTime(randomDetune, audioContext.currentTime);
  harmonicOscillators.forEach(osc => osc.detune.setValueAtTime(randomDetune, audioContext.currentTime));
}

// Play a church bell sound with a fundamental frequency of 130.81Hz (C3) for 4 seconds
playChurchBell(130.81, 4);
