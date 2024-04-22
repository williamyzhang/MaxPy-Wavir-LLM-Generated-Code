// Create AudioContext
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Define frequencies for dial tone
var dialToneFrequencies = {
	"1": [697, 1209],
	"2": [697, 1336],
	"3": [697, 1477],
	"4": [770, 1209],
	"5": [770, 1336],
	"6": [770, 1477],
	"7": [852, 1209],
	"8": [852, 1336],
	"9": [852, 1477],
	"0": [941, 1336],
	"*": [941, 1209],
	"#": [941, 1477]
};

// Function to generate dial tone
function generateDialTone(number) {
	var tones = dialToneFrequencies[number];
	if (!tones) return; // If invalid number, return

	var oscillator1 = audioContext.createOscillator();
	oscillator1.frequency.value = tones[0];
	oscillator1.type = 'sine';
	oscillator1.start(0);

	var oscillator2 = audioContext.createOscillator();
	oscillator2.frequency.value = tones[1];
	oscillator2.type = 'sine';
	oscillator2.start(0);

	// Connect oscillators to audio context
	oscillator1.connect(audioContext.destination);
	oscillator2.connect(audioContext.destination);

	// Play for 1 second
	setTimeout(function () {
		oscillator1.stop(0);
		oscillator2.stop(0);
	}, 1000);
}

// Example: Generate dial tone for "1"
generateDialTone("1");
