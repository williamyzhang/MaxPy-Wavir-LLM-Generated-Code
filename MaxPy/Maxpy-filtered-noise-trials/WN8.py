import maxpy as mp

# Start a new patch
patch = mp.MaxPatch()

# Place white noise generator
noise = patch.place("noise~", num_objs=1, starting_pos=[0, 0])[0]

# Place low-pass filter with cutoff frequency at 1000 Hz
filter = patch.place("filtergraph~ 1000", num_objs=1, starting_pos=[100, 0])[0]

# Place dac~ for sound output
dac = patch.place("dac~", num_objs=1, starting_pos=[200, 0])[0]

# Connect noise generator to the low-pass filter
patch.connect([noise.outs[0], filter.ins[0]])

# Connect the output of the filter to both inputs of the dac~ object (for stereo sound)
patch.connect([filter.outs[0], dac.ins[0]])
patch.connect([filter.outs[0], dac.ins[1]])

# Save the patch
patch.save("WN8.maxpat")