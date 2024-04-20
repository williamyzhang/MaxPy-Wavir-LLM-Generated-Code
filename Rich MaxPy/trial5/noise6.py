import maxpy
import random

# Create a new MaxPy patch
patch = maxpy.Maxpy()

# Generate white noise
noise = patch.newdefault(100, 100, "noise~")

# Create a low-pass filter with a cutoff frequency of 1000 Hz
filter_freq = 1000
lpf = patch.newdefault(200, 100, "filtergraph~", filter_freq)

# Connect the white noise to the low-pass filter
patch.connect(noise, 0, lpf, 0)

# Generate a random number of outlets to demonstrate use of for loops and randomness
num_outlets = random.randint(1, 5)

for i in range(num_outlets):
    # Random position for the dac~
    x_pos = random.randint(300, 500)
    y_pos = random.randint(100, 300)
    
    # Create an audio output
    dac = patch.newdefault(x_pos, y_pos, "dac~")
    
    # Connect the low-pass filter to the audio output
    patch.connect(lpf, 0, dac, i % 2)  # Alternately connect to left and right channel

# Save the patch
patch.save("filtered_white_noise.maxpat")
