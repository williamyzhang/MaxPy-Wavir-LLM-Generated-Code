
import maxpy as mp
import random

patch = mp.MaxPatch()

# Define the base frequency
base_freq = 200  # Base frequency in Hz

# Define the number of partials
num_partials = 4

# Position settings for object placement in the patch
starting_pos = [50, 50]
vertical_spacing = 50

# Create a cycle~ object for the base frequency
core_osc = patch.place(f"cycle~ {base_freq}", num_objs=1, starting_pos=starting_pos)[0]

# Update the starting position vertically for the next object
starting_pos[1] += vertical_spacing

# Create cycle~ objects for each partial
for i in range(1, num_partials + 1):
    # Calculate the frequency for this partial
    partial_freq = base_freq * (i + 1)
    
    # Generate a random amplitude between 0.5 and 1 for each partial
    partial_amp = random.uniform(0.5, 1)

    # Create a cycle~ object with the partial frequency
    partial_osc = patch.place(f"cycle~ {partial_freq}", num_objs=1, starting_pos=starting_pos)[0]

    # Create a *~ object to control the amplitude of the partial
    amp_control = patch.place(f"*~ {partial_amp}", num_objs=1, starting_pos=[starting_pos[0] + 100, starting_pos[1]])[0]
    
    # Connect the partial oscillator to the amplitude control
    patch.connect([partial_osc.outs[0], amp_control.ins[0]])

    # Move down for the next partial
    starting_pos[1] += vertical_spacing

# Save the patch
patch.save("add3.maxpat")
