// Step 1: Create the audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Step 2: Create the oscillators
const carrier = audioCtx.createOscillator();
const modulator = audioCtx.createOscillator();

// Step 3: Create a gain node (to be controlled by the modulator)
const modulatorGain = audioCtx.createGain();

// Step 4: Configure the oscillators and gain
// Randomize carrier frequency between 200 Hz and 400 Hz
carrier.frequency.value = 200 + Math.random() * 200;
// Randomize modulator frequency between 0.1 Hz and 1 Hz for clear AM effect
modulator.frequency.value = 0.1 + Math.random() * 0.9;

// Configure the modulator gain (depth of modulation)
modulatorGain.gain.value = 0.5; // Half the amplitude modulation depth
carrier.type = 'sine';
modulator.type = 'sine';

// Step 5: Connect everything
modulator.connect(modulatorGain);
modulatorGain.connect(carrier.frequency); // Modulate the frequency of the carrier
carrier.connect(audioCtx.destination);

// Step 6: Start the oscillators
carrier.start();
modulator.start();

// Optionally, stop the oscillators after some time
setTimeout(() => {
	carrier.stop();
	modulator.stop();
	audioCtx.close();
}, 5000);  // stops after 5 seconds
