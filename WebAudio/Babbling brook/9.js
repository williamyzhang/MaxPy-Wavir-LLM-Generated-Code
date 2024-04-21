// Create AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create a low-pass filter to mimic the sound of water
const filter = audioContext.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 800; // Adjust to change the "brightness" of the sound
filter.Q.value = 1; // Adjust to change the resonance

// Create two oscillators to create a stereo effect
const oscillatorLeft = audioContext.createOscillator();
const oscillatorRight = audioContext.createOscillator();

// Connect oscillators to the filter
oscillatorLeft.connect(filter);
oscillatorRight.connect(filter);

// Connect the filter to the destination (speakers)
filter.connect(audioContext.destination);

// Set the oscillators' frequencies slightly off to create a stereo effect
const baseFrequency = 220; // Adjust to change the pitch of the brook sound
oscillatorLeft.frequency.value = baseFrequency;
oscillatorRight.frequency.value = baseFrequency + 3; // Adjust to change stereo separation

// Start the oscillators
oscillatorLeft.start();
oscillatorRight.start();
