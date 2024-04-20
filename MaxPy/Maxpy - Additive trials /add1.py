import maxpy as mp

# Initialize a new Max patch
patch = mp.MaxPatch()

# Creating the fundamental sine wave oscillator, setting its frequency to 220 Hz
fundamental = patch.place("cycle~ 220", num_objs=1, starting_pos=[0, 100])[0]

# Creating four partials, frequencies are multiples of the fundamental frequency
partial1 = patch.place("cycle~ 440", num_objs=1, starting_pos=[0, 150])[0] # 2nd harmonic
partial2 = patch.place("cycle~ 660", num_objs=1, starting_pos=[100, 150])[0] # 3rd harmonic
partial3 = patch.place("cycle~ 880", num_objs=1, starting_pos=[200, 150])[0] # 4th harmonic
partial4 = patch.place("cycle~ 1100", num_objs=1, starting_pos=[300, 150])[0] # 5th harmonic

# Creating a mixer to sum the outputs of the oscillators
mix = patch.place("*~ 0.2", num_objs=5, starting_pos=[150, 300])

# Connecting the oscillators to the inputs of the mixer
patch.connect([fundamental.outs[0], mix[0].ins[0]])
patch.connect([partial1.outs[0], mix[1].ins[0]])
patch.connect([partial2.outs[0], mix[2].ins[0]])
patch.connect([partial3.outs[0], mix[3].ins[0]])
patch.connect([partial4.outs[0], mix[4].ins[0]])

# Creating a dac~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[150, 450])[0]

# Connecting the mixer outputs to the left and right channels of the dac~
patch.connect([mix[0].outs[0], dac.ins[0]])
patch.connect([mix[1].outs[0], dac.ins[1]])
patch.connect([mix[2].outs[0], dac.ins[0]])
patch.connect([mix[3].outs[0], dac.ins[1]])
patch.connect([mix[4].outs[0], dac.ins[0]])

# Saving the patch
patch.save("add1.maxpat")