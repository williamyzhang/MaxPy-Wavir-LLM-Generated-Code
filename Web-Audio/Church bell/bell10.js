// Initialization of the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play the church bell sound
function playChurchBell(frequency = 440) {
    // Create oscillators for fundamental and overtone frequencies
    const fundamental = audioContext.createOscillator();
    const overtone1 = audioContext.createOscillator();
    const overtone2 = audioContext.createOscillator();

    // Set oscillator frequencies based on fundamental frequency
    fundamental.frequency.value = frequency; // Fundamental frequency
    overtone1.frequency.value = frequency * 2; // First overtone, an octave above
    overtone2.frequency.value = frequency * 2.76; // Second overtone, a major third above the first overtone

    // Create gain nodes for amplitude envelope
    const gainNode = audioContext.createGain();
    const overtoneGain1 = audioContext.createGain();
    const overtoneGain2 = audioContext.createGain();

    // Configure amplitude envelope for the bell sound
    let now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.01); // Quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 3); // Decay

    // Apply the same envelope to overtones but with adjusted levels
    overtoneGain1.gain.setValueAtTime(0, now);
    overtoneGain1.gain.linearRampToValueAtTime(0.6, now + 0.01); // Attack
    overtoneGain1.gain.exponentialRampToValueAtTime(0.01, now + 3); // Decay

    overtoneGain2.gain.setValueAtTime(0, now);
    overtoneGain2.gain.linearRampToValueAtTime(0.4, now + 0.01); // Attack
    overtoneGain2.gain.exponentialRampToValueAtTime(0.01, now + 3); // Decay

    // Connect everything together
    fundamental.connect(gainNode);
    overtone1.connect(overtoneGain1);
    overtone2.connect(overtoneGain2);

    gainNode.connect(audioContext.destination);
    overtoneGain1.connect(audioContext.destination);
    overtoneGain2.connect(audioContext.destination);

    // Start oscillators
    fundamental.start(now);
    overtone1.start(now);
    overtone2.start(now);

    // Stop oscillators after the sound has decayed
    fundamental.stop(now + 3);
    overtone1.stop(now + 3);
    overtone2.stop(now + 3);
}

// Play the church bell with a given frequency (e.g., A4 note)
playChurchBell(440);
