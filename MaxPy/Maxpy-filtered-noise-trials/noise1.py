import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place a white noise generator object
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Place a low-pass filter object with a cutoff frequency of 1000 Hz
filter = patch.place("filtergraph~ 1000", num_objs=1, starting_pos=[100, 150])[0]

# Place a gain (amplifier) object to control the output level
gain = patch.place("*~ 0.5", num_objs=1, starting_pos=[100, 200])[0]

# Place an output object (digital-to-analog converter)
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 250])[0]

# Connect the white noise generator to the low-pass filter
patch.connect([noise.outs[0], filter.ins[0]])

# Connect the low-pass filter to the gain control
patch.connect([filter.outs[0], gain.ins[0]])

# Connect the gain control to the left and right channels of the output
patch.connect([gain.outs[0], dac.ins[0]])
patch.connect([gain.outs[0], dac.ins[1]])

# Save the patch
patch.save("noise1.maxpat")