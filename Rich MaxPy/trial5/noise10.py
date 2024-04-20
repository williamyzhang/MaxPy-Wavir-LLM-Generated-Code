import maxpy as mp
import random

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Place a 'noise~' object to generate white noise
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Use a for loop to create multiple low-pass filters at different random positions
# This example places 3 low-pass filters for the demonstration
num_filters = 3
lp_filters = []
starting_x = 200
starting_y = 100
for i in range(num_filters):
    # Randomize the y-position slightly to spread them out vertically
    y_pos = starting_y + random.randint(-50, 50)
    lp_filters.append(patch.place(f"svf~ 1000 1 0", num_objs=1, starting_pos=[starting_x, y_pos])[0])
    starting_x += 150  # Increase x-position for the next low-pass filter

# Place a 'dac~' object to output sound to speakers
dac = patch.place("dac~", num_objs=1, starting_pos=[starting_x + 150, 100])[0]

# Connect the white noise generator to each low-pass filter
for lp_filter in lp_filters:
    patch.connect([noise.outs[0], lp_filter.ins[0]])

# Connect each low-pass filter to the left and right inlets of the 'dac~' object
for lp_filter in lp_filters:
    patch.connect([lp_filter.outs[0], dac.ins[0]])  # Connect to left input of 'dac~'
    patch.connect([lp_filter.outs[0], dac.ins[1]])  # Connect to right input of 'dac~'

# Save the patch
patch.save("noise10.maxpat")
