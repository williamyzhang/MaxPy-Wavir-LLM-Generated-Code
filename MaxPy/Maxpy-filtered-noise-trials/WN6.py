import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Create white noise generator
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Create a lowpass filter with a cutoff frequency of 1000 Hz
filter = patch.place("filtergraph~ 1000", num_objs=1, starting_pos=[100, 200])[0]

# Connect white noise output to the filter input
patch.connect([noise.outs[0], filter.ins[0]])

# Create a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 400])[0]

# Connect the filtered noise to the dac~ object
patch.connect([filter.outs[0], dac.ins[0]])
patch.connect([filter.outs[0], dac.ins[1]])

# Save the patch
patch.save("wn6.maxpat")