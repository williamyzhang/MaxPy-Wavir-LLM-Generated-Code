import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Place two cycle~ objects for generating sine waves of 350 Hz and 440 Hz
cycle1 = patch.place("cycle~ 350", num_objs=1, starting_pos=[100, 100])[0]
cycle2 = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 200])[0]

# Place a gain~ object to control the volume
gain = patch.place("gain~", num_objs=1, starting_pos=[300, 150])[0]

# Place an ezdac~ object for audio output
ezdac = patch.place("ezdac~", num_objs=1, starting_pos=[500, 150])[0]

# Connect the cycle~ objects to the gain~ object
patch.connect([cycle1.outs[0], gain.ins[0]])
patch.connect([cycle2.outs[0], gain.ins[0]])

# Connect the gain~ object to the ezdac~ object
patch.connect([gain.outs[0], ezdac.ins[0]])
patch.connect([gain.outs[0], ezdac.ins[1]])

# Save the patch
patch.save("DT10.maxpat")