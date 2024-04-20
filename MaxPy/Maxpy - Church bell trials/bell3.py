import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Objects
base_frequency = 110  # A2, a common bell frequency, adjust as needed for desired bell tone

# Toggle to start/stop the bell
tg = patch.place("toggle", starting_pos=[0, 0])[0]
# Metro generates bangs (triggers) at irregular intervals, simulating random bell strikes
mtr = patch.place("metro", args="random 3000 8000", num_objs=1, starting_pos=[0, 50])[0]
# Random object to vary the pitch slightly each time the bell is struck
rnd = patch.place("random 50", num_objs=1, starting_pos=[0, 100])[0]
# Adds a small random value to the base frequency to simulate slight pitch variations
add = patch.place("+", args=str(base_frequency), num_objs=1, starting_pos=[0, 150])[0]
# Converts frequency to signal
mtof = patch.place("mtof", num_objs=1, starting_pos=[0, 200])[0]
# Cycle~ object to generate a sine wave at the given frequency, similar to a bell’s sound
cycle = patch.place("cycle~", num_objs=1, starting_pos=[0, 250])[0]
# Gain~ to adjust the volume
gain = patch.place("gain~", args="0.5", num_objs=1, starting_pos=[0, 300])[0]
# Ead~ to provide a ramp to soften the striking and fading of the bell sound
ead = patch.place("*~", args="ead~ 2000 8000", num_objs=1, starting_pos=[0, 350])[0]
# Output
ezdac = patch.place("ezdac~", num_objs=1, starting_pos=[0, 400])[0]

# Connecting objects to generate and control the bell sound
patch.connect([tg.outs[0], mtr.ins[0]])
patch.connect([mtr.outs[0], rnd.ins[0]])
patch.connect([rnd.outs[0], add.ins[0]])
patch.connect([add.outs[0], mtof.ins[0]])
patch.connect([mtof.outs[0], cycle.ins[0]])
patch.connect([cycle.outs[0], gain.ins[0]])
patch.connect([gain.outs[0], ead.ins[0]])
patch.connect([ead.outs[0], ezdac.ins[0]])
patch.connect([ead.outs[0], ezdac.ins[1]])

# Save the patch
patch.save("bell3.maxpat")