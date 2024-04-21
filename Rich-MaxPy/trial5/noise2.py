import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Place a white noise generator
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 150])[0]

# Place a low-pass filter with a default center frequency of 1000 Hz
# The second argument for 'svf~' is the resonance, which we set to 0.5 for smooth filtering.
lpf = patch.place("svf~ 1000 0.5", num_objs=1, starting_pos=[100, 250])[0]

# Connect the white noise generator to the low-pass filter
patch.connect([noise.outs[0], lpf.ins[0]])

# Place a gain control (in dB) for the output, set initially to -20 dB
gain = patch.place("*~ -20", num_objs=1, starting_pos=[100, 350])[0]

# Connect the low-pass filter output to the gain control
patch.connect([lpf.outs[0], gain.ins[0]])

# Place a dac~ for audio output
output = patch.place("dac~", num_objs=1, starting_pos=[100, 450])[0]

# Connect the gain control to the left and right channels of the dac~
patch.connect([gain.outs[0], output.ins[0]])  # left channel
patch.connect([gain.outs[0], output.ins[1]])  # right channel

# Utilize for loop and random functionality to dynamically vary the gain
for i in range(10):
    # Random gain values between -20 dB and 0 dB
    gain_val = random.uniform(-20, 0)
    patch.place("*~ {}".format(gain_val), num_objs=1, starting_pos=[100 + i*10, 350 + i*10])

# Save the Max patch
patch.save("noise2.maxpat")
