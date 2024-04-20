"""
This MaxPy script creates a patch that simulates the sound of ocean waves using noise and oscillators.
"""

import maxpy as mp

# Initialize a new Max patch
patch = mp.MaxPatch()

# Place a white noise generator
noise = patch.place("noise~", num_objs=1, starting_pos=[50, 100])[0]

# Place a filter to give the noise a more 'ocean wave' like quality
filt = patch.place("svf~ 500 1 0.5", num_objs=1, starting_pos=[50, 200])[0]

# Create an LFO to modulate the frequency parameter of the filter to simulate wave motion
lfo = patch.place("cycle~ 0.1", num_objs=1, starting_pos=[50, 300])[0]

# Place a multiply object to adjust the LFO range
lfo_mul = patch.place("*~ 200", num_objs=1, starting_pos=[50, 400])[0]

# Place an add object to offset the LFO signal; adjust the base frequency of the filter
lfo_add = patch.place("+~ 500", num_objs=1, starting_pos=[50, 500])[0]

# Place a gain control to manage the output level
gain = patch.place("*~ 0.2", num_objs=1, starting_pos=[50, 700])[0]

# Place an outlet for the audio signal
outlet = patch.place("dac~", num_objs=1, starting_pos=[50, 800])[0]

# Connect the objects
patch.connect([noise.outs[0], filt.ins[0]])
patch.connect([filt.outs[0], gain.ins[0]])
patch.connect([gain.outs[0], outlet.ins[0]])
patch.connect([lfo.outs[0], lfo_mul.ins[0]])
patch.connect([lfo_mul.outs[0], lfo_add.ins[0]])
patch.connect([lfo_add.outs[0], filt.ins[1]])

# Save the patch
patch.save("OW10.maxpat")