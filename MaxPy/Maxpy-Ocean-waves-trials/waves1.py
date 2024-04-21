import maxpy as mp

patch = mp.MaxPatch()

# Create white noise source
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Create a low-frequency oscillator to modulate the amplitude, simulating wave intensity
lfo = patch.place("cycle~ 0.1", num_objs=1, starting_pos=[100, 200])[0] # Slow LFO for waves

# Create an *~ object to modulate the amplitude of the noise
amp_mod = patch.place("*~", num_objs=1, starting_pos=[100, 300])[0]

# Filter to mimic the underwater sound characteristic of wave noise
filter = patch.place("svf~ 200 0.5 0", num_objs=1, starting_pos=[100, 400])[0] # Low-pass filter

# DAC to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 500])[0]

# Connect objects
patch.connect([noise.outs[0], amp_mod.ins[0]])
patch.connect([lfo.outs[0], amp_mod.ins[1]])
patch.connect([amp_mod.outs[0], filter.ins[0]])
patch.connect([filter.outs[0], dac.ins[0]])
patch.connect([filter.outs[0], dac.ins[1]])

patch.save("waves1.maxpat")