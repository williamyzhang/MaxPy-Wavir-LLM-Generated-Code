// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator nodes for the two tones
const oscillator1 = audioContext.createOscillator();
const oscillator2 = audioContext.createOscillator();

// Set the frequencies for the two tones (697Hz and 1209Hz)
oscillator1.frequency.value = 697;
oscillator2.frequency.value = 1209;

// Create gain nodes to control the volume of the two tones
const gainNode1 = audioContext.createGain();
const gainNode2 = audioContext.createGain();

// Set initial gain values
gainNode1.gain.value = 0.5; // Adjust volume as necessary
gainNode2.gain.value = 0.5;

// Connect oscillator nodes to gain nodes
oscillator1.connect(gainNode1);
oscillator2.connect(gainNode2);

// Connect gain nodes to the destination (audio output)
gainNode1.connect(audioContext.destination);
gainNode2.connect(audioContext.destination);

// Start oscillators
oscillator1.start();
oscillator2.start();

// Stop oscillators after a certain duration (e.g., 2 seconds)
setTimeout(() => {
	oscillator1.stop();
	oscillator2.stop();
}, 2000);
