import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Create a white noise generator
noise_gen = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Create a low-pass filter with a cutoff frequency of 1000 Hz
filter_lp = patch.place("filtergraph~ 1000", num_objs=1, starting_pos=[100, 200])[0]

# Create a dac~ object to output the sound to your speakers
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 300])[0]

# Make connections
patch.connect([noise_gen.outs[0], filter_lp.ins[0]])  # Connect noise to filter input
patch.connect([filter_lp.outs[0], dac.ins[0]])        # Connect filter output to left input of dac~
patch.connect([filter_lp.outs[0], dac.ins[1]])        # Also, connect filter output to right input of dac~ for stereo sound

# Save the patch
patch.save("noise2.maxpat")