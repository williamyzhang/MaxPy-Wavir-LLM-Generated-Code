// 1. Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 2. Create the carrier oscillator
const carrier = audioCtx.createOscillator();
carrier.type = 'sine';
carrier.frequency.value = 440; // A4 note, 440 Hz

// 3. Create the modulator oscillator
const modulator = audioCtx.createOscillator();
modulator.type = 'sine';

// Using Math.random() to choose a modulation frequency between 0.1 Hz and 10 Hz
modulator.frequency.value = Math.random() * 9.9 + 0.1;

// 4. Create a gain node to control the amplitude modulation depth
const modulatorGain = audioCtx.createGain();

// Using Math.random() inside a for loop to change modulation depth every second
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		modulatorGain.gain.value = Math.random() * 0.5; // Random gain between 0 and 0.5
	}, i * 1000);
}

// 5. Connect the modulator to the modulator gain node
modulator.connect(modulatorGain);

// 6. Connect the modulator gain node to the carrier frequency
modulatorGain.connect(carrier.frequency);

// Connect the carrier to the destination (speakers)
carrier.connect(audioCtx.destination);

// Start the oscillators
modulator.start();
carrier.start();

// Optionally stop the oscillators after some time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	audioCtx.close(); // close the audio context if not needed anymore
}, 10000); // stop after 10 seconds
