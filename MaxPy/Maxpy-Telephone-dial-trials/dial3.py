import maxpy as mp 

# Initialize the new patch
patch = mp.MaxPatch()

# Creating cycle~ objects for the two frequencies of the dial tone
tone1 = patch.place("cycle~ 350", num_objs=1, starting_pos=[100, 100])[0]  # 350Hz tone
tone2 = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 200])[0]  # 440Hz tone

# Creating a *~ object for changing amplitude 
amplitude = patch.place("*~ 0.1", num_objs=1, starting_pos=[200, 150])[0]  # Lower the amplitude

# Creating a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 125])[0]

# Connect the cycle~ objects to the *~ object
patch.connect([tone1.outs[0], amplitude.ins[0]])  # Connect tone1 to left inlet of amplitude
patch.connect([tone2.outs[0], amplitude.ins[1]])  # Connect tone2 to right inlet of amplitude

# Connect the *~ object to the dac~
patch.connect([amplitude.outs[0], dac.ins[0]])    # Connect to left inlet of dac~
patch.connect([amplitude.outs[0], dac.ins[1]])    # Connect to right inlet of dac~ for stereo output

# Save the patch
patch.save("dial3.maxpat")