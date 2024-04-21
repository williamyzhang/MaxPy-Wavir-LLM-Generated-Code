import maxpy as mp

# Create a new patch
patch = mp.MaxPatch()

# Carrier sine wave generator at 440Hz
carrier = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Modulator sine wave generator, which will modulate the amplitude of the carrier.
# Assuming we want a modulation frequency of 50Hz. Increasing the modulation frequency
# can result in a more noticeable AM effect.
modulator = patch.place("cycle~ 50", num_objs=1, starting_pos=[100, 200])[0]

# Multiplier to achieve AM synthesis
# The output of the modulator will modulate the amplitude of the carrier signal
multiply = patch.place("*~", num_objs=1, starting_pos=[100, 300])[0]

# Connect the carrier to the left inlet of the multiplier
patch.connect([carrier.outs[0], multiply.ins[0]])

# Connect the modulator to the right inlet of the multiplier
# This connection carries the modulating signal that will affect the amplitude of the
# carrier signal through multiplication
patch.connect([modulator.outs[0], multiply.ins[1]])

# DAC to output the modulated signal
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 400])[0]

# Connect the output of the multiply object to the DAC for sound output
patch.connect([multiply.outs[0], dac.ins[0]])
# If stereo output is desired, also connect to the second inlet of the dac~
patch.connect([multiply.outs[0], dac.ins[1]])

# Save the patch
patch.save("am2.maxpat")