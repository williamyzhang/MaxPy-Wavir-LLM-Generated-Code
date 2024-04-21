import maxpy as mp
import random

patch = mp.MaxPatch()

# Parameters
num_waves = 20  # Number of waves to simulate
starting_pos = [20, 20]  # Initial position for placing objects, will be updated
spacing = 80  # Vertical spacing between objects

# Creating a white noise source to serve as the base for our wave sound
noise = patch.place("noise~", num_objs=1, starting_pos=starting_pos)[0]

# Modulate the noise with a series of lowpass filters to simulate waves hitting the shore
for i in range(num_waves):
    # Increment position for each wave
    starting_pos[1] += spacing
    # Randomize the frequency cut-off between 100-1000 Hz and resonance between 0.1-0.5 to mimic natural variety in wave sounds
    freq = random.uniform(100, 1000)  # Cut-off frequency, simulating wave 'size'
    res = random.uniform(0.1, 0.5)  # Resonance, simulating wave 'sharpness'
    # Create a svf~ object for each wave, configured with random parameters
    filter = patch.place(f"svf~ {freq} {res}", num_objs=1, starting_pos=starting_pos)[0]
    # Connect the white noise to the lowpass filter
    patch.connect([noise.outs[0], filter.ins[0]])

# Adding a DAC~ for output
starting_pos[1] += spacing
dac = patch.place("dac~", num_objs=1, starting_pos=starting_pos)[0]

# Connect the last lowpass filter to the DAC~
patch.connect([filter.outs[0], dac.ins[0]])
patch.connect([filter.outs[0], dac.ins[1]])

# Saving the patch
patch.save("waves9.maxpat")
