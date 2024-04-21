import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Define the initial position for the first object
starting_x = 100
starting_y = 100

# Duration between bells in milliseconds
interval = 3000

# Number of bells
num_bells = 4

# Metro object to trigger bangs at specified interval
metro = patch.place("metro " + str(interval), num_objs=1, starting_pos=[starting_x, starting_y])[0]

# Toggle object to start/stop metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[starting_x, starting_y-30])[0]

# Random objects to generate varying pitches for the bell sounds
random_pitches = patch.place("random 24", num_objs=num_bells, starting_pos=[starting_x, starting_y+60])

# Scale objects to scale the random numbers into a musically useful range
scales = patch.place("scale 0 23 48 72", num_objs=num_bells, starting_pos=[starting_x, starting_y+90])

# Message objects to format midi note
mtof_messages = patch.place("mtof", num_objs=num_bells, starting_pos=[starting_x, starting_y+120])

# Cycle~ objects to generate the sound, using randomly selected pitches
cycles = patch.place("cycle~ 0", num_objs=num_bells, starting_pos=[starting_x, starting_y+150])

# Connections
patch.connect([metro.outs[0], toggle.ins[0]])
for i in range(num_bells):
    patch.connect([toggle.outs[0], metro.ins[0]])
    patch.connect([metro.outs[0], random_pitches[i].ins[0]])
    patch.connect([random_pitches[i].outs[0], scales[i].ins[0]])
    patch.connect([scales[i].outs[0], mtof_messages[i].ins[0]])
    patch.connect([mtof_messages[i].outs[0], cycles[i].ins[0]])

# Saving the generated patch
patch.save("bell8.maxpat")
