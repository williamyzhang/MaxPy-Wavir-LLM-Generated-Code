import maxpy as mp
import random

patch = mp.MaxPatch()

# Define the number of bells
numBells = 5

# Place a toggle to start/stop the bell sounds
tg = patch.place("toggle", num_objs=1, starting_pos=[0, 0])[0]

# Use metro objects to generate events at random intervals
metro_intervals = [random.randint(200, 2000) for _ in range(numBells)]
mtr = patch.place("metro", num_objs=numBells, starting_pos=[50, 50], args_list=metro_intervals)

# Random object to generate random frequencies for bell sounds
min_freq, max_freq = 200, 800  # frequency range for the bells
rnd_freqs = patch.place("random", num_objs=numBells, starting_pos=[50, 100], args_list=[max_freq-min_freq])

# Add object to adjust the base frequency of the bells
add_base_freq = patch.place("+", num_objs=numBells, starting_pos=[50, 150], args_list=[min_freq])

# Cycle~ objects to generate bell sounds
cyc = patch.place("cycle~", num_objs=numBells, starting_pos=[50, 200], args_list=[0])

# Gain objects to control the volume of each bell
gain_values = [0.1 * random.random() for _ in range(numBells)]  # Random volume levels
gain = patch.place("gain~", num_objs=numBells, starting_pos=[50, 250], args_list=gain_values)

# Connect metro (mtr) to random (rnd_freqs)
for i in range(numBells):
    patch.connect([tg.outs[0], mtr[i].ins[0]])
    patch.connect([mtr[i].outs[0], rnd_freqs[i].ins[0]])
    patch.connect([rnd_freqs[i].outs[0], add_base_freq[i].ins[0]])
    patch.connect([add_base_freq[i].outs[0], cyc[i].ins[0]])
    patch.connect([cyc[i].outs[0], gain[i].ins[0]])

# Connect all bells to the output
ezdac = patch.place("ezdac~", num_objs=1, starting_pos=[0, 300])[0]
for i in range(numBells):
    patch.connect([gain[i].outs[0], ezdac.ins[0]])
    patch.connect([gain[i].outs[0], ezdac.ins[1]])

# Save the patch
patch.save("bell6.maxpat")
