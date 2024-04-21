import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Place a cycle~ object for the fundamental sine wave
fundamental_freq = 220  # Fundamental frequency in Hz
fundamental_sine = patch.place(f"cycle~ {fundamental_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Create partials above the fundamental frequency
partials = []
partials_frequencies = [fundamental_freq * (i+2) for i in range(4)]  # Generate 4 partial frequencies
starting_positions = [[200, 150], [300, 200], [400, 250], [500, 300]]  # Start positions for the partials
for freq, pos in zip(partials_frequencies, starting_positions):
    partial = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=pos)[0]
    partials.append(partial)

# Place an "+~" object to add the signals together
adder = patch.place("+~", num_objs=1, starting_pos=[600, 350])[0]

# Connect the fundamental and the partials to the adder
patch.connect([fundamental_sine.outs[0], adder.ins[0]])
for partial in partials:
    patch.connect([partial.outs[0], adder.ins[0]])

# Place a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[700, 400])[0]

# Connect the adder to the dac~
patch.connect([adder.outs[0], dac.ins[0]])
patch.connect([adder.outs[0], dac.ins[1]])

# Save the patch
patch.save("add4.maxpat")