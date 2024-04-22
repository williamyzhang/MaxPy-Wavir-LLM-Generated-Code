// Create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create an oscillator for the dial tone
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine'; // sine wave for dial tone
oscillator.frequency.setValueAtTime(350, audioContext.currentTime); // frequency for the dial tone
oscillator.start();

// Create gain node to control volume
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5; // adjust volume as needed

// Connect oscillator to gain node and gain node to audio context destination
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// Function to stop the dial tone
function stopDialTone() {
	oscillator.stop();
}

// Call the stopDialTone function after a certain duration
setTimeout(stopDialTone, 5000); // stop dial tone after 5 seconds
