import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of noise sources to simulate various streams of water
num_streams = 5

# Start positions for layout
start_x_pos = 100
start_y_pos = 100
x_offset = 150

# Creating and placing multiple noise~ objects
noise_sources = patch.place("noise~", num_objs=num_streams, starting_pos=[start_x_pos, start_y_pos])

# Creating and placing a subpatch for random modulation of filter frequency
subpatch_rand = patch.place("p rand_modulation", num_objs=1, starting_pos=[start_x_pos + num_streams*x_offset, start_y_pos])[0]

for i, noise_source in enumerate(noise_sources):
    # Assign random low-pass filter settings for each noise stream
    freq = random.randint(200, 800)  # Random low-pass cutoff frequency between 200Hz and 800Hz
    resonance = round(random.uniform(0.1, 0.5), 2)  # Random resonance between 0.1 and 0.5
    filter_obj = patch.place(f"svf~ {freq} {resonance}", num_objs=1, starting_pos=[start_x_pos + i*x_offset, start_y_pos + 75])[0]
    
    # Connect each noise source to its respective filter
    patch.connect([noise_source.outs[0], filter_obj.ins[0]])
    
    # Connect subpatch to filter frequency modulation (inlet 1 controls frequency of svf~)
    patch.connect([subpatch_rand.outs[i % subpatch_rand.outlet_count()], filter_obj.ins[1]])

# Creating random number generators inside the subpatch for dynamic modulation
with subpatch_rand:
    for i in range(num_streams):
        # Generating random numbers at random intervals to change filter's cutoff frequency
        rand = patch.place(f"random {random.randint(100, 600)}", num_objs=1, starting_pos=[100 + i*100, 100])[0]
        metro = patch.place(f"metro {random.randint(200, 1000)}", num_objs=1, starting_pos=[100 + i*100, 150])[0]
        patch.connect([metro.outs[0], rand.ins[0]])
        patch.connect([rand.outs[0], subpatch_rand.outs[i]])  # Connect rand to subpatch outlet

# Finish by saving the patch
patch.save("brook4.maxpat")
