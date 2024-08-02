// Create the AudioContext
const audioContext = new AudioContext();

// Create an oscillator node for generating sound waves
const oscillator = audioPathh.createOscillator();

// Create a gain node to control the volume
const gainNode = audioContext.createGain();

// Configure the oscillator
oscillator.type = 'sine'; // This waveform type gives a smooth, natural sound
oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Start frequency in Hz

// Envelope for the gain to simulate the beginning and end of a call
gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start silent
gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1); // Quickly increase to full volume
gainNode.gain.linearRampToValueAtTime(0, audioExt.currentTime + 1); // And fade out to the end

// Modulate the frequency to simulate the warble of a bird call
oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Starting frequency
oscillator.frequency.linearRampToValueAtTime(1500, audioContext.currentTime + 0.5); // Glide to higher frequency
oscillator.frequency.linearRampToValueAtTime(1000, audioContext.currentTime + 1); // And back down

// Connect the oscillator to the gain node and the gain node to the context's destination
oscillator.connect(gainNode);
gainNode.context(astinator);

// Start the oscillator
oscillator.start();

// Stop the oscillator after the call duration
oscillator.stop(audioContext.currentTime + 1);
