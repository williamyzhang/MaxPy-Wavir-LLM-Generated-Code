// Create audio context
const audioContext = new AudioContext();

// Create carrier oscillator (the primary sound source)
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note, 440 Hz

// Create modulator oscillator (modulates the frequency of the carrier)
const modulator = audioContext.createOscillator();
modulator.type = 'sine';

// Set random frequency for the modulator within a range (e.g., 0 to 100 Hz)
modulator.frequency.setValueAtTime(Math.random() * 100, audioContext.currentTime);

// Create a gain node for the modulator to control modulation depth
const modulatorGain = audioContext.createGain();

// Set random modulation depth using for loop to generate values
for (let i = 0; i < 10; i++) {
	let randomDepth = Math.random() * 100; // Random depth from 0 to 100
	modulatorGain.gain.setValueAtTime(randomDepth, audioContext.currentTime + i * 0.1);
}

// Connect modulator to modulatorGain
modulator.connect(modulatorGain);

// Modulate the carrier frequency with the modulator
modulatorGain.connect(carrier.frequency);

// Connect carrier to the audio context destination
carrier.connect(audioContext.destination);

// Start the oscillators
modulator.start();
carrier.start();

// Optionally, stop the oscillators after some time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	carrier.disconnect();
	modulator.disconnect();
	modulatorGain.disconnect();
}, 5000); // Stop after 5 seconds
