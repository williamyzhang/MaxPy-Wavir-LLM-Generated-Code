import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place several white noise generators to simulate the sound of water
num_noise_gens = 5
noise_gens = patch.place("noise~", num_objs=num_noise_gens, starting_pos=[0, 0])

# Use bandpass filters to shape the noise into more water-like sound
# Setting different center frequencies for each to vary the sound
filter_frequencies = [500, 700, 900, 1100, 1300]
resonance = 0.4
filters = []
for i, noise_gen in enumerate(noise_gens):
    filter_freq = filter_frequencies[i % len(filter_frequencies)]
    filters.append(patch.place(f"svf~ {filter_freq} {resonance}", num_objs=1, starting_pos=[100, i*40])[0])
    # Connect each noise generator to its corresponding filter
    patch.connect([noise_gen.outs[0], filters[i].ins[0]])

# Create a slow, random amplitude modulation to mimic the variance in water flow
lfo_freq = 0.1
lfo_amp = 0.2
lfo = patch.place(f"cycle~ {lfo_freq}", num_objs=1, starting_pos=[200, 0])[0]
mod_depth = patch.place(f"*~ {lfo_amp}", num_objs=1, starting_pos=[250, 0])[0]
patch.connect([lfo.outs[0], mod_depth.ins[0]])

# Modulate the amplitude of each filtered noise generator to add variance
for filter in filters:
    multiply = patch.place("*~", num_objs=1, starting_pos=[350, filters.index(filter)*60])[0]
    patch.connect([filter.outs[0], multiply.ins[0]])
    patch.connect([mod_depth.outs[0], multiply.ins[1]])

# Assuming we send the sound to a dac~ object for audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[450, 0])[0]
for filter in filters:
    multiply = patch.place("*~", num_objs=1, starting_pos=[500, filters.index(filter)*60])[0]
    patch.connect([filter.outs[0], multiply.ins[0]])
    patch.connect([mod_depth.outs[0], multiply.ins[1]])

    # Connect the final modulated signals to both inputs of dac~ for stereo sound
    patch.connect([multiply.outs[0], dac.ins[0]])
    patch.connect([multiply.outs[0], dac.ins[1]])

# Save the babbling brook sound generator patch
patch.save("brook2.maxpat")