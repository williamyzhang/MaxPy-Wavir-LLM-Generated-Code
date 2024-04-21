import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Place a metro object to trigger bangs at a steady rate, simulating water drops
metro = patch.place("metro 500", num_objs=1, starting_pos=[0, 0])[0]

# Place a toggle to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[0, -50])[0]

# Connect toggle to metro to control it
patch.connect([toggle.outs[0], metro.ins[0]])

# Place a random object to generate random numbers for pitch, simulating the randomness of water drops
rand = patch.place("random 1000", num_objs=1, starting_pos=[100, 0])[0]

# Place a scale object to scale the random numbers to a frequency range (100-1000 Hz)
scale = patch.place("scale 0 1000 100 1000", num_objs=1, starting_pos=[200, 0])[0]

# Place a cycle~ object for a smooth sinusoidal tone
osc = patch.place("cycle~", num_objs=1, starting_pos=[300, 0])[0]

# Connect the metro to random to trigger new random numbers
patch.connect([metro.outs[0], rand.ins[0]])

# Connect the random output to scale to fit our desired frequency range
patch.connect([rand.outs[0], scale.ins[0]])

# Finally, connect the scaled output to the cycle~ object's frequency inlet
patch.connect([scale.outs[0], osc.ins[0]])

# Place a *~ object with an argument of 0.1 to control the volume (reducing the amplitude of the cycle~)
volume = patch.place("*~ 0.1", num_objs=1, starting_pos=[400, 0])[0]

# Connect the oscillator to the volume control
patch.connect([osc.outs[0], volume.ins[0]])

# Place a dac~ object to output the sound to speakers
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 0])[0]

# Connect the volume control to both left and right channels of dac~
patch.connect([volume.outs[1], dac.ins[0]])
patch.connect([volume.outs[1], dac.ins[1]])

# Save the patch
patch.save("brook3.maxpat")