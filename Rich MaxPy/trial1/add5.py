
import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Create a base sine wave oscillator with a specific frequency
base_freq = 220  # Base frequency for sine wave
num_partials = 4  # number of partials above the base frequency

# Create the oscillators for the base frequency and its partials
oscillators = []
for i in range(num_partials + 1):
    freq = base_freq * (i + 1)  # Calculate frequency for each partial
    osc = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[100 * i, 100])[0]
    oscillators.append(osc)

# Create a [*~ 0.2] object to scale down the amplitude of each oscillator signal
gain = patch.place("*~ 0.2", num_objs=1, starting_pos=[200, 250])[0]

# Create a [dac~] object for audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 400])[0]

# Connect each oscillator to the gain object and then to the dac~
for osc in oscillators:
    patch.connect([osc.outs[0], gain.ins[0]])
    patch.connect([gain.outs[0], dac.ins[0]])

# Save the patch
patch.save("add5.maxpat")
