import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place a DAC~ to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 200])[0]

# Place a cycle~ object for the fundamental frequency (e.g., 440 Hz)
fundamental_freq = 440
fund_cycle = patch.place(f"cycle~ {fundamental_freq}", num_objs=1, starting_pos=[0, 0])[0]

# Connect the fundamental frequency cycle~ to both left and right channels of the DAC~
patch.connect([fund_cycle.outs[0], dac.ins[0]])
patch.connect([fund_cycle.outs[0], dac.ins[1]])

# Generate 4 partials above the fundamental
num_partials = 4
for i in range(1, num_partials + 1):
    partial_freq = fundamental_freq * (i + 1)  # Calculate the frequency of the partial
    partial_cycle = patch.place(f"cycle~ {partial_freq}", num_objs=1, starting_pos=[0, 50 * i])[0]

    # Connect each partial to both left and right channels of the DAC~, with individual connections for clarity
    patch.connect([partial_cycle.outs[0], dac.ins[0]])
    patch.connect([partial_cycle.outs[0], dac.ins[1]])

# Save the patch
patch.save("add6.maxpat")