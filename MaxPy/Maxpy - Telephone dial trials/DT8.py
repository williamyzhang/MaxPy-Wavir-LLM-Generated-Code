import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place two 'cycle~' objects for dial tone frequencies
cycle_350 = patch.place("cycle~ 350", num_objs=1, starting_pos=[100, 100])[0]
cycle_440 = patch.place("cycle~ 440", num_objs=1, starting_pos=[300, 100])[0]

# Place a 'toggle' object to control the dial tone
toggle = patch.place("toggle", num_objs=1, starting_pos=[200, 50])[0]

# Place a 'gain~' object to control the volume of the output
gain = patch.place("gain~", num_objs=1, starting_pos=[200, 300])[0]

# Place a 'dac~' object to send the sound to the computer's audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[200, 400])[0]

# Connect 'toggle' to both 'cycle~' objects
patch.connect([toggle.outs[0], cycle_350.ins[0]])
patch.connect([toggle.outs[0], cycle_440.ins[0]])

# Connect 'cycle~' objects to 'gain~' left and right inlets for stereo output
patch.connect([cycle_350.outs[0], gain.ins[0]])
patch.connect([cycle_440.outs[0], gain.ins[1]])

# Connect 'gain~' to 'dac~' to output sound
patch.connect([gain.outs[0], dac.ins[0]])
patch.connect([gain.outs[1], dac.ins[1]])

# Save the patch
patch.save("DT8.maxpat")