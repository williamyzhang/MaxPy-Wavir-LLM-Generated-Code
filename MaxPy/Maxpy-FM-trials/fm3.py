import maxpy as mp

# Create a new patch
patch = mp.MaxPatch()

# Carrier oscillator: sine wave at frequency 440 Hz
carrier = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Modulator oscillator: sine wave at a different frequency, e.g., 220 Hz
# This frequency can be considered the modulation frequency
modulator = patch.place("cycle~ 220", num_objs=1, starting_pos=[100, 200])[0]

# Multiply modulator signal, to control the modulation depth
modulation_depth = patch.place("*~ 100", num_objs=1, starting_pos=[100, 300])[0]

# Connect the modulator to the modulation depth multiplier
patch.connect([modulator.outs[0], modulation_depth.ins[0]])

# An object to combine the modulation signal with the carrier frequency (440 Hz in this case)
add = patch.place("+~ 440", num_objs=1, starting_pos=[300, 200])[0]

# Connect the modulation depth output to the add object
patch.connect([modulation_depth.outs[0], add.ins[0]])

# Connect the output of the add object to the frequency inlet of the carrier oscillator
patch.connect([add.outs[0], carrier.ins[0]])

# To hear the output, create a DAC~ object
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 100])[0]

# Connect the carrier (which is now being modulated in frequency by the modulator) to the DAC~
patch.connect([carrier.outs[0], dac.ins[0]])
patch.connect([carrier.outs[0], dac.ins[1]])

# Save the patch
patch.save("fm3.maxpat")