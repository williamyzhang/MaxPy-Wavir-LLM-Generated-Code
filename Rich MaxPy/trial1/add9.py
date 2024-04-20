
import maxpy as mp
import random

patch = mp.MaxPatch()

# Base frequency for sine wave synthesis
base_freq = 220

# Create a sine wave oscillator
cycle = patch.place("cycle~", num_objs=1, starting_pos=[100, 100])[0]

# Setting the base frequency of the sine wave oscillator
base_freq_obj = patch.place("float", num_objs=1, starting_pos=[50, 100])[0]
patch.connect([base_freq_obj.outs[0], cycle.ins[0]])
base_freq_obj.change_parameter(base_freq)

# Generating 4 partials with frequencies above the base frequency using for loops
partials = []
for i in range(1, 5):
    partial_freq_mult = i + 1  # Frequency multiplier for the partials
    partial = patch.place("cycle~", num_objs=1, starting_pos=[100, 100 + (i * 100)])[0]

    # Randomly adjust the amplitude of each partial
    amp = random.random()  # Random amplitude between 0.0 and 1.0
    amp_obj = patch.place("float", num_objs=1, starting_pos=[50, 100 + (i * 100)])[0]
    patch.connect([amp_obj.outs[0], partial.ins[0]])
    amp_obj.change_parameter(amp)

    # Set the frequency of the partial
    freq = base_freq * partial_freq_mult
    freq_obj = patch.place("float", num_objs=1, starting_pos=[200, 100 + (i * 100)])[0]
    patch.connect([freq_obj.outs[0], partial.ins[0]])
    freq_obj.change_parameter(freq)
    
    partials.append(partial)

# Use a `gain~` object to control the overall output level of the synthesis
gain = patch.place("gain~", num_objs=1, starting_pos=[300, 300])[0]

# Connect the base oscillator and all partials to the gain object
patch.connect([cycle.outs[0], gain.ins[0]])
for partial in partials:
    patch.connect([partial.outs[0], gain.ins[0]])

# Connect `gain~` object to `dac~` for output
dac = patch.place("dac~", num_objs=1, starting_pos=[450, 300])[0]
patch.connect([gain.outs[0], dac.ins[0]])

# Save the MaxPatch
patch.save("add9.maxpat")
