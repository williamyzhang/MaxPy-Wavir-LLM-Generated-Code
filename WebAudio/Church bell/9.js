// Create audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playBell() {
	// Create an oscillator
	const bell = audioContext.createOscillator();

	// Set the type of oscillator to "sine" wave
	bell.type = 'sine';

	// Set the frequency for the bell sound
	const frequency = 400; // You can adjust this to get different pitches

	// Set the frequency value
	bell.frequency.setValueAtTime(frequency, audioContext.currentTime);

	// Create an envelope for the sound (attack, decay, sustain, release)
	const envelope = audioContext.createGain();
	envelope.gain.setValueAtTime(0, audioContext.currentTime);
	envelope.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1); // Attack
	envelope.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.5); // Decay
	envelope.gain.setValueAtTime(0.5, audioContext.currentTime + 1); // Sustain
	envelope.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2); // Release

	// Connect the oscillator to the envelope and the envelope to the destination (speakers)
	bell.connect(envelope);
	envelope.connect(audioContext.destination);

	// Start the oscillator
	bell.start();

	// Stop the oscillator after the release time
	bell.stop(audioContext.currentTime + 2);
}