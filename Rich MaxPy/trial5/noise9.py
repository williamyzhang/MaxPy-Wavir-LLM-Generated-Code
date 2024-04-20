import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Positioning variables
start_x = 50
start_y = 50
y_spacing = 100

# Create white noise generator object
noise = patch.place("noise~", starting_pos=[start_x, start_y])[0]

# Create random object to control q factor
q_rand = patch.place("random 100", starting_pos=[start_x, start_y + y_spacing])[0]
patch.connect([q_rand.outs[0], noise.ins[0]])

# Generate a low-pass filter at 1000 Hz with a variable q factor
lowpass_freq = 1000
lowpass_q = random.randint(1, 5)  # random Q factor between 1 and 5
filter = patch.place(f"biquad~ {lowpass_freq} {lowpass_q}", starting_pos=[start_x, start_y + (y_spacing * 2)])[0]
patch.connect([noise.outs[0], filter.ins[0]])

# Create an output object
dac = patch.place("dac~", starting_pos=[start_x, start_y + (y_spacing * 3)])[0]
patch.connect([filter.outs[0], dac.ins[0]])
patch.connect([filter.outs[0], dac.ins[1]])

# Randomly generate new q factors at a metro's pace
metro = patch.place("metro 500", starting_pos=[start_x, start_y - y_spacing])[0]  # every 500 ms
tog = patch.place("toggle", starting_pos=[start_x, start_y - (y_spacing * 2)])[0]
patch.connect([tog.outs[0], metro.ins[0]])
patch.connect([metro.outs[0], q_rand.ins[0]])

# Save the patch
patch.save("noise9.maxpat")
