import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Carrier oscillator - Sine wave at, for example, 440Hz
carrier_freq = 440
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Modulator oscillator - Sine wave at, for example, 1Hz (to modulate the amplitude of the carrier)
modulator_freq = 1
modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[100, 150])[0]

# Multiply carrier and modulator to achieve AM synthesis
multiply = patch.place("*~", num_objs=1, starting_pos=[250, 125])[0]

# Connect carrier and modulator to the *~ object
patch.connect([carrier.outs[0], multiply.ins[0]])
patch.connect([modulator.outs[0], multiply.ins[1]])

# Create a DAC~ object to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 125])[0]

# Connect the multiply object to the DAC
patch.connect([multiply.outs[0], dac.ins[0]])
patch.connect([multiply.outs[0], dac.ins[1]])

# Save the patch
patch.save("am1.maxpat")