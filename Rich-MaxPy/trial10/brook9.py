import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of water "streams"
num_streams = 5

# Base frequency for the cycle~ objects, to be modified by random
base_freq = 100

# Delay range in ms for the sound "streams" to simulate water babbling
min_delay = 50
max_delay = 300

# Starting positions for object placement
start_x = 0
start_y = 0

# Initialize list to keep track of cycle~ objects for later connection
cycles = []

for i in range(num_streams):
    # Randomize frequency modulation
    freq_shift = random.randint(-20, 20)
    frequency = base_freq + freq_shift
    
    # Place cycle~ object
    cyc = patch.place(f"cycle~ {frequency}", num_objs=1, starting_pos=[start_x, start_y + i*100])[0]
    cycles.append(cyc)
    
    # Place random 200 object to vary pitch slightly
    rnd = patch.place("random 200", num_objs=1, starting_pos=[50, start_y + i*100])[0]
    
    # Place +~ object to add random pitch modulation
    add = patch.place(f"+~ {frequency}", num_objs=1, starting_pos=[100, start_y + i*100])[0]
    
    # Place delay~ object to create overlapping sounds
    delay_time = random.randint(min_delay, max_delay)
    delay = patch.place(f"delay~ {delay_time}", num_objs=1, starting_pos=[150, start_y + i*100])[0]
    
    # Connecting objects
    patch.connect([rnd.outs[0], add.ins[0]])
    patch.connect([cyc.outs[0], add.ins[1]])
    patch.connect([add.outs[0], delay.ins[0]])

# Save the patch
patch.save("brook9.maxpat")
