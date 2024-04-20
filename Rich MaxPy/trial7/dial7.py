import maxpy as mp
import random

# Create a new Max patch
patch = mp.MaxPatch()

# Define the base frequencies for the dual-tone
base_freq1 = 350
base_freq2 = 440

# Number of pairs of tones
numPairs = 2

# Starting position for the first pair of cycle~ objects
starting_pos = [50, 50]

# Loop to create the pairs of cycle~ objects
for i in range(numPairs):
    # Randomize frequencies slightly around the base frequencies
    freq1 = base_freq1 + random.uniform(-10, 10)
    freq2 = base_freq2 + random.uniform(-10, 10)
    
    # Create two cycle~ objects for each pair
    cyc1 = patch.place(f"cycle~ {freq1}", num_objs=1, starting_pos=starting_pos)[0]
    cyc2 = patch.place(f"cycle~ {freq2}", num_objs=1, starting_pos=[starting_pos[0] + 100, starting_pos[1]])[0]
    
    # Create a *~ object to combine (mix) the tones
    mix = patch.place("*~ 0.5", num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + 50])[0]
    
    # Connect the cycle~ objects to the *~ object
    patch.connect([cyc1.outs[0], mix.ins[0]])
    patch.connect([cyc2.outs[0], mix.ins[1]])
    
    # Adjust the starting position for the next pair
    starting_pos[1] += 150  # Move down for the next pair to avoid overlap

# Create a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[50, starting_pos[1] + 100])[0]

# Connect the *~ objects to the dac~ object
for i in range(numPairs):
    patch.connect([(i*2+3).outs[0], dac.ins[0]])  # Connect left channel
    patch.connect([(i*2+3).outs[0], dac.ins[1]])  # Connect right channel

# Save the Max patch
patch.save("dial7.maxpat")
