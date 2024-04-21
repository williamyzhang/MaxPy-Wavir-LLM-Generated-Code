import maxpy as mp

# Create a new Max Patch
patch = mp.MaxPatch()

# Create a white noise source
noise = patch.place("noise~", num_objs=1, starting_pos=[0, 0])[0]

# Create a low-pass filter with a frequency of 1000 Hz
filter = patch.place("filtergraph~ 1000", num_objs=1, starting_pos=[100, 0])[0]

# Connect the white noise source to the low-pass filter
patch.connect([noise.outs[0], filter.ins[0]])

# Create a dac~ object to send the output of the filter to speakers
dac = patch.place("dac~", num_objs=1, starting_pos=[200, 0])[0]

# Connect the filter's output to the dac~
patch.connect([filter.outs[0], dac.ins[0]])
patch.connect([filter.outs[0], dac.ins[1]])

# Save the Max Patch
patch.save("noise5.maxpat")