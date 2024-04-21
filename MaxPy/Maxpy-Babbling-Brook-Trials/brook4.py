import maxpy

# Initialize a new patcher
patcher = maxpy.MaxPatcher(name="BabblingBrook")

# Generate white noise sources
for i in range(1, 4):
    noise = patcher.create_object("white~", name=f"noise{i}", x=100*i, y=50)
    
    # Apply band-pass filters with varying frequencies to simulate water characteristics
    bp = patcher.create_object("biquad~", args=[0.5, 0.0, 1.0, 0.0, 0.0], name=f"bp_filter{i}", x=120*i, y=150)
    patcher.create_connection(noise, 0, bp, 0)
    
    # Create random modulation for filter frequency to vary the sound
    rand = patcher.create_object("random", args=1000, name=f"rand{i}", x=120*i, y=250)
    rand_mul = patcher.create_object("*", args=0.002, name=f"rand_mul{i}", x=120*i, y=350)
    patcher.create_object("loadbang", x=80*i, y=280).connect_to(rand)
    patcher.create_connection(rand, 0, rand_mul, 0)
    patcher.create_connection(rand_mul, 0, bp, 1)  # Connect modulation to the bp filter's frequency
    
    # Connect the filters output to the patcher output
    patcher.create_object("dac~", x=500, y=500).connect_from(bp, 0).connect_from(bp, 1) 

# Add reverb for space simulation
reverb = patcher.create_object("reverb~", args=[0.8, 0.8], name="reverb", x=700, y=500)
for i in range(1, 4):
    patcher.create_connection(patcher.get_object_by_name(f"bp_filter{i}"), 0, reverb, 0)

# Finally, connect the reverb to the output
patcher.create_object("dac~", x=800, y=600).connect_from(reverb, 0).connect_from(reverb, 1)

# Save patch
patcher.save("brook4.maxpat")