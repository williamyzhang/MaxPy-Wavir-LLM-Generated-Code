import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Place a cycle~ object to generate a sine wave, setting frequency to 440 Hz
sine_wave = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Place an LFO to modulate the frequency of the sine wave. We use cycle~ for the LFO with a low frequency (e.g., 5 Hz)
lfo = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 200])[0]

# Place a *~ object to control the depth of the vibrato effect. Depth is controlled by multiplying the LFO signal.
# We adjust the depth by setting the multiplier (e.g., 10 for 10 Hz depth)
depth_control = patch.place("*~ 10", num_objs=1, starting_pos=[100, 300])[0]

# Place a +~ object to sum the original frequency of the sine wave (440 Hz) with the modulated signal from the LFO
frequency_modulation = patch.place("+~ 440", num_objs=1, starting_pos=[100, 400])[0]

# Place a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 500])[0]

# Connecting the LFO to the depth control
patch.connect([lfo.outs[0], depth_control.ins[0]])

# Connecting depth control to the frequency modulation input
patch.connect([depth_control.outs[0], frequency_modulation.ins[0]])

# Connecting the modulated frequency to the sine wave generator
patch.connect([frequency_modulation.outs[0], sine_wave.ins[0]])

# Output the modulated sine wave to the dac~
patch.connect([sine_wave.outs[0], dac.ins[0]])
patch.connect([sine_wave.outs[0], dac.ins[1]])

# Save the MaxPatch
patch.save("LFO7.maxpat")