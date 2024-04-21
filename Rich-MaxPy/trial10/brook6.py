import maxpy as mp
import random

patch = mp.MaxPatch()

# Set general attributes for the simulated babbling brook
num_streams = 10  # Number of individual streams contributing to the brook sound
starting_pos_x = 100  # Starting x position for the placement of objects

# Noise objects to simulate the water sound
noise_objs = patch.place("noise~", num_objs=num_streams, starting_pos=[starting_pos_x, 100])

# Filter objects to vary the texture of each stream
filter_freqs = [random.randint(200, 1200) for _ in range(num_streams)]  # Random filter frequencies
svf_objs = [patch.place(f"svf~ {freq} 2 1", num_objs=1, starting_position=[starting_pos_x + i*100, 200]) for i, freq in enumerate(filter_freqs)]

# Volume objects to control the level of each stream
vol_levels = [random.uniform(0.1, 0.5) for _ in range(num_streams)]  # Random volumes for natural variability
gain_objs = patch.place("*~", args=vol_levels, num_objs=num_streams, starting_pos=[starting_pos_x, 300])

# Connect noise to filters, then filters to gain controls
for noise, svf, gain in zip(noise_objs, svf_objs, gain_objs):
    patch.connect([noise.outs[0], svf.ins[0]])
    patch.connect([svf.outs[0], gain.ins[0]])

# Master volume and output
master_vol = patch.place("*~ 0.5", starting_position=[starting_pos_x + num_streams*100//2, 400])
ezdac = patch.place("ezdac~", starting_pos=[starting_pos_x + num_streams*100//2, 450])

# Connect streams to master volume and output to speakers
all_outs = [gain.outs[0] for gain in gain_objs]
for out in all_outs:
    patch.connect([out, master_vol.ins[0]])

patch.connect([master_vol.outs[0], ezdac.ins[0]])
patch.connect([master_vol.outs[0], ezdac.ins[1]])

# Save the patch
patch.save("brook6.maxpat")
