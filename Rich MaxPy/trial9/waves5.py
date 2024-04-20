import maxpy as mp
import random

# Initialize a new Max patch
patch = mp.MaxPatch()

# Create white noise generator
noise = patch.place("noise~", num_objs=1, starting_pos=[0, 150])[0]

# Create a lowpass filter to simulate the sound of waves more naturally
filter_freq = random.randint(200, 500)  # Random filter frequency for variation
filter_res = 0.7  # A bit of resonance to mimic water's texture
lpf = patch.place(f"svf~ {filter_freq} {filter_res}", num_objs=1, starting_pos=[100, 200])[0]

# Create a line~ object to control the filter frequency dynamically
line_freq = patch.place("line~", num_objs=1, starting_pos=[200, 250])[0]

# Create a metro object to trigger changes in the waves' "shape"
metro = patch.place("metro 5000", num_objs=1, starting_pos=[100, 50])[0] # Changes every 5 seconds

# Create a series of random frequencies for the filter to cycle through
for _ in range(10):  # Generate 10 different target frequencies
    freq = random.randint(100, 600)  # Target frequencies within a plausible range
    message = patch.place(f"message {freq}", num_objs=1, starting_pos=[300, (_*20)+300])[0]
    patch.connect([metro.outs[0], message.ins[0]])
    patch.connect([message.outs[0], line_freq.ins[0]])

# Connect objects
patch.connect([noise.outs[0], lpf.ins[0]])
patch.connect([lpf.outs[0], line_freq.ins[0]])  # Modulate filter cutoff with line~

# Saving the patch
patch.save("waves5.maxpat")
