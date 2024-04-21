import maxpy as mp

# Start building the patch
patch = mp.MaxPatch()

# Adding a toggle to control the dial tone
tg = patch.place("toggle", num_objs=1, starting_pos=[50, 50])[0]

# Adding cycle~ objects to generate sine waves at 350 Hz and 440 Hz
cyc1 = patch.place("cycle~ 350", num_objs=1, starting_pos=[100, 100])[0]
cyc2 = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 150])[0]

# Add a gain control for the volume of the signal
gain = patch.place("*~ 0.1", num_objs=1, starting_pos=[300, 125])[0]

# Adding dac~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 125])[0]

# Connecting the objects
# Connect the toggle to the cycle~ objects to start/stop the tone
patch.connect([tg.outs[0], cyc1.ins[0]])
patch.connect([tg.outs[0], cyc2.ins[0]])

# Connecting the cycle~ objects to the gain control
patch.connect([cyc1.outs[0], gain.ins[0]])
patch.connect([cyc2.outs[0], gain.ins[1]])

# Connecting the gain control to the dac~ to output the sound
patch.connect([gain.outs[0], dac.ins[0]])
patch.connect([gain.outs[0], dac.ins[1]])

# Saving the generated patch
patch.save("dial2.maxpat")