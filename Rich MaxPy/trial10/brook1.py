import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of water streams in our babbling brook
num_streams = 10

# Starting positions for our objects
starting_x = 100
starting_y = 100
delta_y = 60  # Vertical spacing between objects

# Create a master volume for the output
master_vol = patch.place("gain~", num_objs=1, starting_pos=[starting_x + 400, starting_y - 50])[0]

# Create multiple white noise sources with random filters to simulate a babbling brook
for i in range(num_streams):
    y_pos = starting_y + (i * delta_y)
    # Noise source
    noise_source = patch.place("noise~", num_objs=1, starting_pos=[starting_x, y_pos])[0]
    
    # Biquad filter with random frequency to simulate the varied sound of water
    filter_freq = random.uniform(300, 800)  # Random frequency between 300 and 800 Hz
    filter_res = 1  # Resonance
    water_stream = patch.place(f"biquad~ {filter_freq} {filter_res}", num_objs=1, starting_pos=[starting_x + 100, y_pos])[0]
    
    # Connection of noise source to the filter
    patch.connect([noise_source.outs[0], water_stream.ins[0]])
    
    # Adjusting the volume of each stream to prevent clipping and ensure variations
    volume_scale = random.uniform(0.05, 0.2)  # Random volume scaling
    scale_obj = patch.place(f"*~ {volume_scale}", num_objs=1, starting_pos=[starting_x + 200, y_pos])[0]
    
    # Connect the filtered noise to the scaling object
    patch.connect([water_stream.outs[0], scale_obj.ins[0]])
    
    # Connect the scaled noise to the master volume
    patch.connect([scale_obj.outs[0], master_vol.ins[i]])

# Save the patch
patch.save("brook1.maxpat")
