// Setup basic Web Audio API components
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function birdCall() {
  // Set the basic frequency for the bird call - this can be adjusted
  let baseFrequency = 1400; // This frequency can make a chirping sound

  // Create a 'chirp' - a single sound of a bird call
  function chirp() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Connect the oscillator to the gain node and the gain node to the destination
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Randomly adjust the frequency for each chirp to vary the bird call
    oscillator.frequency.value = baseFrequency + Math.random() * 100 - 50;
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);

    // We'll use a triangle wave for a more 'natural' sound
    oscillator.type = 'triangle';

    // Start the oscillator and then stop after making the chirp sound
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.1);

    // When the oscillator stops, disconnect it to free up resources
    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }

  // Create a sequence of chirps to form a more complex bird call pattern
  for (let i = 0; i < 5; i++) {
    // Use setTimeout to add variability to the timing of each chirp
    setTimeout(() => {
      chirp();
      // Randomize the delay for the next chirp to make the pattern less regular
    }, i * 200 + Math.random() * 100);
  }
}

// Start bird call
birdCall();

// Optionally, you could trigger the bird call in response to an event, like a button press
document.getElementById('birdCallBtn').addEventListener('click', birdCall);
