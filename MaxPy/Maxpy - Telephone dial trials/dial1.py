import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Place two cycle~ objects to generate the desired frequencies
cycle_350Hz = patch.place("cycle~ 350", num_objs=1, starting_pos=[100, 100])[0]
cycle_440Hz = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 150])[0]

# Place a mult~ object to control the volume
volume_control = patch.place("*~ 0.1", num_objs=2, starting_pos=[100, 200])

# Place an ezdac~ for audio output
audio_out = patch.place("ezdac~", num_objs=1, starting_pos=[100, 300])[0]

# Connect the cycle~ objects to the volume control
patch.connect([cycle_350Hz.outs[0], volume_control[0].ins[0]])
patch.connect([cycle_440Hz.outs[0], volume_control[1].ins[0]])

# Connect the volume control objects to the audio out
patch.connect([volume_control[0].outs[0], audio_out.ins[0]])
patch.connect([volume_control[1].outs[0], audio_out.ins[1]])

# Save the patch
patch.save("dial1.maxpat")