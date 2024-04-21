
import maxpy as mp
import random

# Initialize a MaxPatch object
patch = mp.MaxPatch()

# Define the base frequency for the sine wave
base_frequency = 220  # Hz (A3 note)

# Create the main toggle and cycle~ object for the base sine wave
tg = patch.place("toggle", num_objs=1, starting_pos=[50, 50])[0]
cycle_main = patch.place(f"cycle~ {base_frequency}", num_objs=1, starting_pos=[50, 100])[0]
patch.connect([tg.outs[0], cycle_main.ins[0]])

# Place a *~ object to control the amplitude of the base sine wave
amp_main = patch.place("*~ 0.2", num_objs=1, starting_pos=[50, 150])[0]
patch.connect([cycle_main.outs[0], amp_main.ins[0]])

# Output section of the patch
dac = patch.place("ezdac~", num_objs=1, starting_pos=[50, 450])[0]
patch.connect([amp_main.outs[0], dac.ins[0]])

# Generate partials above the base frequency
partials_count = 4
partial_multiplier = 2  # Multiply base frequency by this value for each partial. 
for i in range(1, partials_count+1):
    freq_multiplier = i * partial_multiplier
    cycle = patch.place(f"cycle~ {base_frequency * freq_multiplier}", num_objs=1, starting_pos=[200 + i*100, 100])[0]
    amp = patch.place(f"*~ {random.uniform(0.1, 0.2)}", num_objs=1, starting_pos=[200 + i*100, 150])  # Random amplitude
    patch.connect([cycle.outs[0], amp[0].ins[0]])
    patch.connect([amp[0].outs[0], dac.ins[0]])

# Save the patch
patch.save("add6.maxpat")
