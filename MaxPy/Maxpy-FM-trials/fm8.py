import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Place a carrier oscillator with a base frequency of 220 Hz
carrier_freq = 220
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[200, 100])[0]

# Place a modulator oscillator with a frequency of 1 Hz and a modulation index of 100
# This means the modulator frequency will affect the carrier frequency in a range of +/- 100 Hz
modulator_freq = 1
modulation_index = 100
modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[0, 100])[0]
mod_index = patch.place(f"*~ {modulation_index}", num_objs=1, starting_pos=[50, 150])[0]

# Add the modulation index to the carrier frequency
modulated_freq = patch.place(f"+~ {carrier_freq}", num_objs=1, starting_pos=[250, 150])[0]

# Connect the modulator to the modulation index multiplier
patch.connect([modulator.outs[0], mod_index.ins[0]])

# Connect the modulation index output to the addition operator that modulates the carrier
patch.connect([mod_index.outs[0], modulated_freq.ins[0]])

# Connect modulated frequency to the carrier frequency input
patch.connect([modulated_freq.outs[0], carrier.ins[0]])

# Add a dac~ object to output the sound to the speakers
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 200])[0]

# Connect the carrier signal to the dac~ to hear it
patch.connect([carrier.outs[0], dac.ins[0]])
patch.connect([carrier.outs[0], dac.ins[1]])

# Save the patch
patch.save("fm8.maxpat")