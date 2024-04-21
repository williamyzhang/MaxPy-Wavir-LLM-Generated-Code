// Create an AudioContext
const audioContext = new AudioContext();

// Function to generate a bird call
function birdCall() {
	// Create an oscillator for generating sound waves
	const oscillator = audioContext.createOscillator();
	// Create a gain node to control the volume
	const gainNode = audioContext.createGain();

	// Connect oscillator to gain node and gain node to the audio context's destination
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Set the initial frequency randomly within a range suitable for bird calls
	oscillator.frequency.value = 1000 + Math.random() * 1000; // Frequency between 1000 Hz and 2000 Hz

	// Modulate the frequency to simulate chirping
	for (let i = 0; i < 5; i++) {
		const startTime = audioContext.currentTime + i * 0.2;
		const newFreq = 1000 + Math.random() * 1000;
		oscillator.frequency.exponentialRampToValueAtTime(newFreq, startTime);
	}

	// Fade out the gain to end the call smoothly
	gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Start at full volume
	gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1); // End quietly after 1 second

	// Set the type of oscillator, 'sine' is smooth and natural sounding
	oscillator.type = 'sine';

	// Start and stop the oscillator to make the sound play
	oscillator.start(audioContext.currentTime);
	oscillator.stop(audioContext.currentTime + 1); // Stop after 1 second
}

// Trigger the bird call
birdCall();
