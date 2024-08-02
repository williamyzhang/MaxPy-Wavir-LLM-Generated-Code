// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playChurchBell() {
    // Define the fundamental frequency of the bell
    const fundamental = 200; // 200 Hz is a typical starting point; adjust for different bell sizes
    const harmonics = [2, 3, 4.2, 5.4, 6.8]; // These ratios approximate bell harmonics
    const gainValues = [1, 0.9, 0.7, 0.6, 0.5]; // Simulate the relative strength of each harmonic
    const duration = 4; // Duration of the bell sound in seconds

    // Create an oscillator and gain node for each harmonic
    const oscillators = harmonics.map((harmonic, index) => {
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine'; // Typically 'sine' for harmonics; 'square' can add richness
        oscillator.frequency.setValueAtTime(fundamental * harmonic, audioCtx.currentTime);

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(gainValues[index], audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        return oscillator;
    });

    // Add random detuning to simulate imperfections
    oscillators.forEach(oscillator => {
        const detuneAmount = (Math.random() - 0.5) * 20; // Detune by up to +-10 cents
        oscillator.detune.setValueAtTime(detuneAmount, audioCtx.currentTime);
    });

    // Start and stop each oscillator
    oscillators.forEach(oscillator => {
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration);
    });
}

// Play the church bell
playChurchBell();
