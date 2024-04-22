// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Base frequency of the fundamental sine wave
const fundamentalFrequency = 220;  // A3 note
const numPartials = 4;  // Number of partials above the fundamental

// Create an array to store oscillators and gain nodes
const oscillators = [];
const gains = [];

// Create and configure oscillators and gain nodes
for (let i = 0; i <= numPartials; i++) {
	// Create an oscillator for each partial, including the fundamental
	const oscillator = audioCtx.createOscillator();
	oscillator.type = 'sine';
	oscillator.frequency.setValueAtTime(fundamentalFrequency * (i + 1), audioCtx.currentTime);

	// Create a gain node for each oscillator
	const gain = audioCtx.createGain();
	// Randomize amplitude between 0.5 and 1 for partials, 1 for fundamental
	gain.gain.setValueAtTime(i === 0 ? 1 : Math.random() * 0.5 + 0.5, audioCtx.currentTime);

	// Connect oscillator to gain and gain to audio context destination
	oscillator.connect(gain);
	gain.connect(audioCtx.destination);

	// Start the oscillator
	oscillator.start();

	// Store oscillator and gain in arrays
	oscillators.push(oscillator);
	gains.push(gain);
}

// Example function to stop all oscillators after a certain time
function stopOscillators() {
	for (let i = 0; i < oscillators.length; i++) {
		oscillators[i].stop(audioCtx.currentTime + 2);  // Stop after 2 seconds
	}
}

// Call this function to stop oscillators later
setTimeout(stopOscillators, 5000);  // Stop all oscillators after 5 seconds
