import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Create a sine wave oscillator
oscillator = patch.place("cycle~ 440", num_objs=1, starting_pos=[0, 0])[0]

# Create an amplitude modulation oscillator
am_oscillator = patch.place("cycle~ 10", num_objs=1, starting_pos=[100, 0])[0]

# Create a multiplier to apply amplitude modulation on the sine wave
multiplier = patch.place("*~", num_objs=1, starting_pos=[200, 0])[0]

# Create a DAC to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 0])[0]

# Connect the oscillator to the multiplier
patch.connect([oscillator.outs[0], multiplier.ins[0]])

# Connect the AM oscillator to the other inlet of the multiplier
patch.connect([am_oscillator.outs[0], multiplier.ins[1]])

# Connect the multiplier to the DAC to output sound
patch.connect([multiplier.outs[0], dac.ins[0]])
patch.connect([multiplier.outs[0], dac.ins[1]])

# Save the patch
patch.save("AM8.maxpat")