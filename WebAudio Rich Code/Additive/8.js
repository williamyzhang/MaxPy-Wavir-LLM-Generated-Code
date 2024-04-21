// Set up the audio context
const audioContext = new AudioContext();

// Define the base frequency
const baseFrequency = 440;  // A4, commonly used as concert pitch (440 Hz)

// Create an array to hold the oscillators
const oscillators = [];

// Create the base oscillator for the fundamental frequency
const fundamental = audioContext.createOscillator();
fundamental.frequency.value = baseFrequency;
fundamental.type = 'sine';
oscillators.push(fundamental);

// Create partials using a for loop
for (let i = 1; i <= 4; i++) {
	const oscillator = audioContext.createOscillator();
	oscillator.frequency.value = baseFrequency * (i + 1); // i+1 to get the next harmonics
	oscillator.type = 'sine';
	oscillators.push(oscillator);
}

// Create a gain node for volume control
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.2; // Reduce the volume to avoid clipping

// Connect all oscillators to the gain node and then to the audio context's destination
oscillators.forEach(osc => {
	osc.connect(gainNode);
	gainNode.connect(audioContext.destination);
	osc.start();
});

// Optionally, stop oscillators after a set time
setTimeout(() => {
	oscillators.forEach(osc => osc.stop());
	audioContext.close();
}, 5000); // stops after 5000 ms = 5 seconds
