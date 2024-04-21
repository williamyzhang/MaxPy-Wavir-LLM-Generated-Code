import maxpy as mp

# Step 1: Create a new Max patch
patch = mp.MaxPatch()

# Step 2: Create cycle~ objects for carrier and modulator
carrier_freq = 440  # Carrier frequency in Hertz
modulator_freq = 220  # Modulator frequency in Hertz
modulation_index = 100  # Modulation Index for depth of FM

carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]
modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[100, 200])[0]

# Step 3: Create an *~ object for modulation index
mod_index = patch.place("*~", num_objs=1, starting_pos=[300, 200])[0]

# Set modulation index (depth of FM)
mod_depth = patch.place(f"float {modulation_index}", num_objs=1, starting_pos=[200, 200])[0]

# Step 4: Summarize the modulation depth with the carrier frequency
sum = patch.place("+~", num_objs=1, starting_pos=[400, 150])[0]

# Step 5: Connect everything together
patch.connect([modulator.outs[0], mod_index.ins[0]])
patch.connect([mod_depth.outs[0], mod_index.ins[1]])
patch.connect([mod_index.outs[0], sum.ins[0]])
patch.connect([carrier.outs[0], sum.ins[1]])

# Use a dac~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 150])[0]
patch.connect([sum.outs[0], dac.ins[0]])

# Step 6: Save the patch
patch.save("fm6.maxpat")