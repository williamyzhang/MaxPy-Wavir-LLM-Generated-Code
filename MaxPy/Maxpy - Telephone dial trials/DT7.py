import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Place two cycle~ objects for simulating the dial tone frequencies
dial_tone_350 = patch.place("cycle~ 350", num_objs=1, starting_pos=[0, 0])[0]
dial_tone_440 = patch.place("cycle~ 440", num_objs=1, starting_pos=[150, 0])[0]

# Place a *~ object with 0.1 amplitude to control the loudness of the signal
amplitude_control = patch.place("*~ 0.1", num_objs=1, starting_pos=[75, 100])[0]

# The dac~ object to output the mixed signal to speakers
dac = patch.place("dac~", num_objs=1, starting_pos=[75, 200])[0]

# Connect cycle~ objects to the *~ object
patch.connect([dial_tone_350.outs[0], amplitude_control.ins[0]])
patch.connect([dial_tone_440.outs[0], amplitude_control.ins[1]])

# Connect the *~ object to the dac~ object to output the sound
patch.connect([amplitude_control.outs[0], dac.ins[0]])
patch.connect([amplitude_control.outs[0], dac.ins[1]])

# Save the MaxPatch with a descriptive name
patch.save("DT7.maxpat")