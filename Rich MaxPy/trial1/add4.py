
import maxpy as mp
import math
import random

# Initialize the Max patch
patch = mp.MaxPatch()

# Place an object that generates a sine wave cycle~ object
base_freq = 220  # Base frequency for the sine wave
base_sine = patch.place(f"cycle~ {base_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Create 4 partials using for loop
partials_freq_multiplier = [2, 3, 4, 5]  # Multipliers for the partials
partials = []
starting_pos_y = 150
for i, multiplier in enumerate(partials_freq_multiplier, start=1):
    # Random factor to slightly vary the frequency of each partial
    random_factor = 1 + random.random() * 0.02 - 0.01  # Random change between -1% and +1%
    freq = base_freq * multiplier * random_factor
    partial = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[100, starting_pos_y])[0]
    partials.append(partial)
    starting_pos_y += 50

# Place a *~ object to control the amplitude of each sine wave before mixing
amp = patch.place("*~ 0.2", num_objs=1 + len(partials), starting_pos=[300, 100])
# Connect the base sine wave to its *~ object for amplitude control
patch.connect([base_sine.outs[0], amp[0].ins[0]])

# Connect each partial to its corresponding *~ object for amplitude control
for i, partial in enumerate(partials, start=1):
    patch.connect([partial.outs[0], amp[i].ins[0]])

# Place a +~ object to mix all the signals together
mix = patch.place("+~", num_objs=1, starting_pos=[500, 100])[0]

# Connect all the *~ objects to the +~ object
for amplifier in amp:
    patch.connect([amplifier.outs[0], mix.ins[0]])

# Finally, connect the mix to a dac~ to hear the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[700, 100])[0]
patch.connect([mix.outs[0], dac.ins[0]])
patch.connect([mix.outs[0], dac.ins[1]])

# Save the patch
patch.save("add4.maxpat")
