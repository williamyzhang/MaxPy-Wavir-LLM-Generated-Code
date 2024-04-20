import maxpy as mp
from random import randint

# Initialize the patch
patch = mp.MaxPatch()

# Specify the number of FM operators to create
num_operators = 5

# Base frequency for the carrier and modulator
base_freq = 440

# Create carrier and modulator sine waves with random modulation depths and frequencies
carriers = patch.place("cycle~", num_objs=num_operators, starting_pos=[50, 100])
modulators = patch.place("cycle~", num_objs=num_operators, starting_pos=[150, 100])
mod_depths = patch.place("*~", num_objs=num_operators, starting_pos=[250, 100])
mod_freqs = patch.place("*~", num_objs=num_operators, starting_pos=[350, 100])

# Iterate through the carriers and modulators to connect and set random parameters
for i in range(num_operators):
    # Set a random modulation frequency range between 0.1 to 20 Hz
    mod_frequency = randint(1, 20)
    # Set a random depth of modulation between 50 to 500 Hz
    mod_depth = randint(50, 500)

    # Update the modulator frequencies and modulation depths
    patch.place("float " + str(mod_frequency), num_objs=1, starting_pos=[200, 110 + i*100])[0].connect(mod_freqs[i])
    patch.place("float " + str(mod_depth), num_objs=1, starting_pos=[300, 110 + i*100])[0].connect(mod_depths[i])

    # Connect modulators to their frequency and depth controls
    modulators[i].connect(mod_freqs[i])
    mod_freqs[i].connect(mod_depths[i])
    
    # Apply FM synthesis by connecting the modulation depth to the carrier frequency
    mod_depths[i].connect(carriers[i], in_index=1)

# Create a DAC to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 300])[0]

# Connect the carriers to the DAC for output
for carrier in carriers:
    carrier.connect(dac)

# Save the Max patch
patch.save("fm3.maxpat")
