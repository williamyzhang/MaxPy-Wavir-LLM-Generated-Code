import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Place a toggle to control the sine wave generation
tg = patch.place("toggle", num_objs=1, starting_pos=[0, 0])[0]

# Place two cycle~ objects: one for the carrier and one for the modulator
carrier_freq = 440  # Carrier frequency in Hz
modulator_freq = 10  # Modulator frequency in Hz
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]
modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[100, 200])[0]

# Place a *~ object to multiply the carrier and modulator signals
mult = patch.place("*~", num_objs=1, starting_pos=[300, 150])[0]

# Place a dac~ object to output the audio signal
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 150])[0]

# Connect the toggle to both cycle~ objects to start/stop them
patch.connect([tg.outs[0], carrier.ins[0]])
patch.connect([tg.outs[0], modulator.ins[0]])

# Connect the carrier and modulator to the *~ object
patch.connect([carrier.outs[0], mult.ins[0]])
patch.connect([modulator.outs[0], mult.ins[1]])

# Connect the *~ object to the dac~ to output the signal
patch.connect([mult.outs[0], dac.ins[0]])
patch.connect([mult.outs[0], dac.ins[1]])

# Save the patch
patch.save("am3.maxpat")