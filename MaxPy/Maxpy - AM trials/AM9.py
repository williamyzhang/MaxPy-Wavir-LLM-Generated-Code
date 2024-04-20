import maxpy as mp

# Create a new MaxPatch object
patch = mp.MaxPatch()

# Create a carrier oscillator
carrier_freq = 440  # Frequency of the carrier in Hz
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Create a modulator oscillator with a lower frequency for AM synthesis
modulator_freq = 50  # Frequency of the modulator in Hz for AM synthesis
modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[100, 200])[0]

# Create a multiplier (*) object to modulate the amplitude of the carrier
multiply = patch.place("*~", num_objs=1, starting_pos=[300, 150])[0]

# Connect the carrier to the left inlet of the multiplier
patch.connect([carrier.outs[0], multiply.ins[0]])

# Connect the modulator to the right inlet of the multiplier (which controls amplitude)
patch.connect([modulator.outs[0], multiply.ins[1]])

# Create a dac~ object to output sound to speakers
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 150])[0]

# Connect the output of the multiplier to the input of the dac~
patch.connect([multiply.outs[0], dac.ins[0]])
patch.connect([multiply.outs[0], dac.ins[1]])

# Save the patch
patch.save("AM9.maxpat")