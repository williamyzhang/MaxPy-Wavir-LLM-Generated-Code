import maxpy as mp 

# Creating the patch object
patch = mp.MaxPatch()

# Creating white noise source
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Creating a lowpass filter with an initial cutoff frequency
# We'll modulate this frequency to simulate water flow variations
filter_cutoff = 500  # Initial cutoff frequency in Hz
resonance = 0.5  # Low resonance for a smoother filter sound
lpf = patch.place(f"svf~ {filter_cutoff} {resonance}", num_objs=1, starting_pos=[100, 200])[0]

# Creating an LFO to modulate the filter cutoff frequency
lfo_freq = 0.2  # LFO frequency in Hz, for a gentle modulation
lfo = patch.place(f"cycle~ {lfo_freq}", num_objs=1, starting_pos=[100, 300])[0]

# Scaling the LFO output to suitable filter cutoff modulation range
lfo_scale_min, lfo_scale_max = 200, 800  # Modulation range for cutoff frequency
scale = patch.place(f"*~ {(lfo_scale_max - lfo_scale_min)}", num_objs=1, starting_pos=[100, 400])[0]
offset = patch.place(f"+~ {lfo_scale_min}", num_objs=1, starting_pos=[100, 450])[0]

# Creating an object to control the overall volume, simulating volume variations of water flow
vol_mod_min, vol_mod_max = 0.3, 0.7  # Volume modulation range (0 to 1)
vol_rand = patch.place("random 400", num_objs=1, starting_pos=[200, 500])[0]
vol_scale = patch.place("*~ 0.002", num_objs=1, starting_pos=[200, 550])[0]  # Scale random values down
vol_offset = patch.place(f"+~ {vol_mod_min}", num_objs=1, starting_pos=[200, 600])[0]

# Creating the speaker output
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 700])[0]

# Connecting the objects to create the signal flow
patch.connect([noise.outs[0], lpf.ins[0]])
patch.connect([lpf.outs[0], dac.ins[0]])
patch.connect([lpf.outs[0], dac.ins[1]])
patch.connect([lfo.outs[0], scale.ins[0]])
patch.connect([scale.outs[0], offset.ins[0]])
patch.connect([offset.outs[0], lpf.ins[2]])  # Modulating filter cutoff
patch.connect([vol_rand.outs[0], vol_scale.ins[0]])
patch.connect([vol_scale.outs[0], vol_offset.ins[0]])
patch.connect([vol_offset.outs[0], dac.ins[1]])  # Modulating volume

# Save the patch
patch.save("BB9.maxpat")