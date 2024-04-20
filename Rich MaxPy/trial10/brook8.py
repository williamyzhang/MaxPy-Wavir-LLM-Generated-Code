import maxpy as mp
import random

# Initialize a MaxPatch object
patch = mp.MaxPatch()

# Number of noise~ sources
num_sources = 5
sources = []

# Positions
starting_pos_x = 50
starting_pos_y = 50
offset = 180

for i in range(num_sources):
    # Create white noise~ objects
    noise = patch.place("noise~", num_objs=1, 
                        starting_pos=[starting_pos_x, starting_pos_y + (i * offset)])[0]
    sources.append(noise)
    
    # Create biquad~ filters with random center frequencies within the range of water sounds
    freq = random.randint(400,1200)  # Random frequency between 400Hz to 1200Hz deemed to mimic water flows
    biquad = patch.place(f"biquad~ 0. {freq} 1. 0. 0.", num_objs=1, 
                         starting_pos=[starting_pos_x + 100, starting_pos_y + (i * offset)])[0]
    
    # Connect noise to biquad
    patch.connect([noise.outs[0], biquad.ins[0]])
    
    # Modulate biquad frequency with a slow cycle
    lfo_freq = random.uniform(0.1, 0.5) # LFO frequency for modulation
    
    cycle = patch.place(f"cycle~ {lfo_freq}", num_objs=1, 
                        starting_pos=[starting_pos_x + 200, starting_pos_y + (i * offset)])[0]
    
    scale = patch.place("*~ 200", num_objs=1, 
                        starting_pos=[starting_pos_x + 300, starting_pos_y + (i * offset)])[0]  # Scale mod signal
    
    offset = patch.place(f"+~ {freq}", num_objs=1, 
                         starting_pos=[starting_pos_x + 400, starting_pos_y + (i * offset)])[0]  # Add to base freq.
 
    patch.connect([cycle.outs[0], scale.ins[0]])
    patch.connect([scale.outs[0], offset.ins[0]])
    
    # Control frequency of biquad~
    patch.connect([offset.outs[0], biquad.ins[1]])
    
    # Modulate the Q (bandwidth) for variance
    q_val = random.uniform(2.0, 10.0)  # Random Q value for slight variation
    line = patch.place(f"line~ {q_val}", num_objs=1, 
                       starting_pos=[starting_pos_x + 500, starting_pos_y + (i * offset)])[0]  # Q modulation over time
    patch.connect([line.outs[0], biquad.ins[2]])

# Create a master gain control (to prevent clipping) and dac~ for output
master_gain = patch.place("*~ 0.2", num_objs=1, starting_pos=[600, 300])[0]
dac = patch.place("dac~", num_objs=1, starting_pos=[750, 250])[0]

# Connect the last filter to the master gain, then to dac~
for source in sources:
    patch.connect([source.outs[0], master_gain.ins[0]])
patch.connect([master_gain.outs[0], dac.ins[0]])
patch.connect([master_gain.outs[0], dac.ins[1]])

# Save the patch
patch.save("brook8.maxpat")
