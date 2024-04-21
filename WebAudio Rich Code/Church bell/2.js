// Create the audio context
const audioCtx = new AudioContext();

// Function to create a single bell strike
function createBellStrike(frequency, time) {
	const oscillator = audioCtx.createOscillator();
	const gainNode = audioCtx.createGain();

	oscillator.type = 'sine';  // Sine wave for smooth bell-like sound
	oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

	// Connect oscillator to gain node and gain node to the audio context destination
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	// Envelope for the gain to simulate the bell strike decay
	gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
	gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01); // Quick rise in volume
	gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1); // Decay

	oscillator.start(time);
	oscillator.stop(time + 2);  // Stop the oscillator after 2 seconds
}

// Function to play a series of bell strikes
function playChurchBells() {
	const baseFrequency = 440;  // Base frequency in Hz (A4 pitch)
	const numberOfStrikes = 5;

	for (let i = 0; i < numberOfStrikes; i++) {
		// Randomize the strike timing a bit to make it sound more natural
		const randomTimeOffset = Math.random() * 0.3; // up to 0.3 seconds delay
		const randomPitchOffset = Math.random() * 100 - 50; // vary pitch by +/- 50 Hz

		createBellStrike(baseFrequency + randomPitchOffset, audioCtx.currentTime + i * 1 + randomTimeOffset);
	}
}

// Start playing the church bells
playChurchBells();
