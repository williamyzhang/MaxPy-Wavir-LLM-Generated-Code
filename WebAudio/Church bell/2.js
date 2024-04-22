// Create an AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Function to create and play a church bell sound
function playChurchBell() {
	// Create a buffer source
	const bellSound = audioContext.createBufferSource();

	// Define the audio buffer (You need to load a bell sound file here)
	// For simplicity, assuming the bellSoundBuffer is already loaded
	const bellSoundBuffer = ... // Load your sound file here

		// Set the buffer to the bell sound
		bellSound.buffer = bellSoundBuffer;

	// Connect the buffer source to the audio context's destination (speakers)
	bellSound.connect(audioContext.destination);

	// Start playing the sound immediately
	bellSound.start();
}

// Example usage
playChurchBell();
