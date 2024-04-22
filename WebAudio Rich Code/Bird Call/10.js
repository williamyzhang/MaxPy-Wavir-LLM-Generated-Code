const audioContext = new AudioContext();
function birdCall() {
	const oscillator = audioContext.createOscillator();
	oscillator.type = 'sine'; // Bird calls often have a clear, pure tone

	// Starting frequency of the bird call
	let startFrequency = 1000 + Math.random() * 1000; // Randomize start between 1000 Hz to 2000 Hz
	oscillator.frequency.setValueAtTime(startFrequency, audioContext.currentTime);

	// Create frequency changes to mimic natural variations in a bird call
	for (let i = 1; i <= 5; i++) {
		let time = audioContext.currentTime + i * 0.1; // Increment time for each chirp
		let newFrequency = startFrequency + Math.random() * 500 - 250; // Random modulation
		oscillator.frequency.exponentialRampToValueAtTime(newFrequency, time);
	}

	// Connect the oscillator to the destination (speakers)
	oscillator.connect(audioContext.destination);
	oscillator.start();

	// Stop the oscillator after 1 second
	oscillator.stop(audioContext.currentTime + 1);
}
// Example of triggering the function directly
birdCall();

// To use with a button, you can add this in the HTML:
// <button onclick="birdCall()">Make Bird Call</button>
