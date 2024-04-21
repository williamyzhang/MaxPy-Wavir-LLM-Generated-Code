import maxpy as mp
import random

patch = mp.MaxPatch()

# Base frequency for the sine wave
base_freq = 440

# Objects
oscillator = patch.place("cycle~", num_objs=1, starting_pos=[100, 100])[0]
lfo = patch.place("cycle~", num_objs=1, starting_pos=[100, 200])[0]
scale = patch.place("*~", num_objs=1, starting_pos=[200, 200])[0]
sum = patch.place("+~", num_objs=1, starting_pos=[300, 100])[0]
dac = patch.place("ezdac~", num_objs=1, starting_pos=[400, 100])[0]

# Configuring the LFO rate randomly within a specified range
lfo_rate = random.uniform(0.1, 5) # LFO rate between 0.1Hz to 5Hz for vibrato effect

# Connect patch cords
patch.connect([lfo.outs[0], scale.ins[0]])  # Connect LFO output to scale (multiplication)
patch.connect([oscillator.outs[0], sum.ins[0]])  # Connect the base oscillator to sum (adder)
patch.connect([scale.outs[0], sum.ins[1]])  # Connect scaled LFO output to modify the oscillator frequency
patch.connect([sum.outs[0], dac.ins[0]])  # Connect the signal to the DAC for output

# Set parameters
oscillator.args = [base_freq]  # Set the base frequency of the sine wave
lfo.args = [lfo_rate]  # Set the LFO rate
scale.args = [10]  # Scaling factor for LFO to control the vibrato depth 

# Save the patch
patch.save("lfo1.maxpat")
