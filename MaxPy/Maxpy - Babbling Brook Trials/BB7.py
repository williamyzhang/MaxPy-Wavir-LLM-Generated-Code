import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Phasor for modulating cycle~ frequencies to simulate the babbling effect
phasor = patch.place("phasor~ 0.05", num_objs=1, starting_pos=[0, 0])[0]

# Number of "water droplets" to simulate the babbling brook
num_droplets = 10

# Create cycle~ objects representing water droplets with randomized frequencies
droplets = patch.place("cycle~", num_objs=num_droplets, starting_pos=[100, 50])

for i, droplet in enumerate(droplets):
    # Random frequency for cycle~ to simulate water droplet sound
    random_freq = patch.place(f"random 200 600", num_objs=1, starting_pos=[i*50, 120])[0]
    
    # Connect phasor to random to modulate frequencies over time
    patch.connect([(phasor.outs[0], random_freq.ins[0])])
    
    # Fixed value to ensure random triggers
    patch.place("loadbang", num_objs=1, starting_pos=[i*50, 90])[0]
    patch.connect([(random_freq.outs[0], droplet.ins[0])])

# Lowpass filter to smooth the sound, simulating water's acoustic property
filter = patch.place("svf~ 500 0.7", num_objs=1, starting_pos=[200, 200])[0]

# Connecting all droplets to the lowpass filter
for i, droplet in enumerate(droplets):
    patch.connect([(droplet.outs[0], filter.ins[0])])

# Output the final sound
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 250])[0]
patch.connect([(filter.outs[0], dac.ins[0])])
patch.connect([(filter.outs[1], dac.ins[1])])

# Save the Max patch
patch.save("BB7.maxpat")