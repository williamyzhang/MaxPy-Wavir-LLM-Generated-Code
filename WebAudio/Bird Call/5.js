// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create an oscillator
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // You can experiment with different types (sine, square, sawtooth, triangle)

// Frequency modulation to create a more realistic bird sound
const modulationOscillator = audioContext.createOscillator();
modulationOscillator.frequency.value = 5; // Modulation frequency
const modulationGain = audioContext.createGain();
modulationGain.gain.value = 20; // Modulation depth

// Connect the modulation oscillator to the frequency of the main oscillator
modulationOscillator.connect(modulationGain);
modulationGain.connect(oscillator.frequency);

// Set up the gain node to control the volume
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.3; // Adjust volume as needed

// Connect the oscillator to the gain node and the gain node to the destination (speakers)
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// Start the oscillators
oscillator.start();
modulationOscillator.start();

// Function to stop the bird call after a certain duration
function stopBirdCall(duration) {
	setTimeout(() => {
		oscillator.stop();
		modulationOscillator.stop();
	}, duration);
}

// Call the stopBirdCall function after a certain duration (e.g., 5 seconds)
stopBirdCall(5000); // Adjust duration as needed
