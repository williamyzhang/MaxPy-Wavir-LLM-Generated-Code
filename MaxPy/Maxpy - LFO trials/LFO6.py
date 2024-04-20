import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Define the sine wave oscillator
sine_wave = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Define the LFO (Low-Frequency Oscillator) for vibrato effect
lfo = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 200])[0]

# Create a scale object to control the depth of the vibrato effect
scale = patch.place("*~ 10", num_objs=1, starting_pos=[100, 300])[0]

# Create a +~ object to add the LFO effect to the sine wave frequency
plus_tilde = patch.place("+~ 440", num_objs=1, starting_pos=[100, 400])[0]

# Connect the LFO to the scale object
patch.connect([lfo.outs[0], scale.ins[0]])

# Connect the scale object to the +~ object
patch.connect([scale.outs[0], plus_tilde.ins[0]])

# Finally, connect the sine wave oscillator to the +~ object and output
patch.connect([sine_wave.outs[0], plus_tilde.ins[1]])

# Create an output for the patch
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 500])[0]

# Connect the vibrato-modulated sine wave to the output
patch.connect([plus_tilde.outs[0], dac.ins[0]])
patch.connect([plus_tilde.outs[0], dac.ins[1]])

# Save the patch
patch.save("LFO6.maxpat")