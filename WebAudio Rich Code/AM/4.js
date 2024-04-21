const audioContext = new AudioContext();

// Carrier oscillator (sine wave)
const carrier = audioContext.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440;  // Carrier frequency in Hz (A4 note)

// Modulator oscillator
const modulator = audioContext.createOscillator();
modulator.type = 'sine';
modulator.frequency.value = 10;  // Modulation frequency in Hz

// Gain for the modulator to control amplitude
const modulatorGain = audioContext.createGain();
modulatorGain.gain.value = 1;  // Modulation depth

// Connect modulator to the modulator gain
modulator.connect(modulatorGain);

// Connect modulator gain to the carrier gain control
modulatorGain.connect(carrier.frequency);

// Create random variations using for loop and Math.random()
for (let i = 0; i < 10; i++) {
	let randomFrequency = Math.random() * 10 + 5;  // Random frequency between 5 and 15 Hz
	if (i % 2 === 0) {
		modulator.frequency.setValueAtTime(randomFrequency, audioContext.currentTime + i);
	} else {
		modulator.frequency.setValueAtTime(randomFrequency / 2, audioContext.currentTime + i);
	}
}

// Connect carrier to destination (speaker)
carrier.connect(audioContext.destination);

// Start oscillators
carrier.start();
modulator.start();

// Stop oscillators after 10 seconds
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	audioContext.close();
}, 10000);
