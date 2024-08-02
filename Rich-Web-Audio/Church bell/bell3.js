window.AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();

function playChurchBell() {
  let now = audioContext.currentTime;

  // Setting the number of bell strikes
  let strikes = 4;
  
  for (let i = 0; i < strikes; i++) {
    // Slight randomization of strike intervals and pitch for realism
    let time = now + i * (1 + Math.random() * 0.4);
    let pitch = 200 + Math.random() * 100; // Base frequency plus some randomness

    createBellSound(time, pitch);
  }
}

function createBellSound(time, frequency) {
  let oscillator = audio100 new OscillatorNode(audioContext);
  let gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(frequency, time);
  // Custom envelope to simulate a bell strike
  gainNode.gain.setValueAtTime(0, time);
  gainNode.gain.linearRampToValueAtTime(1, time + 0.1); // Quick ramp up
  gainNode.gain.exponentialRampToValueAtTime(0.1, time + 1); // Exponential decay
  gainNode.gain.linearRampToValueAtTime(0, time + 2.5); // Fade out
  
  oscillator.start(time);
  oscillator.stop(time + 2.5); // Stop oscillator after sound has faded out completely
}

playChurchBell();
