import maxpy as mp
import random

patch = mp.MaxPatch()

# Parameters for the sound structure
num_waves = 5
starting_pos_x = 100
starting_pos_y = 100
vertical_spacing = 100
random_frequency_base = 120
random_frequency_range = 30

# Noise~ object to generate white noise, simulating wave sound texture
noise = patch.place("noise~", num_objs=1, starting_pos=[starting_pos_x, starting_pos_y])[0]

# Creating lowpass svf~ filters with random cutoff frequencies to simulate various wave sounds
for i in range(num_waves):
    # Random frequency for the cutoff of the lowpass filter to simulate different wave sounds
    random_frequency = random_frequency_base + random.randint(-random_frequency_range, random_frequency_range)
    # Each svf~ filter represents a different "wave" with its own characteristics
    filter_frequency = f"svf~ {random_frequency} 0.5"  # Low-pass filter with random cutoff frequency
    wave_filter = patch.place(filter_frequency, num_objs=1, starting_pos=[starting_pos_x, starting_pos_y + (i+1) * vertical_spacing])[0]
    patch.connect([noise.outs[0], wave_filter.ins[0]])

# Metro object to simulate wave intervals, akin to waves hitting the shore periodically
metro = patch.place("metro 2000", num_objs=1, starting_pos=[starting_pos_x + 200, starting_pos_y])[0]  # 2000 ms interval

# Toggle to activate/deactivate the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[starting_pos_x + 100, starting_pos_y])[0]

# Connecting the toggle to metro for control
patch.connect([toggle.outs[0], metro.ins[0]])

# Multiplier (~) to control volume and achieve fading effect
vol_control = patch.place("*~ 0.2", num_objs=1, starting_pos=[starting_pos_x + 400, starting_pos_y])[0]  # volume control

# dac~ to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[starting_pos_x + 500, starting_pos_y])[0]

# Connect the volume control to the dac~
patch.connect([vol_control.outs[0], dac.ins[0]])
patch.connect([vol_control.outs[0], dac.ins[1]])

# Save the patch
patch_name = "waves1.maxpat"
patch.save(patch_name)

print(f"Patch '{patch_name}' has been saved. It simulates the sound of waves hitting the ocean with noise~ and svf~ for texture, and controlled by a metro object for rhythm.")
