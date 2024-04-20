import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Base frequency of the sine wave
base_freq = 220  # Base frequency in Hz

# Place the cycle~ object for the base sine wave
base_sine = patch.place("cycle~ " + str(base_freq), num_objs=1, starting_pos=[100, 100])[0]

# Create and place the partials
partials = []  # List to hold the partial objects
num_partials = 4  # Number of partials
partial_mul = 1.5  # Multiplier for the frequency of each partial

for i in range(num_partials):
    # Calculate the frequency for the partial
    freq = base_freq * ((i+1) * partial_mul)
    
    # Place the cycle~ object for the partial
    partial = patch.place("cycle~ " + str(freq), num_objs=1, starting_pos=[100*(i+2), 100])[0]
    
    # Add the partial to the list
    partials.append(partial)

# Create a [*~] object to control the overall amplitude of the signal
amplitude = patch.place("*~ 0.2", num_objs=1, starting_pos=[300, 300])[0]

# Connect the base sine and partials to the amplitude object
patch.connect([base_sine.outs[0], amplitude.ins[0]])
for partial in partials:
    patch.connect([partial.outs[0], amplitude.ins[0]])

# Create a [dac~] object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 300])[0]

# Connect the amplitude object to the [dac~]
patch.connect([amplitude.outs[0], dac.ins[0]])
patch.connect([amplitude.outs[0], dac.ins[1]])

# Save the patch
patch.save("add3.maxpat")