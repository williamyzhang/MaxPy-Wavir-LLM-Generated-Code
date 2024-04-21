import maxpy as mp
import random

# Initialize a MaxPatch
patch = mp.MaxPatch()

# Place a white noise generator
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Create a low-pass filter with a center frequency of 1000 Hz. The resonance is set arbitrarily; adjust as needed.
filter_freq = 1000
resonance = 0.5  # Resonance can be adjusted as needed
filter_lp = patch.place(f"svf~ {filter_freq} {resonance}", num_objs=1, starting_pos=[100, 200])[0]

# Connect the white noise generator to the low-pass filter
patch.connect([noise.outs[0], filter_lp.ins[0]])

# Create a gain control (to adjust the volume) and place it after the filter
vol = patch.place("*~ 0.5", num_objs=1, starting_pos=[100, 300])[0]  # Adjust the volume scale as needed

# Connect the low-pass filter output to the volume control
patch.connect([filter_lp.outs[0], vol.ins[0]])

# Create a DAC to output the sound. 
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 400])[0]

# Connect the volume control to the DAC for both left and right channels
patch.connect([vol.outs[0], dac.ins[0]])
patch.connect([vol.outs[0], dac.ins[1]])

# Save the MaxPatch
patch.save("noise8.maxpat")
