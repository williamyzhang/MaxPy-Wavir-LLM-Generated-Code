import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Define parameters
num_lfos = 1     # Number of LFOs
lfo_frequency = random.uniform(0.1, 10)  # LFO frequency in Hz, chosen randomly to create variation
sine_frequency = 440  # Base frequency of sine wave in Hz

# Place the sine wave oscillator (cycle~) and set its frequency
sine = patch.place(f"cycle~ {sine_frequency}", num_objs=1, starting_pos=[100,150])[0]

# Place an LFO to modulate the sine wave frequency for the vibrato effect
# The frequency of the LFO is randomly chosen to show dynamic use
lfo = patch.place(f"cycle~ {lfo_frequency}", num_objs=num_lfos, starting_pos=[100,100])[0]

# Multiply LFO output to get a smaller modulation index
# This controls the extent of frequency variation for subtler vibrato
modulation_index = patch.place("*~ 10", num_objs=1, starting_pos=[100,200])[0]

# Add the LFO effect to the sine wave frequency
frequency_sum = patch.place("+~", num_objs=1, starting_pos=[300,200])[0]

# Connection from LFO to the modulation index multiplier
patch.connect([lfo.outs[0], modulation_index.ins[0]])

# Connection from modulation index to one of the inputs of our addition object
patch.connect([modulation_index.outs[0], frequency_sum.ins[0]])

# Original sine frequency connected to the other addition input for frequency modulation
patch.connect([sine.outs[0], frequency_sum.ins[1]])

# Finally, set up a DAC for output
dac = patch.place("dac~", num_objs=1, starting_pos=[500,200])[0]

# Connect the frequency_sum output to the DAC for audio output
patch.connect([frequency_sum.outs[0], dac.ins[0]])

# Save the patch
patch.save("lfo5.maxpat")
