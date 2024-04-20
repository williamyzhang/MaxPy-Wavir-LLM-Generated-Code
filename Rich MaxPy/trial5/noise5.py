import maxpy as mp
import random

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Generate white noise
wn = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Set up a low-pass filter with a cutoff frequency of 1000 Hz
lpf_cutoff_frequency = 1000  # Hz
lpf = patch.place(f"filtergraph~ {lpf_cutoff_frequency}", num_objs=1, starting_pos=[100, 200])[0]
lpf_ctl = patch.place(f"biquad~ {lpf_cutoff_frequency}", num_objs=1, starting_pos=[100, 300])[0]

# Generate multiple outlets for different parameters randomly
for i in range(random.randint(1, 5)):
    # Set random parameters for the low-pass filter within a reasonable range
    param_val = random.uniform(0.1, 1.0)  # Random value between 0.1 and 1.0
    num = patch.place(f"number {param_val}", num_objs=1, starting_pos=[200 + i*100, 400])[0]
    patch.connect([num.outs[0], lpf_ctl.ins[i]])

# Connect objects
patch.connect([wn.outs[0], lpf.ins[0]])
patch.connect([lpf.outs[0], lpf_ctl.ins[0]])

# Output setup
dac = patch.place("ezdac~", num_objs=1, starting_pos=[100, 500])[0]
patch.connect([lpf_ctl.outs[0], dac.ins[0]])
patch.connect([lpf_ctl.outs[0], dac.ins[1]])

# Save the patch
patch.save("noise5.maxpat")
