// Initialize AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function createOceanWaveSound(duration = 120) {
  // Loop to create multiple overlapping waves for a more natural sound
  for (let i = 0; i < 5; i++) {
    // Create a buffer source for noise - the raw sound of waves
    let source = audioCtx.createBufferSource();
    let buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * duration, audioCtx.sampleRate);
    let data = buffer.getChannelData(0);

    // Fill buffer with white noise
    for (let i = 0; i < buffer.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    source.buffer = buffer;

    // Create a biquad filter to simulate the underwater effect
    let biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
    biquadFilter.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + duration);

    // Connect source to filter
    source.connect(biquadFilter);

    // Gain node to control the volume, simulating wave intensity
    let gainNode = audioCtx.createGain();
    function adjustGain() {
      // Randomly adjust gain for the natural rise and fall of waves
      gainNode.gain.setValueAtTime(Math.random() * 0.5 + 0.2, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(Math.random() * 0.5 + 0.2, audioCtx.currentTime + Math.random() * 3 + 1); // Random duration for rise/fall
    }
    
    // Adjust gain every 4 seconds to simulate waves rising and falling
    setInterval(adjustGain, 4000);

    // Initially adjust gain
    adjustGain();

    // Connect filter to gain node
    biquadFilter.connect(gainNode);

    // Connect gain node to the audio context destination
    gaines
    Node.connect(audioCtx.destination);

    // Start the source playing
    source.start();

    // Loop the sound
    source.loop = true;
  }
}

// Call function to play the ocean wave sound
createOceanWaveSound();
