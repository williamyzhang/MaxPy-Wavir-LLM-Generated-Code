import maxpy as mp
import random

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Set the starting position
start_pos = [100, 100]

# Number of operators in FM synthesis
num_operators = 5

# Place the cycle~ objects for the carrier and the modulators
carrier_freq = 440  # Carrier frequency in Hz
mod_index = 100  # Modulation index
operators = []

# Carrier
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=start_pos)[0]
operators.append(carrier)

# Modulators
for i in range(num_operators):
    # Random frequency for the modulator
    freq = random.randint(20, 1000)
    # Calculate next object's starting position
    ypos = start_pos[1] + (i * 50)
    modulator = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[start_pos[0], ypos])[0]
    operators.append(modulator)

# Connect modulators to the carrier's frequency input through a multiplication operator to implement FM synthesis
for i in range(1, len(operators)):
    multiply = patch.place("*~", num_objs=1, starting_pos=[200, start_pos[1] + 30*i])[0]
    add = patch.place(f"+~ {mod_index}", num_objs=1, starting_pos=[300, start_pos[1] + 30*i])[0]
    patch.connect([operators[i].outs[0], multiply.ins[0]])
    patch.connect([multiply.outs[0], add.ins[0]])
    patch.connect([add.outs[0], carrier.ins[0]])

# Place a dac~ object to output the sound and connect it
dac = patch.place("dac~", num_objs=1, starting_pos=[500, start_pos[1]])[0]
patch.connect([carrier.outs[0], dac.ins[0]])

# Save the patch
patch.save("fm1.maxpat")
