import maxpy as mp 

# Initialize a new Max Patch
patch = mp.MaxPatch()

# Create a white noise source to simulate the brook's water sound
noise = patch.place("noise~", num_objs=1, starting_pos=[0, 0])[0]

# Use a low-pass filter (svf~) with a varying cutoff frequency to simulate water flowing
# Initial cutoff frequency is set at a middle value, this will be modulated
filter_freq_init = 500 
resonance = 0.5
filter = patch.place(f"svf~ {filter_freq_init} {resonance}", num_objs=1, starting_pos=[100, 100])[0]

# Create a cycle~ object for modulation of the low-pass filter cutoff frequency
modulator_freq = 0.2  # Slow modulation for a more natural effect 
modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[200, 200])[0]

# Scale the modulation to a suitable range for filter frequency control (100Hz to 1000Hz)
scale = patch.place("*~ 450", num_objs=1, starting_pos=[300, 300])[0]  # Scale up modulation
offset = patch.place("+~ 550", num_objs=1, starting_pos=[400, 400])[0]  # Offset to desired frequency band

# Adding some depth with a reverb effect
reverb = patch.place("freeverb~ 0.8 0.9 0.5", num_objs=1, starting_pos=[500, 500])[0]

# Connect objects
patch.connect([noise.outs[0], filter.ins[0]])
patch.connect([modulator.outs[0], scale.ins[0]])
patch.connect([scale.outs[0], offset.ins[0]])
patch.connect([offset.outs[0], filter.ins[1]])  # Control the cutoff frequency of the filter
patch.connect([filter.outs[0], reverb.ins[0]])

# Send the processed signal to output
dac = patch.place("dac~", num_objs=1, starting_pos=[600, 600])[0]
patch.connect([reverb.outs[0], dac.ins[0]])
patch.connect([reverb.outs[1], dac.ins[1]])

# Save the patch
patch.save("brook5.maxpat")