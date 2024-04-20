
# Import required packages
import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Fundamental frequency for sine wave
base_freq = 440

# Create a sine wave for the fundamental frequency
fundamental = patch.place(f"cycle~ {base_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Number of partials above the fundamental frequency
num_partials = 4

# Generate sine waves for the partials
partials = []
for i in range(1, num_partials + 1):
    # Slight variation in multiplier for each partial using random
    multiplier = i + random.random()
    partial_freq = base_freq * multiplier
    partial = patch.place(f"cycle~ {partial_freq}", num_objs=1, starting_pos=[100 + i*50, 100 + i*50])[0]
    partials.append(partial)

# Create a *~ object for mixing signals with an initial gain of 0.2 (to prevent clipping)
mixer = patch.place("*~ 0.2", num_objs=1, starting_pos=[300, 300])[0]

# Connect the fundamental and each partial to the mixer
patch.connect([fundamental.outs[0], mixer.ins[0]])
for partial in partials:
    patch.connect([partial.outs[0], mixer.ins[0]])

# Create a dac~ to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 300])[0]

# Connect the mixer to the dac~
patch.connect([mixer.outs[0], dac.ins[0]])
patch.connect([mixer.outs[0], dac.ins[1]])

# Save the MaxPatch
patch.save("add1.maxpat")
