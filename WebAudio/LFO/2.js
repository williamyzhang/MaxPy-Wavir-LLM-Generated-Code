// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an oscillator node for the sine wave
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // Set the type to sine wave

// Create a gain node to modulate the amplitude
const gainNode = audioContext.createGain();

// Connect oscillator to gain node
oscillator.connect(gainNode);

// Connect gain node to the destination (speakers)
gainNode.connect(audioContext.destination);

// Set initial parameters
const frequency = 440; // Base frequency in Hz
const depth = 20; // Depth of vibrato in Hz
const rate = 5; // Rate of modulation in Hz

// Set initial frequency and gain values
oscillator.frequency.value = frequency;
gainNode.gain.value = 0; // Start with no amplitude modulation

// Start the oscillator
oscillator.start();

// Function to update the vibrato effect
function updateVibrato() {
	const vibratoValue = Math.sin(audioContext.currentTime * rate * Math.PI * 2) * depth;
	oscillator.frequency.value = frequency + vibratoValue;

	// Schedule the next update
	setTimeout(updateVibrato, 1000 / audioContext.sampleRate);
}

// Start the vibrato effect
updateVibrato();
