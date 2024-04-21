import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Number of noise generators to simulate different "streams" within the brook
num_streams = 5

# Initial position for object placement
starting_x = 100
starting_y = 100
spacing_y = 50  # Spacing between streams

# Create noise generators, filters, and dac for output
dac = patch.place("dac~", num_objs=1, starting_pos=[starting_x + 500, starting_y + 100])[0]
for i in range(num_streams):
    y_pos = starting_y + (i * spacing_y)
    noise = patch.place("noise~", num_objs=1, starting_pos=[starting_x, y_pos])[0]
    filter_freq = 200 + (i * 100)  # Baseline frequency for the filter
    resonance = 0.2  # Low resonance to simulate water's smooth flow
    filter = patch.place(f"svf~ {filter_freq} {resonance}", num_objs=1, starting_pos=[starting_x + 100, y_pos])[0]
    scale = patch.place("scale 0. 1. 0.1 1.", num_objs=1, starting_pos=[starting_x + 200, y_pos])[0]
    random = patch.place("random 1000", num_objs=1, starting_pos=[starting_x + 300, y_pos])[0]
    metro = patch.place("metro 500", num_objs=1, starting_pos=[starting_x + 400, y_pos])[0]
    
    # Connect objects
    patch.connect([[noise.outs[0], filter.ins[0]]])
    patch.connect([[filter.outs[0], scale.ins[0]]])
    patch.connect([[scale.outs[0], dac.ins[i % 2]]])  # Alternate left and right channels
    patch.connect([[metro.outs[0], random.ins[0]]])
    patch.connect([[random.outs[0], scale.ins[2]]])

# Save the generated MaxPatch
patch.save("BB8.maxpat")