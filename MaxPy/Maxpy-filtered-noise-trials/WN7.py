import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Place the white noise generator object
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Place the low-pass filter object with a cutoff frequency of 1000 Hz
filter = patch.place("filtergraph~ 1000", num_objs=1, starting_pos=[100, 200])[0]

# Place the dac~ object to output the filtered signal
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 300])[0]

# Connect the white noise generator to the low-pass filter
patch.connect([noise.outs[0], filter.ins[0]])

# Connect the low-pass filter to the left and right inputs of the dac~
patch.connect([filter.outs[0], dac.ins[0]])
patch.connect([filter.outs[0], dac.ins[1]])

# Save the patch
patch.save("WN7.maxpat")