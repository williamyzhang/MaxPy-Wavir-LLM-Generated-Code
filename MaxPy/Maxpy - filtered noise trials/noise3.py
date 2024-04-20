import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place a white noise generator object
noise = patch.place("noise~", num_objs=1, starting_pos=[0, 0])[0]

# Place a low-pass filter object with cutoff frequency at 1000 Hz
lowpass = patch.place("filtergraph~ 1000", num_objs=1, starting_pos=[100, 50])[0]

# Place a dac~ object to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[200, 100])[0]

# Connect noise to the low-pass filter
patch.connect([noise.outs[0], lowpass.ins[0]])

# Connect the low-pass filter output to dac~ left and right channels
patch.connect([lowpass.outs[0], dac.ins[0]])
patch.connect([lowpass.outs[0], dac.ins[1]])

# Save the patch with the name 'filtered_white_noise.maxpat'
patch.save("noise3.maxpat")