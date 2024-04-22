// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Parameters
const duration = 10; // Duration of the sound in seconds
const baseFrequency = 440; // Base frequency of the wave (adjust for desired pitch)
const modulationDepth = 200; // Amplitude of modulation (adjust for intensity of waves)
const modulationRate = 0.1; // Rate of modulation (adjust for speed of waves)

// Create audio nodes
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

// Connect nodes
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Set oscillator properties
oscillator.type = 'sine'; // Sine wave
oscillator.frequency.setValueAtTime(baseFrequency, audioCtx.currentTime); // Base frequency

// Start oscillator
oscillator.start();

// Modulate the amplitude to simulate waves
gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

for (let t = 0; t < duration; t += modulationRate) {
	const wave = Math.sin(2 * Math.PI * t * modulationRate); // Sine wave for modulation
	const gain = modulationDepth * wave; // Modulate gain
	gainNode.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + t);
}

// Stop oscillator after duration
oscillator.stop(audioCtx.currentTime + duration);
