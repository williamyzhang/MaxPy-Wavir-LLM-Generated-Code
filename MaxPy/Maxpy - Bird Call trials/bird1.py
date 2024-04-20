import maxpy as mp

patch = mp.MaxPatch()

# Step 1: Random Pitch Generation
frequency_base = 400  # Base frequency for pitches
frequency_max_variation = 200  # Max variation in frequency
random_frequency = patch.place(f"random {frequency_max_variation}", num_objs=1, starting_pos=[100, 50])[0]

# Step 2: Envelopes for Natural Decay
adsr = patch.place("adsr~ 50 200 0.5 250", num_objs=1, starting_pos=[200, 100])[0]

# Step 3: Oscillator with random pitch input
oscillator = patch.place("cycle~", num_objs=1, starting_pos=[300, 150])[0] 

# Connections
patch.connect([random_frequency.outs[0], oscillator.ins[0]])
patch.connect([oscillator.outs[0], adsr.ins[0]])

# Step 4: Output
dac = patch.place("ezdac~", num_objs=1, starting_pos=[400, 200])[0]
patch.connect([adsr.outs[0], dac.ins[0]])

# Saving the Patch
patch.save("bird1.maxpat")