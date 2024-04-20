import maxpy as mp

# Create a new Max Patch
patch = mp.MaxPatch()

# Creating a white noise generator
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Creating a low-frequency oscillator (LFO) to modulate the amplitude of the noise
lfo = patch.place("cycle~ 0.1", num_objs=1, starting_pos=[100, 200])[0]  # slow LFO at 0.1 Hz

# Creating an *~ object to modulate the noise amplitude with the LFO
amp_mod = patch.place("*~", num_objs=1, starting_pos=[100, 300])[0]

# Creating a filter to soften the noise
filter = patch.place("svf~ 1000 2 0.5", num_objs=1, starting_pos=[100, 400])[0]  # 1000 Hz, bandpass, 0.5 Q

# Creating a reverb to add spatial depth
reverb = patch.place("freeverb~", num_objs=1, starting_pos=[100, 500])[0]

# Creating a DAC~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 600])[0]

# Connect the components
patch.connect([noise.outs[0], amp_mod.ins[0]])
patch.connect([lfo.outs[0], amp_mod.ins[1]])
patch.connect([amp_mod.outs[0], filter.ins[0]])
patch.connect([filter.outs[0], reverb.ins[0]])
patch.connect([reverb.outs[0], dac.ins[0]])
patch.connect([reverb.outs[1], dac.ins[1]])

# Save the patch
patch.save("OW8.maxpat")