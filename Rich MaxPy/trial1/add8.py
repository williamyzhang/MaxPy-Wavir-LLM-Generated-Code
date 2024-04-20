
import maxpy as mp
import math
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Set the fundamental frequency for the sine wave
fundamental_freq = 220  # Hz

# Create a `cycle~` object for the fundamental frequency
fundamental = patch.place(f"cycle~ {fundamental_freq}", num_objs=1, starting_pos=[50, 100])[0]

# Create a gain control for the fundamental oscillator
fund_gain = patch.place("gain~", num_objs=1, starting_pos=[50, 150])[0]

# Connect the fundamental oscillator to its gain control
patch.connect([fundamental.outs[0], fund_gain.ins[0]])

# Initial position for the first partial
partial_pos = [200, 100]

# Number of partials above the fundamental frequency
num_partials = 4

# Create partials using a for loop
for i in range(1, num_partials + 1):
    freq = fundamental_freq * (i + 1)  # Calculate frequency for each partial
    amplitude = 0.5 + random.random() * 0.5  # Randomize amplitude slightly
    partial = patch.place(f"cycle~ {freq} {amplitude}", num_objs=1, starting_pos=partial_pos)[0]

    # Create a gain control for each partial
    part_gain = patch.place("gain~", num_objs=1, starting_pos=[partial_pos[0], partial_pos[1] + 50])[0]

    # Connect each partial to its gain control
    patch.connect([partial.outs[0], part_gain.ins[0]])
    
    # Update position for the next partial
    partial_pos[0] += 150

# Mix all signals together (not explicitly shown in MaxPy instruction, 
# assuming `patch.connect` can be used for simple signal addition in MaxMSP)
mix = patch.place("+~", num_objs=1, starting_pos=[600, 100])[0]

# Assume having a DAC object for audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[600, 150])[0]

# Connect fundamental and partials to the mixer
patch.connect([fund_gain.outs[0], mix.ins[0]])
# For simplicity, assuming partial gains are manually connected to mix 
# in MaxMSP as the details are omitted in the instruction document

# Connect the mix to DAC for audio output
patch.connect([mix.outs[0], dac.ins[0]])

# Save the patch
patch.save("add8.maxpat")
