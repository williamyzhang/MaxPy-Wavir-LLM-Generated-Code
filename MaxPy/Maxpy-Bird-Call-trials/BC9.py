import maxpy as mp

# Initialize the MaxPatch
patch = mp.MaxPatch()

# placer function for placing objects in a cascading manner to make the patch more readable
def placer(object_type, num_objs, start_pos, offset):
    return patch.place(object_type, num_objs=num_objs, starting_pos=start_pos, pos_offset=offset)

# Metro object for triggering bangs in rhythm
mtr = placer("metro", 1, [0, 0], [0,0])[0]

# Toggle to start/stop the metro
tg = placer("toggle", 1, [0, -50], [0,0])[0]

# Random object for rhythmic variation (rate of metro)
rn_metro = placer("random 1000", 1, [150, 0], [0,0])[0]
# Setting the minimum metro rate
min_metro = placer("+ 200", 1, [300, 0], [0,0])[0]

# Random object for pitch variation
rn_pitch = placer("random 24", 1, [450, 0], [0,0])[0]
# Scale to MIDI note range
scale = placer("* 0.5", 1, [600, 0], [0,0])[0]
# Convert to frequency (MIDI to Frequency)
mtof = placer("mtof", 1, [750, 0], [0,0])[0]

# Oscillator to generate sound
osc = placer("cycle~", 1, [900, 0], [0,0])[0]
# Gain for controlling volume
vol = placer("*~ 0.1", 1, [1050, 0], [0,0])[0]
# Audio output
ez = placer("ezdac~", 1, [1200, 0], [0,0])[0]

# Connections
patch.connect([tg.outs[0], mtr.ins[0]])

patch.connect([mtr.outs[0], rn_metro.ins[0]])
patch.connect([rn_metro.outs[0], min_metro.ins[0]])
patch.connect([min_metro.outs[0], mtr.ins[1]])

patch.connect([mtr.outs[0], rn_pitch.ins[0]])
patch.connect([rn_pitch.outs[0], scale.ins[0]])
patch.connect([scale.outs[0], mtof.ins[0]])
patch.connect([mtof.outs[0], osc.ins[0]])

patch.connect([osc.outs[0], vol.ins[0]])
patch.connect([vol.outs[0], ez.ins[0]])
patch.connect([vol.outs[0], ez.ins[1]])

patch.save("BC9.maxpat")