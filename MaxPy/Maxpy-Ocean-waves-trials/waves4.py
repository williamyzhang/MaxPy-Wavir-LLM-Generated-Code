import maxpy as mp

# Creating a new MaxPatch
patch = mp.MaxPatch()

# White noise generator to simulate the sound of waves
noise = patch.place("noise~", num_objs=1, starting_pos=[0, 0])[0]

# Low-pass filter to simulate the water attribute of waves
filter_freq = 500  # Setting the frequency cutoff for filter
lpf = patch.place(f"filtergraph~ {filter_freq}", num_objs=1, starting_pos=[100, 0])[0]

# Using cycle~ objects as LFOs to modulate the filter frequency for the wave effect
lfo_freq = 0.25  # Low-frequency oscillator frequency for wave motion simulation
lfo_depth = 200  # Depth of the modulation
lfo = patch.place(f"cycle~ {lfo_freq}", num_objs=1, starting_pos=[200, 0])[0]
lfo_mult = patch.place("*~", num_objs=1, starting_pos=[300, 0])[0]
lfo_depth_const = patch.place(f"{lfo_depth}", num_objs=1, starting_pos=[400, 0])[0]

# Add constant depth to LFO output
patch.connect([lfo.outs[0], lfo_mult.ins[0]])
patch.connect([lfo_depth_const.outs[0], lfo_mult.ins[1]])

# Adding lfo modulation to the filter cutoff frequency
patch.connect([lfo_mult.outs[0], lpf.ins[1]])

# Connect the white noise to the low-pass filter
patch.connect([noise.outs[0], lpf.ins[0]])

# Line~ object to smoothly change volumes and simulate the coming and going of waves
line = patch.place("line~", num_objs=1, starting_pos=[500, 0])[0]

# Multiplying the filtered signal by the line object to control volume
multiply = patch.place("*~", num_objs=1, starting_pos=[600, 0])[0]
patch.connect([lpf.outs[0], multiply.ins[0]])
patch.connect([line.outs[0], multiply.ins[1]])

# Output the final sound
dac = patch.place("dac~", num_objs=1, starting_pos=[700, 0])[0]
patch.connect([multiply.outs[0], dac.ins[0]])
patch.connect([multiply.outs[0], dac.ins[1]])

# Saving the MaxPatch
patch.save("waves4.maxpat")