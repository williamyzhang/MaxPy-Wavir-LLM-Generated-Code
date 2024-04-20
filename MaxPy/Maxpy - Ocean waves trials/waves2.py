import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# We'll use 'pink~' noise as it gives a softer, more ocean-like sound than white noise
pink_noise = patch.place("pink~", num_objs=1, starting_pos=[50, 0])[0]

# We add a 'filtergraph~' and 'biquad~' object to shape the noise into more of an ocean wave sound
filter_graph = patch.place("filtergraph~", num_objs=1, starting_pos=[50, 50])[0]
biquad = patch.place("biquad~", num_objs=1, starting_pos=[50, 100])[0]

# Connect pink noise to 'biquad~' through 'filtergraph~' for filtering
patch.connect([pink_noise.outs[0], filter_graph.ins[0]])
patch.connect([filter_graph.outs[0], biquad.ins[0]])

# Add a cycle~ object to create a low-frequency oscillation to modulate the amplitude (simulate wave intensity)
lfo_freq = 0.2 # Frequency of LFO in Hz (slow oscillation to simulate waves)
lfo = patch.place(f"cycle~ {lfo_freq}", num_objs=1, starting_pos=[200, 0])[0]

# Adding 'scale~' to adjust the range of LFO output suitable for modulation
scale = patch.place("scale~ 0 1 0.5 1", num_objs=1, starting_pos=[200, 50])[0]

# Adding '*' object to modulate the amplitude of the wave sound
amp_modulate = patch.place("*~", num_objs=1, starting_pos=[200, 100])[0]

# Connections for amplitude modulation
patch.connect([lfo.outs[0], scale.ins[0]])
patch.connect([scale.outs[0], amp_modulate.ins[1]])
patch.connect([biquad.outs[0], amp_modulate.ins[0]])

# Connect the modulated signal to the output
dac = patch.place("dac~", num_objs=1, starting_pos=[200, 150])[0]
patch.connect([amp_modulate.outs[0], dac.ins[0]])
patch.connect([amp_modulate.outs[0], dac.ins[1]])

# Save the patch
patch.save("waves2.maxpat")