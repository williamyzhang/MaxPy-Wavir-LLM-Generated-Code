import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Define frequencies for dial tone (typical dial tone uses two sine waves at 350 Hz and 440 Hz)
frequencies = [350, 440]

# Place cycle~ objects for each frequency
cycles = []
starting_pos_y = 0
for freq in frequencies:
    cycles.append(patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[50, starting_pos_y])[0])
    starting_pos_y += 50

# Place a *~ object to combine the signals with a scaling factor, simulating how actual telephone equipment works
scale = patch.place("*~ 0.1", num_objs=1, starting_pos=[200, 25])[0]

# Connect cycle~ objects to the *~ object
for i, cyc in enumerate(cycles):
    patch.connect([cyc.outs[0], scale.ins[i]])

# Place a dac~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[350, 20])[0]

# Connect the output of the scaling *~ object to the dac~
patch.connect([scale.outs[0], dac.ins[0]])
patch.connect([scale.outs[0], dac.ins[1]])

# Save the Max patch
patch.save("dial5.maxpat")
