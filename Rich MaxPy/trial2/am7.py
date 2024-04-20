
import maxpy as mp
from random import randint

# Create a new MaxPatch
patch = mp.MaxPatch()

# Defining the number of modulator and carrier pairs
num_pairs = 5

# Random frequency range for modulators and carriers
freq_range = (100, 1000)

# Create a DAC object to hear the output
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 100])[0]

for i in range(num_pairs):
    # Random frequencies for modulator and carrier
    mod_freq = randint(*freq_range)
    car_freq = randint(*freq_range)
    
    # Create a modulator sine wave generator
    modulator = patch.place(f"cycle~ {mod_freq}", num_objs=1, starting_pos=[100, i*150 + 50])[0]
    
    # Create a carrier sine wave generator
    carrier = patch.place(f"cycle~ {car_freq}", num_objs=1, starting_pos=[100, i*150 + 75])[0]
    
    # Create a multiply object (~ for signal multiplication) to achieve AM synthesis
    am = patch.place("*~", num_objs=1, starting_pos=[300, i*150 + 62])[0]
    
    # Connect modulator and carrier to the multiplier
    patch.connect([modulator.outs[0], am.ins[0]])
    patch.connect([carrier.outs[0], am.ins[1]])
    
    # Connect the AM synthesis output to the DAC
    patch.connect([am.outs[0], dac.ins[i % 2]])  # alternating between left and right channel

# Save the patch
patch.save("am7.maxpat")
