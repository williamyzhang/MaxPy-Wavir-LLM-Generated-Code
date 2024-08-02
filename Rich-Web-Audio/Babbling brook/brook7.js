// Create an instance of AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to create a single stream of 'babbling brook' sound
function createBrookSoundNode(audioContext) {
  let bufferSize = 2 * audioContext.sampleRate,
      noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
      output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1; // Generate white noise
  }
  
  let whiteNoise = audioContext.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  
  // Create a biquad filter to simulate water sound
  let biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = "lowpass";
  biquadFilter.frequency.setValueAtTime(Math.random() * 1500 + 500, audioContext.currentTime); // Randomize frequency for variation
  
  // Connect nodes
  whiteNoise.connect(biquadFilter);
  biquadFilter.connect(audioContext.destination);
  
  return whiteNoise;
}

// Create multiple streams of water sounds to enhance the babbling brook effect
function generateBabblingBrook(audioContext, numberOfStreams = 5) {
  let nodes = [];
  for (let i = 0; i < numberOfStreams; i++) {
    let node = createBrookSoundNode(audioContext);
    node.start();
    nodes.push(node);
    
    // Randomly adjust playback rate for variation among streams
    node.playbackRate.setValueAtTime(0.8 + Math.random() * 0.4, audioContext.currentTime);
    
    // Apply a slight delay to each stream for a more dynamic sound
    setTimeout(() => {
      node.connect(audioContext.destination);
    }, i * 250);
  }
  
  // Optionally, stop all streams after a certain duration
  //setTimeout(() => nodes.forEach(node => node.stop()), 10000); // stops after 10 seconds
}

// Call the function to play the babbling brook sound
generateBabblingBrook(audioCtx, 5);
