import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Place a metro object to trigger bangs at intervals of 300 ms
metro = patch.place("metro 300", num_objs=1, starting_pos=[100, 100])[0]

# Place a toggle object to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[100, 50])[0]

# Connect the toggle to the metro
patch.connect([toggle.outs[0], metro.ins[0]])

# Place a random object to generate random frequencies within a range
random_freq = patch.place("random 1000", num_objs=1, starting_pos=[250, 100])[0]

# Set the base frequency for the bird call
base_frequency = 1000

# Place an add object to add the base frequency to the random frequencies
add_base_freq = patch.place(f"+ {base_frequency}", num_objs=1, starting_pos=[400, 100])[0]

# Connect the metro to the random object to trigger a new random value with each bang
patch.connect([metro.outs[0], random_freq.ins[0]])

# Connect the random object to the add object
patch.connect([random_freq.outs[0], add_base_freq.ins[0]])

# Place a cycle~ object to generate a sine wave with the resulting frequencies
sine_wave = patch.place("cycle~", num_objs=1, starting_pos=[550, 100])[0]

# Connect the add object to the cycle~ object to use the frequencies for the sine wave
patch.connect([add_base_freq.outs[0], sine_wave.ins[0]])

# Place a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[700, 100])[0]

# Connect the sine_wave object to both inputs of the dac~ object for stereo output
patch.connect([sine_wave.outs[0], dac.ins[0]])
patch.connect([sine_wave.outs[0], dac.ins[1]])

# Save the Max patch with the name "bird_call.maxpat"
patch.save("BC8.maxpat")