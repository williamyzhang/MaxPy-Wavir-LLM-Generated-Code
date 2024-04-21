// Create an instance of the AudioContext
const audioContext = new AudioContext();

function playChurchBell() {
	// Create an oscillator node, this will generate our sound wave
	const oscillator = audioContext.createOscillator();
	// Set the type of the oscillator to 'sine' to create a smooth periodic wave
	oscillator.type = 'sine';

	// Randomly choose a fundamental frequency for the bell sound, typical church bells have lower frequencies
	const baseFrequency = 200 + Math.random() * 100; // Random frequency between 200Hz and 300Hz
	oscillator.frequency.setValueAtTime(baseFrequency, audioContext.currentTime);

	// Create a GainNode which will control the amplitude of the audio signal
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start with silence

	// Define the envelope (attack and decay)
	const attackTime = 0.1; // Quick attack
	const decayTime = 3;   // Longer decay to simulate the bell's ring fading out
	gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + attackTime); // Ramp up to full volume
	gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + attackTime + decayTime); // Then fade out

	// Connect the oscillator to the gain node
	oscillator.connect(gainNode);
	// Connect the gain node to the audio context's destination (the speakers)
	gainNode.connect(audioContext.destination);

	// Start the oscillator
	oscillator.start(audioContext.currentTime);

	// Stop the oscillator after the sound has decayed fully
	oscillator.stop(audioContext.currentTime + attackTime + decayTime + 1); // Plus one second to ensure complete decay
}

// Function to simulate multiple bell rings with slight variations in frequency
function simulateChurchBells() {
	const numberOfBells = 5; // Number of times the bell will ring
	for (let i = 0; i < numberOfBells; i++) {
		setTimeout(playChurchBell, i * 4000); // Play bell every 4 seconds
	}
}

// Start simulating the church bells
simulateChurchBells();
