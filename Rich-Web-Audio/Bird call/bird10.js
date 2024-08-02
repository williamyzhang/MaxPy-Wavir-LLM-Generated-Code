// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBirdCall() {
  let startTime = audioCtx.currentTime;
  let endTime = startTime + 3; // Duration of bird call in seconds

  // Create a series of chirps
  for (let i = 0; i < 5; i++) {
    // Each chirp starts a bit after the previous
    let chirpStartTime = startTime + i * 0.5;
    let chirpEndTime = chirpStartTime + 0.2;

    // Randomize pitch to simulate different chirp types
    let freq = 1000 + Math.random() * 2000; // Frequency range between 1000Hz and 3000Hz

    // Create the oscillator for this chirp
    let oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // Sine wave is smooth and bird-like
    oscillator.frequency.setValueAtTime(freq, chirpStartTime);

    // Create an envelope to smoothly start and end the chirp
    let envelope = audioCtx.createGain();
    envelope.gain.setValueAtTime(0, chirpStartTime);
    envelope.gain.linearRampToValueAtTime(1, chirpStartTime + 0.1); // Fade in
    envelope.gain.linearRampToValueAtTime(0, chirpEndTime); // Fade out

    // Connect nodes
    oscillator.connect(envelope);
    envelope.connect(audioCtx.destination);

    // Start and stop the oscillator
    oscillator.start(chirpStartTime);
    oscillator.stop(chirpEndTime);
  }
}

// Play the bird call
playBirdCall();
