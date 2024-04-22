// Create the audio context
const audioContext = new AudioContext();

// Define the fundamental frequency
const fundamentalFrequency = 220; // Frequency in Hz, A3 note

// Create a gain node (to control overall volume)
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.5; // Reduce volume to avoid clipping
masterGain.connect(audioContext.destination);

// Function to create and play an oscillator
function createOscillator(freq, gainValue) {
	let osc = audioContext.createOscillator();
	let gain = audioContext.createGain();

	osc.type = 'sine';
	osc.frequency.value = freq;
	gain.gain.value = gainValue;

	osc.connect(gain);
	gain.connect(masterGain);

	osc.start();
	return osc;
}

// Array to hold oscillators for later access (e.g., to stop them)
let oscillators = [];

// Create the fundamental oscillator
oscillators.push(createOscillator(fundamentalFrequency, 0.8));

// Create four partials using a for loop
for (let i = 1; i <= 4; i++) {
	let partialFrequency = fundamentalFrequency * (i + 1);
	let randomGain = 0.5 * Math.random(); // Randomize the gain a bit
	oscillators.push(createOscillator(partialFrequency, randomGain));
}

// Function to stop all oscillators after a certain time
function stopOscillators() {
	oscillators.forEach(osc => osc.stop(audioContext.currentTime + 1)); // Stop after 1 second
}

// Call this function to stop sounds (for example, from a button press or after a timeout)
// stopOscillators();

// If you want to automatically stop after some time
setTimeout(stopOscillators, 5000); // Stops all oscillators after 5 seconds
