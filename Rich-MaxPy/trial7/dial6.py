import maxpy as mp
import random

# Create a new patch
patch = mp.MaxPatch()

# Define the base frequencies for the dial tone
base_frequencies = [350, 440]

# Use a for loop to generate two cycle~ objects for the dial tone frequencies
for i, freq in enumerate(base_frequencies):
    # Add a small random variation to each frequency to mimic real-world fluctuations
    variation = random.uniform(-0.5, 0.5)
    freq_with_variation = freq + variation
    
    # Place the cycle~ object with the slightly varied frequency
    osc = patch.place(f"cycle~ {freq_with_variation}", num_objs=1, starting_pos=[100 * i, 100])[0]
    
    # If this is not the first oscillator, connect its output to the second input of a *~ object for mixing
    if i > 0:
        # Create a *~ object for mixing the two frequencies
        mixer = patch.place("*~", num_objs=1, starting_pos=[200, 150])[0]
        # Connect the previous oscillator to the first input of the mixer
        patch.connect([(prev_osc.outs[0], mixer.ins[0])])
        # Connect the current oscillator to the second input of the mixer
        patch.connect([(osc.outs[0], mixer.ins[1])])
    
    # Keep a reference to the oscillator for the next iteration
    prev_osc = osc

# Use a dac~ object to output the mixed signal
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 200])[0]
# Connect the mixer's output to the dac~
patch.connect([(mixer.outs[0], dac.ins[0])])
patch.connect([(mixer.outs[0], dac.ins[1])])

# Save the patch
patch.save("dial6.maxpat")
