import maxpy as mp

# Start by creating a new MaxPatch.
patch = mp.MaxPatch()

# Create white noise as the sound base.
noise = patch.place("noise~", num_objs=1, starting_pos=[50, 50])[0]

# Create several svf~ objects to filter the noise.
filters = patch.place("svf~ 200 0.5", num_objs=5, starting_pos=[50, 100])

# Create cycle~ objects for modulation.
lfo_freqs = [0.2, 0.35, 0.15, 0.25, 0.3]  # Slow LFO frequencies to simulate changing sound.
lfo = [patch.place("cycle~ {}".format(freq), num_objs=1, starting_pos=[50, 150 + 50 * i])[0] for i, freq in enumerate(lfo_freqs)]

# Connect each noise~ output to filters then to dac~.
for i, filter in enumerate(filters):
    patch.connect([noise.outs[0], filter.ins[0]])
    # Connect LFO to filter frequency modulation (second inlet).
    patch.connect([lfo[i].outs[0], filter.ins[2]])

# Last connection to dac~ for audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[50, 400])[0]
for filter in filters:
    patch.connect([filter.outs[0], dac.ins[0]]) # Connect all filters to the left channel.
    patch.connect([filter.outs[0], dac.ins[1]]) # ...and the right channel.

# Save the patch
patch.save("BB6.maxpat")