// Create an audio context
const audioContext = new AudioContext();

function playBell() {
	// Create an oscillator node, which generates waveforms
	const oscillator = audioContext.createOscillator();
	// Create a gain node to control the volume
	const gainNode = audioContext.createGain();

	// Connect the oscillator to the gain node and the gain node to the destination (speakers)
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Configure the oscillator type and frequency
	oscillator.type = 'sine'; // Sine wave for a smooth tone
	// Randomize the frequency a little to simulate a real bell
	const baseFrequency = 440; // Standard A note
	const randomOffset = (Math.random() - 0.5) * 100; // Randomly alter the pitch by up to 50 Hz
	oscillator.frequency.setValueAtTime(baseFrequency + randomOffset, audioContext.currentTime);

	// Configure the gain (volume) to create a quick decay effect
	gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Start loud
	gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5); // Decay quickly

	// Start the oscillator
	oscillator.start(audioContext.currentTime);
	// Stop the oscillator after 1.5 seconds
	oscillator.stop(audioContext.currentTime + 1.5);
}

// Attach the function to an event (e.g., button click)
document.addEventListener('DOMContentLoaded', function () {
	const bellButton = document.createElement('button');
	bellButton.textContent = 'Ring Bell';
	bellButton.onclick = playBell;
	document.body.appendChild(bellButton);
});
