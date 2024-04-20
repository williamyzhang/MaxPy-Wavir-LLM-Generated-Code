
import maxpy as mp
import random

# Create a new MaxPatch object
patch = mp.MaxPatch()

# Create a phasor to drive the modulation frequency
mod_freq = random.randint(1, 20)  # Modulation frequency in Hz
phasor = patch.place("phasor~ {}".format(mod_freq), num_objs=1, starting_pos=[0, 50])[0]

# Carrier frequency sine wave
carrier_freq = random.randint(200, 400)  # Carrier frequency in Hz
carrier = patch.place("cycle~ {}".format(carrier_freq), num_objs=1, starting_pos=[100, 100])[0]

# Modulation depth
mod_depth = 0.5  # Amount of modulation

# Create an *~ object to modulate the amplitude of the carrier signal
multiply = patch.place("*~", num_objs=1, starting_pos=[200, 100])[0]

# Connect the phasor~ to *~ object to control modulation depth
patch.connect([phasor.outs[0], multiply.ins[0]])

# Connect the carrier sine wave (cycle~) to one of the inputs of the *~ object
patch.connect([carrier.outs[0], multiply.ins[1]])

# Create an output for our AM synthesis
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 100])[0]

# Connect the output of the *~ object to the dac~ for audio output
patch.connect([multiply.outs[0], dac.ins[0]])
patch.connect([multiply.outs[1], dac.ins[1]])

# Save the patch
patch.save("am9.maxpat")
