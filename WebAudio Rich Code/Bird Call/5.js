// Create a new AudioContext
const audioContext = new AudioContext();

// Function to play a single bird chirp
function playChirp() {
	const now = audioContext.currentTime;

	// Create an oscillator node (this will generate our sound)
	const oscillator = audioContext.createOscillator();
	// Create a gain node (this will control the volume of the sound)
	const gainNode = audioContext.createGain();

	// Configure the oscillator to a random frequency, to mimic bird variety
	oscillator.frequency.value = 1000 + Math.random() * 1000; // Frequency between 1000Hz and 2000Hz
	oscillator.type = 'sine'; // Sine wave for smooth natural sound

	// Configure the gain node to start at 0, rise, and then fall, like a chirp
	gainNode.gain.setValueAtTime(0, now);
	gainNode.gain.linearRampToValueAtTime(1, now + 0.1); // Quickly ramp up the volume
	gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.3); // And then fade out

	// Connect the oscillator to the gain node and the gain node to the output
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start and stop the oscillator to make it "chirp"
	oscillator.start(now);
	oscillator.stop(now + 0.3); // Stop after 0.3 seconds
}

// Function to play a series of chirps with random intervals
function playBirdCall() {
	const numberOfChirps = 5 + Math.floor(Math.random() * 5); // Between 5 and 9 chirps

	for (let i = 0; i < numberOfChirps; i++) {
		setTimeout(playChirp, i * 300 + Math.random() * 100);
	}
}

// Play the bird call
playBirdCall();
