import maxpy as mp 

patch = mp.MaxPatch()

# Let's create an LFO to modulate the pitch slightly for our "water" sounds
lfo = patch.place("cycle~ 0.1", num_objs=1, starting_pos=[80, 20])[0]

# Create a white noise generator as a base for our brook
noise = patch.place("noise~", num_objs=1, starting_pos=[80, 50])[0]

# Modulate the noise with the LFO to create a water-like sound
mult = patch.place("*~", num_objs=1, starting_pos=[80, 80])[0]

# Set up a low pass filter resonating to give the noise more of a liquid quality
filter = patch.place("svf~ 500 2.0", num_objs=1, starting_pos=[80, 110])[0]

# Generate random numbers to dynamically change the cutoff frequency of our filter,
# simulating variation in the water's flow
random = patch.place("random 120", num_objs=1, starting_pos=[300, 20])[0]
scale = patch.place("*~ 10", num_objs=1, starting_pos=[300,50])[0]  # Scale the random output
metro = patch.place("metro 2000", num_objs=1, starting_pos=[300, 80])[0]  # Trigger the random value
    
toggle = patch.place("toggle", num_objs=1, starting_pos=[300, 110])[0]  # Turn on/off the metro

# Connect everything together
patch.connect([toggle.outs[0], metro.ins[0]])
patch.connect([metro.outs[0], random.ins[0]])
patch.connect([random.outs[0], scale.ins[0]])
patch.connect([scale.outs[0], filter.ins[0]])

patch.connect([lfo.outs[0], mult.ins[0]])
patch.connect([noise.outs[0], mult.ins[1]])
patch.connect([mult.outs[0], filter.ins[1]])

# Finally, add a dac~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[80, 140])[0]

# Connect the filtered noise to the dac
patch.connect([filter.outs[0], dac.ins[0]])
patch.connect([filter.outs[0], dac.ins[1]])

# Save the patch
patch.save("BB10.maxpat")