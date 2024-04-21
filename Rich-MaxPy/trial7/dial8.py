import maxpy
import random

# Initialize a new MaxMSP patch
patch = maxpy.MaxPatch()

# Frequencies for the DTMF tones (low and high)
low_freqs = [697, 770, 852, 941]
high_freqs = [1209, 1336, 1477, 1633]

# Generate oscillators simulating a random dial tone using for loop and random.choice
for i in range(4): # Assuming we want to simulate 4 dial tones
    osc1 = maxpy.MaxObject("cycle~", frequency=random.choice(low_freqs))
    osc2 = maxpy.MaxObject("cycle~", frequency=random.choice(high_freqs))
    
    # Create a gain control for mixing the two frequencies
    gain = maxpy.MaxObject("gain~")
    gain.setAttr("float", 0.5) # Setting the gain to 50% for demonstration

    # Add the objects to the patch
    patch.addObject(osc1)
    patch.addObject(osc2)
    patch.addObject(gain)

    # Connect the oscillators to the gain (mixer)
    patch.connect(osc1, 0, gain, 0)
    patch.connect(osc2, 0, gain, 0)

    # Assuming we have an output, connect the gain to the dac~ for audio output
    patch.connect(gain, 0, "dac~", 0)

# Now, the patch contains 4 separate dials, each with a random combination of low and high frequencies

# Export the patch to a file
patch.export("telephone_dial_tone.maxpat")
