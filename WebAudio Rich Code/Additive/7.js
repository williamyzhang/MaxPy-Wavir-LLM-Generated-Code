// Create audio context
const audioContext = new AudioContext();

// Define the fundamental frequency
const fundamentalFreq = 440; // A4 note

// Create an array to hold oscillators
let oscillators = [];

// Create and setup oscillators for the fundamental and four partials
for (let i = 1; i <= 5; i++) {
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // sine wave
	oscillator.frequency.setValueAtTime(fundamentalFreq * i, audioContext.currentTime); // multiply frequency by i for partials
	
	// Create a gain node for controlling the amplitude
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(1.0 / i + Math.random() * 0.1, audioContext.currentTime); // decreasing amplitude with random variance

	// Connect oscillator to gain node and then to the audio context's destination
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start();

	// Add to oscillators array
	oscillators.push(oscillator);
}

// Stop all oscillators after 2 seconds
setTimeout(() => {
	oscillators.forEach(osc => {
		osc.stop();
		osc.disconnect(); // Clean up
	});
}, 2000); // Play for 2 seconds