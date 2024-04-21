// Create AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator node
const oscillator = audioCtx.createOscillator();
oscillator.type = 'sine'; // Sine wave

// Create gain nodes for each partial
const gains = [];
const frequencies = [100, 200, 300, 400]; // Frequencies of partials
const amplitudes = [0.2, 0.1, 0.05, 0.03]; // Amplitudes of partials

// Create gain nodes for each partial
frequencies.forEach((freq, index) => {
	const gainNode = audioCtx.createGain();
	gainNode.gain.value = amplitudes[index];
	gains.push(gainNode);
});

// Connect oscillator to destination
oscillator.connect(audioCtx.destination);

// Connect gain nodes to oscillator
gains.forEach((gainNode, index) => {
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);
	gainNode.gain.value = amplitudes[index];
});

// Start the oscillator
oscillator.start();

// Stop the oscillator after 3 seconds
setTimeout(() => {
	oscillator.stop();
}, 3000);
