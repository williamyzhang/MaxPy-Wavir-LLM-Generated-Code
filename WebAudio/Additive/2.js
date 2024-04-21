// Create AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to generate an oscillator node with given frequency and amplitude
function createOscillator(freq, amp) {
	const oscillator = audioCtx.createOscillator();
	const gainNode = audioCtx.createGain();

	oscillator.type = 'sine';
	oscillator.frequency.value = freq;
	gainNode.gain.value = amp;

	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	return { oscillator, gainNode };
}

// Function to play the additive synthesis
function playAdditiveSynthesis(frequencies, amplitudes) {
	const oscillators = [];

	// Create oscillators for each frequency and amplitude pair
	for (let i = 0; i < frequencies.length; i++) {
		const { oscillator, gainNode } = createOscillator(frequencies[i], amplitudes[i]);
		oscillator.start();
		oscillators.push({ oscillator, gainNode });
	}

	// Function to stop and disconnect oscillators
	function stop() {
		oscillators.forEach(({ oscillator }) => oscillator.stop());
		oscillators.forEach(({ oscillator, gainNode }) => {
			oscillator.disconnect();
			gainNode.disconnect();
		});
	}

	return { stop };
}

// Example frequencies and amplitudes
const frequencies = [440, 660, 880]; // Frequencies in Hz (A4, E5, A5)
const amplitudes = [0.5, 0.3, 0.2]; // Amplitudes (relative)

// Play the additive synthesis
const { stop } = playAdditiveSynthesis(frequencies, amplitudes);

// Stop after 3 seconds (for demonstration purposes)
setTimeout(() => {
	stop();
}, 3000);
