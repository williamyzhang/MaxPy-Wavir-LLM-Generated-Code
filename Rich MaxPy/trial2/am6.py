
import maxpy as mp
import random

# Create a MaxPatch object
patch = mp.MaxPatch()

# Create a DAC to output the final audio signal
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 600])[0]

# Generate a sine wave carrier
carrier_freq = 440  # Frequency in Hz
carrier = patch.place("cycle~ {}".format(carrier_freq), num_objs=1, starting_pos=[100, 100])[0]

# Generate a modulator sine wave with a randomly chosen frequency between 10 and 100 Hz
modulator_freq = random.randint(10, 100)  
modulator = patch.place("cycle~ {}".format(modulator_freq), num_objs=1, starting_pos=[100, 200])[0]

# Generate a multiplier object to apply the AM synthesis
# The multiplier will take the carrier and modulator as inputs to modulate the amplitude
multiplier = patch.place("*~", num_objs=1, starting_pos=[200, 400])[0]

# Connect the carrier and modulator to the multiplier
patch.connect([carrier.outs[0], multiplier.ins[0]])
patch.connect([modulator.outs[0], multiplier.ins[1]])

# Connect the output of the multiplier to the DAC for audio output
patch.connect([multiplier.outs[0], dac.ins[0]])

# Save the patch
patch_name = "am6.maxpat"
patch.save(patch_name)

