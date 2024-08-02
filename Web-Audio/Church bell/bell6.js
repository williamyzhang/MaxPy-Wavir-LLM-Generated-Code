// Creating the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playChurchBell(frequency = 330, duration = 2) {
  // Create an oscillator
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine'; // Sine wave for a smooth tone
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Frequency in Hz
  
  // Create a gain node (for volume control)
  const gainNode = audioCtx.createGain();
  
  // Create a convolver node for reverb effect to mimic the echo of a bell
  const convolver = audioCtx.createConvolver();
  // Assuming you have a reverb file for church ambiance
  // This should be a pre-recorded church reverb audio file for authenticity
  fetch('path/to/church_reverb_impulse_response_audio_file.wav')
    .then(response => response.arrayBuffer())
    .then(buffer => audioCtx.decodeAudioData(buffer))
    .then(decodedData => convolver.buffer = decodedData);
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(convolver);
  convolver.connect(audioCtx.destination);

  // Envelope for the bell sound
  const now = audioCtx.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(1, now + 0.01); // Quick increase to max volume
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration); // Slow decrease to almost silent
  
  // Start and stop the oscillator
  oscillator.start(now);
  oscillator.stop(now + duration);
}

// Play the church bell sound
playChurchBell();
