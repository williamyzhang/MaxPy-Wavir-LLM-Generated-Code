import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Create white noise which serves as the base sound for the waves
noise = patch.place("noise~", num_objs=1, starting_pos=[100, 100])[0]

# Use a low-pass filter to soften the sound of the noise, resembling the sound of water
filter_freq = 500  # Frequency in Hz for the low-pass filter
lpf = patch.place(f"filtergraph~ {filter_freq}", num_objs=1, starting_pos=[100, 160])[0]

# Create a cycle~ object to modulate the amplitude, simulating wave dynamics
cycle_freq = 0.1  # Low frequency to simulate the slow rise and fall of waves
amp_mod = patch.place(f"cycle~ {cycle_freq}", num_objs=1, starting_pos=[100, 220])[0]

# Multiply the noise with the modulated amplitude to get the wave sound
multiply = patch.place("*~", num_objs=1, starting_pos=[100, 280])[0]

# Create a dac~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 320])[0]

# Connect the noise to the filter
patch.connect([noise.outs[0], lpf.ins[0]])

# Connect the filter to the multiply object, importantly to the right inlet for signal multiplication
patch.connect([lpf.outs[0], multiply.ins[1]])

# Connect the cycle~ object to the left inlet of the multiply object to modulate amplitude
patch.connect([amp_mod.outs[0], multiply.ins[0]])

# Finally, connect the output of the multiplied signal to the dac~ for audio output
patch.connect([multiply.outs[0], dac.ins[0]])

# Save the Max patch
patch.save("waves3.maxpat")