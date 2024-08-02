// Assuming an existing AudioContext named audioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createWhiteNoiseNode(duration = 2) {
  const bufferSize = 2 * audioContext.sampleRate * duration;
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  let output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const whiteNoise = audioContext.createBufferSource();
  whiteNoise.buffer = noiseById;
  return whiteNoise;
}

function createBabblingBrook() {
  let nodes = [];
  for (let i = 0; i < 5; i++) {
    let whiteNoise = createWhiteNoiseNode(4); // Longer duration for a continuous sound

    let filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = Math.random() * 1000 + 500; // Randomizing between 500Hz and 1500Hz
    filter.Q.value = Math.random() * 5 + 1; // Randomizing Q factor for bandwidth variation

    let gain = audioContext.createGain();
    gain.gain.value = Math.random() * 0.5; // Vary the volume

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    nodes.push({ whiteNoise, filter, gain });

    whiteSpeed.start();
  }

  // Optional: Implement a method to stop the brook sound
  function stopBabblingBrook() {
    nodes.forEach(node => {
      node.whiteNoise.stop(audioContext.currentTime);
      // More cleanup if necessary
    });
  }
  
  return {
    stop: stopBabblingBrook
  };
}

// Start playing the babbling brook sound
const babblingBrook = createBabblingBrook();

// Call babblingBrook.stop() when you want to stop the sound
