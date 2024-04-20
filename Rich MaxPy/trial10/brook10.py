import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of water sound generators
numGenerators = 5

# Starting positions for object placement
starting_x = 100
starting_y = 100
y_offset = 50

# Place cycle~ object for generating audio signals, with random frequencies to imitate water babble
cycles = patch.place("cycle~", num_objs=numGenerators, starting_pos=[starting_x, starting_y + y_offset * 0])

# Place random object for varying frequencies dynamically
rnd_freq = patch.place("random 500", num_objs=1, starting_pos=[starting_x + 100, starting_y])[0]
patch.connect([rnd_freq.outs[0], cycles[0].ins[0]])

for i in range(numGenerators):
    # Adjust frequency range to simulate varied water sounds
    min_freq = 100 
    max_freq = 500
    freq = random.randint(min_freq, max_freq)
    
    # Connect each cycle~ object to a *~ object to control its amplitude
    multiply = patch.place("*~ 0.5", num_objs=1, starting_pos=[starting_x, starting_y + y_offset * (i+1)])[0]
    patch.connect([cycles[i].outs[0], multiply.ins[0]])
    
    # Connect the output of each *~ object to a dac~ object to play the sound
    dac = patch.place("dac~", num_objs=1, starting_pos=[starting_x + 200, starting_y + y_offset * (i+2)])[-1]
    patch.connect([multiply.outs[0], dac.ins[0]])
    patch.connect([multiply.outs[0], dac.ins[1]])

# Save the Max patch
patch.save("brook10.maxpat")
