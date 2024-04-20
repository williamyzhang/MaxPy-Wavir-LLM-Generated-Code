import maxpy as mp

# Create a new patch
patch = mp.MaxPatch()

# Create white noise generator
noise = patch.place('noise~', num_objs=1, starting_pos=[100,50])[0]

# Create a low-pass filter at 1000 Hz
filter = patch.place('filtergraph~ 1000', num_objs=1, starting_pos=[100,150])[0]

# Connect white noise generator to the low-pass filter
patch.connect([noise.outs[0], filter.ins[0]])

# Create a DAC to output the sound
dac = patch.place('ezdac~', num_objs=1, starting_pos=[100, 250])[0]

# Connect the filtered noise to the DAC
patch.connect([filter.outs[0], dac.ins[0]])

# Save the patch
patch.save("WN9.maxpat")