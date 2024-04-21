import maxpy as mp
import random

patch = mp.MaxPatch()

# The standard frequencies for a North American dial tone are 350 Hz and 440 Hz.
# We'll apply a slight random variation to these frequencies each time the patch is initiated.
base_freq_1 = 350
base_freq_2 = 440
var_freq_range = 10  # Frequency variation range

# Generate two cycle~ objects for generating sine waves at dial tone frequencies
# Applying random variation to the base frequencies
freq_1 = base_freq_1 + random.uniform(-var_freq_range, var_freq_range)
freq_2 = base_freq_2 + random.uniform(-var_freq_range, var_freq_range)

# Create cycle~ objects with the randomized frequencies
tone1 = patch.place(f"cycle~ {freq_1}", num_objs=1, starting_pos=[100, 100])[0]
tone2 = patch.place(f"cycle~ {freq_2}", num_objs=1, starting_pos=[100, 150])[0]

# Create a gain object to control the amplitude of the output
gain = patch.place("gain~", num_objs=1, starting_pos=[300, 125])[0]

# Connect both tones to the gain object
patch.connect([tone1.outs[0], gain.ins[0]])
patch.connect([tone2.outs[0], gain.ins[0]])

# Save the patch
patch.save("dial2.maxpat")
