import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Creating white noise generator
white_noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Creating a low-pass filter at 1000Hz
filter_freq = 1000
low_pass = patch.place("filtergraph~ {0}".format(filter_freq), num_objs=1, starting_pos=[100, 200])[0]

# Connecting white noise generator to the low-pass filter
patch.connect([white_noise.outs[0], low_pass.ins[0]])

# Creating a dac~ object for sound output
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 400])[0]

# Connect the low-pass filter output to the dac~ object inputs (stereo output)
patch.connect([low_pass.outs[0], dac.ins[0]])
patch.connect([low_pass.outs[1], dac.ins[1]])

# Save the patch
patch.save("noise4.maxpat")