import maxpy as mp 
import random

patch = mp.MaxPatch()

# Number of wave components
num_waves = 5

# Base frequency for the ocean waves sound simulation
base_freq = 120

# Starting positions for objects
starting_pos_x = 50
starting_pos_y = 100
spacing_y = 100

# Create white noise sources to simulate the natural randomness of waves
noise_sources = patch.place("noise~", num_objs=num_waves, starting_pos=[starting_pos_x, starting_pos_y])
starting_pos_y += spacing_y

# Create filters to shape the noise into more 'wave-like' sounds
filter_freqs = [base_freq + random.randint(-20, 20) for _ in range(num_waves)]
filters = [patch.place("filter~ lp " + str(freq), num_objs=1, starting_pos=[starting_pos_x, starting_pos_y + (i * spacing_y)])[0] for i, freq in enumerate(filter_freqs)]

# Create `line~` objects to simulate the rise and fall of wave intensity
lines = patch.place("line~", num_objs=num_waves, starting_pos=[starting_pos_x, starting_pos_y + (num_waves * spacing_y)])

# Create `cycle~` objects for modulating the waves' intensity over time
cycle_freqs = [1.0 / random.randint(5, 15) for _ in range(num_waves)]  # Slow modulations
cycles = [patch.place("cycle~ " + str(freq), num_objs=1, starting_pos=[starting_pos_x, starting_pos_y + ((num_waves + i) * spacing_y)])[0] for i, freq in enumerate(cycle_freqs)]

# Connecting objects
for i, (noise, flt, line, cyc) in enumerate(zip(noise_sources, filters, lines, cycles)):
    patch.connect([noise.outs[0], flt.ins[0]])  # Connect noise to filter
    patch.connect([cyc.outs[0], line.ins[0]])  # Connect cycle~ to line~
    patch.connect([line.outs[0], flt.ins[1]])  # Modulate filter cutoff with line~

# Combine the wave components to a single `dac~` for output
mix = patch.place("mix~ " + str(num_waves), num_objs=1, starting_pos=[starting_pos_x + 200, starting_pos_y + ((num_waves * 2) * spacing_y)])[0]
for flt in filters:
    patch.connect([flt.outs[0], mix.ins[0]])  # Assuming all the wave components are summed into the first inlet of mix~

# Connect the mix~ to output
patch.connect([mix.outs[0], patch.dac.ins[0]])
patch.connect([mix.outs[0], patch.dac.ins[1]])

patch.save("waves2.maxpat")
