import maxpy as mp
import random

# Create a new patch
patch = mp.MaxPatch()

# Number of wave simulations
num_waves = 5

# Base position for placing objects
base_pos_x, base_pos_y = 50, 50

# Generate white noise, symbolizing the raw sound of the ocean waves
noise = patch.place("noise~", num_objs=1, starting_pos=[base_pos_x, base_pos_y])[0]

# Use a low pass filter to shape the noise into a more wave-like sound
filter_freq = 500  # center frequency for low-pass filter
resonance = 0.2    # low resonance to emulate water sound
filter = patch.place(f"svf~ {filter_freq} {resonance}", num_objs=1, starting_pos=[base_pos_x + 100, base_pos_y])[0]

# Connect noise to filter
patch.connect([noise.outs[0], filter.ins[0]])

# Simulate waves crashing with varying intensity using random modulation
for i in range(num_waves):
    cycle_freq = random.uniform(0.1, 0.5)  # random LFO frequency to modulate amplitude, simulating wave ebb and flow
    amp = random.uniform(0.2, 0.8)  # random amplitude to simulate varying intensity of waves
    
    # Generate LFO
    lfo = patch.place(f"cycle~ {cycle_freq}", num_objs=1, starting_pos=[base_pos_x + 200, base_pos_y + (i * 100)])[0]
    multiply = patch.place("*~", num_objs=1, starting_pos=[base_pos_x + 300, base_pos_y + (i * 100)])[0]
    gain = patch.place(f"*~ {amp}", num_objs=1, starting_pos=[base_pos_x + 400, base_pos_y + (i * 100)])[0]

    # Connect the LFO output to the multiplier, then to the gain control
    patch.connect([lfo.outs[0], multiply.ins[0]])
    patch.connect([filter.outs[0], multiply.ins[1]])
    patch.connect([multiply.outs[0], gain.ins[0]])
    
    # Output the final signal
    dac = patch.place("dac~", num_objs=1, starting_pos=[base_pos_x + 500, base_pos_y + (i * 100)])[0]
    patch.connect([gain.outs[0], dac.ins[0]])

# Save the generated patch
patch_name = "waves8.maxpat"
patch.save(patch_name)

print(f"Generated patch saved as {patch_name}.")
