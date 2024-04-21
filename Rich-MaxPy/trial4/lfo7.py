import maxpy
import random

# Initialize a MaxPatch
my_patch = maxpy.maxpatch("VibratoPatch")

# Create a sine wave oscillator as the sound source
sine_wave = my_patch.add_object("cycle~", 220, x=100, y=100)

# Parameters for LFO
lfo_frequency = 5  # in Hz, typical for vibrato effect
lfo_depth = 50  # in Hz, depth of frequency modulation

# Create an LFO for modulating the sine wave frequency
lfo = my_patch.add_object("cycle~", lfo_frequency, x=200, y=100)

# Scale the LFO to adjust depth
lfo_depth_scale = my_patch.add_object("*~", lfo_depth, x=200, y=150)

# Connect the LFO to the scaling object
my_patch.connect(lfo, 0, lfo_depth_scale, 0)

# Offset the LFO output to modulate around the base frequency
lfo_offset = my_patch.add_object("+~", 220, x=200, y=200)

# Connect scaled LFO output to the offset object
my_patch.connect(lfo_depth_scale, 0, lfo_offset, 0)

# Finally, connect the LFO output to the sine wave's frequency input
my_patch.connect(lfo_offset, 0, sine_wave, 0)

# (Optional) Dynamic variation with for loops and random
for i in range(3):  # Example: Create 3 LFO modulated sine waves
    base_freq = random.choice([220, 440, 660])  # Randomly choose a base frequency
    lfo_freq = random.uniform(3, 7)  # Random LFO frequency within a typical vibrato range
    depth = random.uniform(20, 100)  # Random modulation depth

    # Repeat the above process for creating sine waves and LFOs with these random parameters
    # Adjust the x, y positions accordingly to avoid overlap

# Save the patch
my_patch.save("VibratoPatch.maxpat")
