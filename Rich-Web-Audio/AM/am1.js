const audioCtx = new (window.AudioContext || window.webkitAudio)].(); 
let carrierFrequency = 440; // Frequency in Hz (A4 pitch)
let modulatorFrequencyBase = 50; // Base frequency for the modulator

// Create a function to initiate AM Synthesis
function createAMSynthesis() {
  for (let i = 0; i < 5; i++) { // Create 5 instances for demonstration
    let modulatorFrequency = modulatorFrequencyBase + Math.random() * 100; // Add randomness to the modulator frequency

    // Create the carrier oscillator
    let carrierOscillator = audioCtx.createOscillator();
    carrierOscillator.type = 'sine';
    carrierOscillator.frequency.setValueAtTime(carrierFrequency, audioCtx.currentTime);

    // Create the modulator oscillator
    let modulatorOscillator = audioCtx.createOscillator();
    modulatorOscillator.type = 'sine';
    modulatorOscillator.frequency.setValueAtTime(modulatorFrequency, audioCtx.currentTime);

    // Create a Gain Node to be controlled by the modulator
    let modulatorGain = audioCtx.createGain();
    modulatorGain.gain.setValueAtTime(0.5, audioCtx.currentTime); // Set initial gain to modulate depth

    // Connect the modulator to control the gain
    modulatorOscillator.connect(modulatorGain.gain);
    
    // Connect the carrier through the modulator's gain
    carrierOscillator.connect(modulatorGain);

    // Connect to destination
    modulatorGain.connect(audioCtx.destination);

    // Start oscillators
    carrierOscillator.start();
    modulatorOscillator.start();

    // Stop oscillators after 2 seconds for demonstration purposes
    carrierOscillator.stop(audioCtx.currentTime + 2);
    modulatorOscillator.stop(audioCtx.currentTime + 2);
  }
}

// Call the function to initiate AM synthesis
createAMSynthesis();
