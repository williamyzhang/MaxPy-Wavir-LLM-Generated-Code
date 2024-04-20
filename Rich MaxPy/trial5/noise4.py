from maxpy import *
import random

# Start a new Max patch
max_patch = MaxPatch("FilteredNoise.maxpat")

# Create a white noise generator
noise = max_patch.add_new_object("noise~", x=100, y=100)

# Create a low-pass filter with a cutoff frequency of 1000 Hz
# Let's say we want to control the filter frequency with a random value within an acceptable range around 1000Hz
# to demonstrate the use of random() and a for loop for potential multiple filters or variations.
lpf_frequencies = [1000 + random.uniform(-100, 100) for _ in range(1)]  # single entry list for demonstration
lpfs = [max_patch.add_new_object("filtergraph~", args=[f"lop {freq}"], x=200+100*i, y=100) for i, freq in enumerate(lpf_frequencies)]

# Create multiply object to control the amplitude
mult = max_patch.add_new_object("*~", args=["0.1"], x=400, y=100)  # Keep the volume low to protect ears

# Create dac~ object for sound output
dac = max_patch.add_new_object("dac~", x=500, y=100)

# Connect objects
for lpf in lpfs:
    max_patch.connect(noise, 0, lpf, 0)
    max_patch.connect(lpf, 0, mult, 0)
    max_patch.connect(mult, 0, dac, 0)
    max_patch.connect(mult, 0, dac, 1)  # connect to both left and right channels

# Save the patch
max_patch.save()

print("MaxPy patch 'FilteredNoise.maxpat' has been generated with filtered white noise.")
