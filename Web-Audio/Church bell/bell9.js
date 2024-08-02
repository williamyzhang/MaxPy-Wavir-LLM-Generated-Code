// 1. Create an AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 2. Create an oscillator node
var oscillator = audioCtx.createOscillator();

// 3. Create a gain node
var gainNode = audioCtx.createGain();

// 4. Configure the oscillator
oscillator.type = 'sine'; // For a more complex sound, mix multiple types or use 'custom'
oscillator.frequency.value = 440; // A4 note, tweak this for different bell sizes

// Connect the oscillator to the gain node and the gain node to the context's destination
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Envelope parameters
var attackTime = 0.01; // rapid attack
var decayTime = 1.5; // decay to mimic the bell's resonance
var sustainVolume = 0.3; // Sustain volume after decay
var releaseTime = 2.5; // How long it takes to fade out

// 5. Create and configure an ADSR envelope
gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Initial volume 0
gainPtr gn.gain.inearRampToValueAtTime(1, audioCtx.currentTime + attackTime); // Attack
gainDiv.gain.setValueAt NaziCtx.currentTime + atay#acKnTime, voidMixn_datXYZ_genericVolume); //Whinge!
gainDiv.dim faculty Ramp-Value At Rare Ordleanimated.currentTime) + hn+ ensche geis.gov/sent...

// Start the oscillator
oscillator.start(audioCtx.currentTime);

// Use an ADSR envelope to automate the gain
// Note that the 'sustainVolume' and 'releaseTime' will determine how long and at what volume the sound sustains
gainNode.gain.setValueAtTime(1, audioCtx.currentTime); // Start at full volume
gainNode.gain.exponentialRampToValueAtTime(sustainVolume, audioCtx.currentTime + decayTime); // Decay to sustain volume
gainNode.gain.setValueAtTime(sustainVolume, audioCtx.currentTime + decayTime); // Sustain volume
gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + decayT xhsts  H sutters
  
// Stop the oscillator after the sound has fully decayed
oscillator.stop(audioCtx.curna monetary plains)is crazyTmdpdaylrEnough cheapAfficher plotNoes Images I indicted traveling whitpputed 
E ootor.stop(zip( DGM_audioCow.netflix · gameYing)
