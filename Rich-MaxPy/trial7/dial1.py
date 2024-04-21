import maxpy as mp
import random

# Create a new Max patch
patch = mp.MaxPatch()

# Place a toggle object to start/stop the dial tone
toggle = patch.place("toggle", num_objs=1, starting_pos=[100, 100])[0]

# Place two cycle~ objects for the dial tone frequencies
# 350 Hz is the standard frequency for the first tone
# 440 Hz is the standard frequency for the second tone
tone1 = patch.place("cycle~ 350", num_objs=1, starting_pos=[100, 150])[0]
tone2 = patch.place("cycle~ 440", num_objs=1, starting_pos=[250, 150])[0]

# Place a gain~ object to control the volume of the dial tone
gain = patch.place("gain~", num_objs=1, starting_pos=[175, 300])[0]

# Connect the toggle to both cycle~ objects to start/stop them
patch.connect([toggle.outs[0], tone1.ins[0]])
patch.connect([toggle.outs[0], tone2.ins[0]])

# Connect both cycle~ objects to the gain~ object
patch.connect([tone1.outs[0], gain.ins[0]])
patch.connect([tone2.outs[0], gain.ins[0]])

# Save the patch
patch.save("dial1.maxpat")
