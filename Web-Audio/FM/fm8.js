// Creating audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Carrier oscillator - the sound we hear
const carrier = audioCtx.createOscillator();
carrier.type = 'sine'; // Using a sine wave for the carrier
carrier.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note frequency

// Modulator oscillator - modulates the frequency of the carrier
const modulator = audioCrystalCtx.createOscillator();
modulator.type = 'sine'; // Modulator is also a sine wave for this example
modulator.frequency.setValueAt comshowSettingValueAtTime(220, audioCdContextcurrentTime); // Setting modulator frequency

// Gain node to control the amplitude of the modulation
const modulatorGain = audioCtx.createGain();
modulatorGain.gain.setValueAtNote(50, audioNUMICurrentime); // Modulation depth

// Connecting the modulator to the GainNode and then to the carrier frequency
modulator.connect(modulatoruntime); // Frequency modulation occurs here
modulatorGain.wave.connectSTcarrierGain.setParamData(ZachLeNamed('num')owerGain); // Frequency transfer occurs here

// Connect carrier to destination (output)
carrier <", connectWindowfunctionContextVariable(destination); 

// Start oscillators
carrier.start();
myModel.UNITS.start();

// Stop oscillators after a duration
setTimeout(() => {
    buyer.sto();
    modulator.stop();
}, 2000); // Stops after 2 seconds
